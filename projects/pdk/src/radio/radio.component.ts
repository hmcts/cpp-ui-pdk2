import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  ElementRef,
  EventEmitter,
  forwardRef,
  Injector,
  Input,
  Output,
  signal,
  Type,
  ViewChild,
  ViewEncapsulation,
  viewChildren,
  contentChildren
} from '@angular/core';
import { ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormFieldControl } from '../form/form.interfaces';
import { coerceBooleanProperty, generateId } from '../util/index';
import { PdkLabelDirective, PdkLabelComponent } from '../input/input-label.directive';

export interface RadioChangeEvent {
  source: PdkRadioButtonComponent;
  value: any;
}

const DEFAULT_ERROR_MESSAGES = [
  {
    rule: 'required',
    message: 'Select an option'
  }
];

@Component({
  selector: 'pdk-radio-group',
  exportAs: 'pdkRadioGroup',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: FormFieldControl,
      useExisting: forwardRef(() => PdkRadioGroupComponent)
    },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PdkRadioGroupComponent),
      multi: true
    }
  ],
  template: `
    <div
      class="govuk-radios"
      [class.govuk-radios--small]="small"
      [class.govuk-radios--inline]="inline"
    >
      @for (option of options; track option.label) {
      <pdk-radio-button [value]="option.value">
        {{ option.label }}
      </pdk-radio-button>
      }
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./radio.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [forwardRef(() => PdkRadioButtonComponent)]
})
export class PdkRadioGroupComponent implements ControlValueAccessor, FormFieldControl {
  @Input() id: string;

  @Input()
  get ariaDescribedBy(): string | null {
    return this._ariaDescribedBy;
  }
  set ariaDescribedBy(id: string | null) {
    this._ariaDescribedBy = id;
    this.markRadiosForCheck();
  }

  get value(): any {
    return this._value;
  }
  set value(val: any) {
    if (this._value !== val) {
      this._value = val;
      this.markRadiosForCheck();
    }
  }

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value) {
    this._disabled = coerceBooleanProperty(value);
    this.markRadiosForCheck();
  }

  @Input()
  get inline(): boolean {
    return this._inline;
  }
  set inline(value) {
    this._inline = coerceBooleanProperty(value);
  }

  @Input()
  get required(): boolean {
    return this._required;
  }
  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
  }

  @Input()
  get small(): boolean {
    return this._small;
  }
  set small(value) {
    this._small = coerceBooleanProperty(value);
  }

  @Input() options: { value: any; label: string }[];

  @Output() change: EventEmitter<RadioChangeEvent> = new EventEmitter<RadioChangeEvent>();
  readonly viewRadios = viewChildren<PdkRadioButtonComponent>(
    forwardRef(() => PdkRadioButtonComponent)
  );
  readonly contentRadios = contentChildren<PdkRadioButtonComponent>(
    forwardRef(() => PdkRadioButtonComponent),
    { descendants: true }
  );

  first = computed(() => {
    const viewRadios = this.viewRadios();
    const contentRadios = this.contentRadios();
    if (viewRadios && viewRadios.at(0)) {
      return viewRadios.at(0);
    }
    return contentRadios && contentRadios.at(0);
  });

  controlRef = computed(() => {
    const first = this.first();
    const radioFocus = first?.focus.bind(first);
    return {
      nativeElement: {
        focus: () => radioFocus && radioFocus()
      }
    } as ElementRef<HTMLInputElement>;
  });

  controlType = 'radio-group';
  multi = true;
  errorMessages = DEFAULT_ERROR_MESSAGES;
  name = generateId('pdk-radio-group');

  private _ariaDescribedBy: string | null;
  private _disabled: boolean;
  private _inline: boolean;
  private _required: boolean;
  private _small = false;
  private _value: any = null;

  constructor(private injector: Injector) {}

  get ngControl(): NgControl {
    return this.injector.get(NgControl as Type<NgControl>);
  }

  touch() {
    this.onTouched();
  }

  emitChangeEvent(radio: PdkRadioButtonComponent): void {
    this.change.emit({
      source: radio,
      value: radio.value
    });
  }

  markRadiosForCheck() {
    const contentRadios = this.contentRadios();
    if (contentRadios) {
      contentRadios.forEach((radio) => radio.markForCheck());
    }
    const viewRadios = this.viewRadios();
    if (viewRadios) {
      viewRadios.forEach((radio) => radio.markForCheck());
    }
  }

  propagateChange: (value: any) => void = () => {};

  onTouched: () => any = () => {};

  writeValue(value: any) {
    this.value = value;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  registerOnChange(fn: (value: any) => void) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
}

@Component({
  selector: 'pdk-radio-button',
  exportAs: 'pdkRadioButton',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="govuk-radios__item">
      <input
        #inputRef
        type="radio"
        class="govuk-radios__input"
        [attr.id]="id"
        [checked]="checked"
        [value]="value"
        [disabled]="disabled"
        [name]="name"
        [attr.aria-describedby]="ariaDescribedBy"
        (change)="onChange($event)"
      />
      <label pdk-label class="govuk-radios__label" [attr.for]="id">
        <ng-content></ng-content>
      </label>
    </div>
  `,
  imports: [PdkLabelDirective, PdkLabelComponent]
})
export class PdkRadioButtonComponent {
  @Input() value: any;
  @Input()
  get disabled(): boolean {
    return this._disabled || this.radioGroup.disabled;
  }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
  }
  @ViewChild('inputRef', { static: true }) inputElement: ElementRef;

  @Input()
  get ariaDescribedBy(): string | null {
    return this.radioGroup.ariaDescribedBy && this.radioGroup.first() === this
      ? this.radioGroup.ariaDescribedBy
      : null;
  }
  get checked(): boolean {
    return this.radioGroup.value === this.value;
  }
  get name(): string {
    return this.radioGroup.name;
  }

  id = generateId('pdk-radio');
  private _disabled: boolean;

  constructor(
    private radioGroup: PdkRadioGroupComponent,
    private changeDetector: ChangeDetectorRef
  ) {}

  focus() {
    this.radioGroup.touch();
    this.inputElement.nativeElement.focus();
  }

  markForCheck() {
    this.changeDetector.markForCheck();
  }

  onChange(event: Event) {
    event.stopPropagation();

    this.radioGroup.propagateChange(this.value);
    this.radioGroup.touch();

    if (this.value !== this.radioGroup.value) {
      this.radioGroup.value = this.value;
      this.radioGroup.emitChangeEvent(this);
    }
  }
}

@Component({
  selector: 'pdk-radio-conditional',
  template: ` <div class="govuk-radios__conditional"><ng-content></ng-content></div> `
})
export class PdkRadioConditionalComponent {}
