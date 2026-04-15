import {
  Component,
  ElementRef,
  forwardRef,
  Injector,
  Input,
  linkedSignal,
  output,
  signal,
  Type,
  viewChild
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { FormFieldControl } from '../form/form.interfaces';
import { PdkInputComponent, PdkInputDirective, InputWidth } from '../input';
import { coerceBooleanProperty, generateId } from '../util';
import { PdkButton } from '../button';
import { PdkVisuallyHiddenDirective } from '../core';

type InputType = 'password' | 'text';

@Component({
  selector: 'pdk-password-input, [pdk-password-input]',
  template: `
    <div class="govuk-password-input">
      <div class="govuk-input__wrapper govuk-password-input__wrapper">
        <input
          #passwordInputRef
          [attr.id]="id + '-password'"
          [pdk-input]="inputWidth"
          [hasError]="hasError"
          [disabled]="disabled"
          [required]="required"
          class="govuk-password-input__input"
          [attr.type]="inputType()"
          name="password"
          [attr.aria-describedby]="ariaDescribedBy"
          required
          autocomplete="current-password"
          autocapitalize="none"
          (blur)="blur.emit($event)"
          (focus)="focus.emit($event)"
          [ngModel]="value"
          (ngModelChange)="onChange($event)"
        />
        <button
          type="button"
          pdk-button="secondary"
          [disabled]="disabled"
          class="govuk-password-input__toggle"
          (click)="toggleInputType()"
          aria-controls="password-input"
          [attr.aria-label]="ariaLabel()"
        >
          {{ displayText() }}
        </button>
      </div>
      <div pdk-visually-hidden aria-live="polite" role="status">{{ status() }}</div>
    </div>
  `,
  imports: [
    PdkInputComponent,
    PdkInputDirective,
    PdkButton,
    PdkVisuallyHiddenDirective,
    FormsModule
  ],
  providers: [
    {
      provide: FormFieldControl,
      useExisting: forwardRef(() => PdkPasswordInputComponent)
    },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PdkPasswordInputComponent),
      multi: true
    }
  ],
  styleUrl: './password-input.scss'
})
export class PdkPasswordInputComponent implements ControlValueAccessor, FormFieldControl {
  @Input() id = generateId('pdk-password-input');
  @Input() disabled: boolean;
  @Input() inputWidth: InputWidth;
  @Input() hasError = false;
  @Input() ariaDescribedBy: string | null;
  @Input()
  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
  }
  get required() {
    return this._required;
  }

  readonly controlRef = viewChild.required('passwordInputRef', {
    read: ElementRef<HTMLInputElement>
  });
  inputType = signal<InputType>('password');

  displayText = linkedSignal<InputType, string>({
    source: this.inputType,
    computation: (type) => {
      return type === 'password' ? 'Show' : 'Hide';
    }
  }).asReadonly();

  ariaLabel = linkedSignal<InputType, string>({
    source: this.inputType,
    computation: (type) => {
      return type === 'password' ? 'Show password' : 'Hide password';
    }
  }).asReadonly();

  status = linkedSignal<InputType, string>({
    source: this.inputType,
    computation: (type) => {
      return type === 'password' ? 'Your password is hidden' : 'Your password is visible';
    }
  }).asReadonly();

  get ngControl(): NgControl {
    return this.injector.get(NgControl as Type<NgControl>);
  }
  value: string = null;
  blur = output<FocusEvent>();
  focus = output<FocusEvent>();
  errorMessages = [{ rule: 'required', message: 'Enter a password' }];
  multi = false;
  controlType = 'password';

  private _required = false;
  constructor(private injector: Injector) {}

  onChange(value: string) {
    this.value = value;
    this.propagateChange(value);
  }

  propagateChange = (_?: string) => {};

  registerOnChange(fn: (_?: string) => void): void {
    this.propagateChange = fn.bind(this);
  }

  registerOnTouched(_?: string) {}

  writeValue(value: string) {
    this.value = value ?? '';
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  toggleInputType() {
    if (this.inputType() === 'password') {
      this.inputType.set('text');
      return;
    }
    this.inputType.set('password');
  }
}
