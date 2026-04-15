import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Injector,
  Input,
  Output,
  Type,
  viewChild,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { FormFieldControl, FormFieldControlV2 } from '../form/form.interfaces';
import { coerceBooleanProperty, generateId } from '../util/index';

export type SelectInputWidth = 2 | 3 | 4 | 5 | 10 | 20 | 30;

const DEFAULT_ERROR_MESSAGES = [
  {
    rule: 'required',
    message: 'Select an option'
  }
];

export interface SelectChangeEvent {
  source: PdkSelectComponent;
  value: unknown;
}

export interface SelectOption<T = unknown> {
  value: T;
  label: string;
}

@Component({
  selector: 'pdk-select',
  exportAs: 'pdkSelect',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <select
      class="govuk-select"
      #selectRef
      [attr.id]="id"
      [attr.aria-describedby]="ariaDescribedBy"
      [attr.aria-label]="ariaLabel"
      [attr.name]="name"
      [disabled]="disabled"
      [required]="required"
      [value]="value"
      [class.pdk-select--width-2]="inputWidth === 2"
      [class.pdk-select--width-3]="inputWidth === 3"
      [class.pdk-select--width-4]="inputWidth === 4"
      [class.pdk-select--width-5]="inputWidth === 5"
      [class.pdk-select--width-10]="inputWidth === 10"
      [class.pdk-select--width-20]="inputWidth === 20"
      [class.pdk-select--width-30]="inputWidth === 30"
      [class.pdk-select--justified]="justified"
      [class.govuk-select--error]="hasError"
      (change)="onChange($event)"
    >
      @if (placeholder) {
      <option value="">{{ placeholder }}</option>
      } @for (option of options; track option.label) {
      <option [selected]="option.value === value" [value]="option.value">
        {{ option.label }}
      </option>
      }
      <ng-content></ng-content>
    </select>
  `,
  providers: [
    {
      provide: FormFieldControl,
      useExisting: PdkSelectComponent
    },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PdkSelectComponent),
      multi: true
    }
  ],
  styleUrls: ['./select.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [FormsModule]
})
export class PdkSelectComponent implements ControlValueAccessor, FormFieldControlV2, AfterViewInit {
  @Input() id = generateId('pdk-select');
  @Input() name: string;
  @Input() placeholder: string;
  @Input() disabled: boolean;
  @Input() options: SelectOption[];
  @Input() ariaDescribedBy: string | null;
  @Input() ariaLabel: string | null;
  @Input() inputWidth?: SelectInputWidth;
  @Input() hasError = false;

  @Input()
  get justified() {
    return this._justified;
  }
  set justified(req: any) {
    this._justified = coerceBooleanProperty(req);
  }

  @Input()
  get required() {
    return this._required;
  }
  set required(req: any) {
    this._required = coerceBooleanProperty(req);
  }

  get value() {
    return this._value || '';
  }
  set value(val: any) {
    this._value = val;
  }

  @Output() change = new EventEmitter<SelectChangeEvent>();
  readonly controlRef = viewChild.required<ElementRef<HTMLSelectElement>>('selectRef');

  controlType = 'select';
  errorMessages = DEFAULT_ERROR_MESSAGES;
  errors: { [key: string]: any } | null;
  multi = false;
  _justified = false;
  _required: boolean;
  _value: any;

  propagateChange = (_: any) => {};
  onTouched: () => any = () => {};

  constructor(private injector: Injector, private cd: ChangeDetectorRef) {}

  get ngControl() {
    return this.injector.get(NgControl as Type<NgControl>);
  }

  markForCheck() {
    this.cd.markForCheck();
  }

  ngAfterViewInit(): void {
    const selectElement = this.controlRef();
    // Html by default picks the top value if none is pre selected.
    // This is now the behaviour by default in angular
    // To achieve the pre existing behaviour where a blank option is shown
    // when no value is selected we have to explicitly set the selected index to -1
    // as Angular no longer does so
    if (this.options?.length > 0) {
      let selectedIndex = -1;
      this.options.forEach((item, index) => {
        if (item.value === this.value) {
          selectedIndex = index;
        }
      });
      if (selectedIndex === -1 && !!selectElement && !this.placeholder) {
        selectElement.nativeElement.selectedIndex = selectedIndex;
      }
    }
  }

  onChange(event: Event) {
    event.stopPropagation();

    if (!this.disabled) {
      this.value = event.target !== null ? (event.target as HTMLSelectElement).value : null;
      this.change.emit({ source: this, value: this.value });
      this.propagateChange(this.value);
    }
  }

  registerOnChange = (fn: (_: any) => void) => {
    this.propagateChange = fn.bind(this);
  };

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(value: any): void {
    this.value = value;
    this.cd.markForCheck();
  }
}
