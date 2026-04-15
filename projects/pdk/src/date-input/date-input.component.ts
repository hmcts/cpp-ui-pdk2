import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Injector,
  Input,
  Output,
  Type,
  viewChild
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  NgControl,
  ValidationErrors,
  Validator,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

import { map } from 'rxjs/operators';

import { FormFieldControl } from '../form/form.interfaces';
import { coerceBooleanProperty, generateId } from '../util/index';
import { PdkInteractionContainerComponent } from '../core/interaction';
import { PdkLabelDirective, PdkLabelComponent } from '../input/input-label.directive';
import { PdkInputComponent, PdkInputDirective } from '../input/input.directive';

import { PdkMarginDirective } from '../core/spacing';
import { PdkDatePickerToggleComponent } from '../date-picker/date-picker-toggle.component';

interface DateinputControls {
  day: FormControl<string>;
  month: FormControl<string>;
  year: FormControl<string>;
}

const DEFAULT_ERROR_MESSAGES = [
  {
    rule: 'dateExists',
    message: `Date doesn't exist – enter again`
  },
  {
    rule: 'dateFormat',
    message: `Date not recognised – use this format, for example 19 8 2016`
  },
  {
    rule: 'futureDate',
    message: `Date can't be in past – enter valid date`
  },
  {
    rule: 'pastDate',
    message: `Date can't be in future – enter valid date`
  },
  {
    rule: 'weekDate',
    message: `Date can't be in the weekend – enter valid date`
  }
];

// Regex for universal Date format as in YYYY-MM-DD
// First Group Year --> 4 digits
// Secong Group Month --> 2 digits
// Third Group Day --> 2 digits
const UNIVERSAL_DATE_FORMAT = /\d{4}-\d{2}-\d{2}/;
const DATE_EXISTS =
  /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{4})$/; // eslint-disable-line max-len

function pad(num: number): string {
  const value = String(num);
  return value.length >= 2 ? value : new Array(2 - value.length + 1).join('0') + value;
}

@Component({
  selector: 'pdk-date-input',
  template: `
    <pdk-interaction-container (blur)="handleBlurInput($event)">
      <div class="pdk-date-input">
        <div [formGroup]="dateInputs" class="govuk-date-input">
          <div class="govuk-date-input__item">
            <label [attr.for]="id + '-day'" pdk-label class="govuk-date-input__label"> Day </label>
            <input
              #inputRef
              [attr.id]="id + '-day'"
              [pdk-input]="2"
              [hasError]="hasError"
              class="govuk-date-input__input"
              type="number"
              name="dateDay"
              formControlName="day"
              [attr.aria-describedby]="ariaDescribedBy"
              required
              autocomplete="off"
              (focus)="handleFocusInput($event)"
              (blur)="handleBlurInput($event)"
            />
          </div>

          <div class="govuk-date-input__item">
            <label [attr.for]="id + '-month'" pdk-label class="govuk-date-input__label">
              Month
            </label>
            <input
              [attr.id]="id + '-month'"
              [pdk-input]="2"
              [hasError]="hasError"
              class="govuk-date-input__input"
              type="number"
              name="dateMonth"
              formControlName="month"
              autocomplete="off"
              required
              (focus)="handleFocusInput($event)"
              (blur)="handleBlurInput($event)"
            />
          </div>

          <div class="govuk-date-input__item">
            <label [attr.for]="id + '-year'" pdk-label class="govuk-date-input__label">
              Year
            </label>
            <input
              [attr.id]="id + '-year'"
              [pdk-input]="4"
              [hasError]="hasError"
              class="govuk-date-input__input"
              type="number"
              name="dateYear"
              formControlName="year"
              autocomplete="off"
              required
              (focus)="handleFocusInput($event)"
              (blur)="handleBlurInput($event)"
            />
          </div>
        </div>
        @if (hasPicker) {
        <div pdk-margin-left="-2">
          <pdk-date-picker-toggle
            [futureDate]="futureDate"
            [pastDate]="pastDate"
            [minDate]="minDate"
            [maxDate]="maxDate"
            [disableWeekend]="disableWeekend"
            [value]="pickerValue"
            [disabled]="dateInputs.disabled"
            (change)="handlePickDate($event)"
          >
          </pdk-date-picker-toggle>
        </div>
        }
      </div>
    </pdk-interaction-container>
  `,
  styleUrls: ['./date-input.scss'],
  providers: [
    {
      provide: FormFieldControl,
      useExisting: PdkDateInputComponent
    },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PdkDateInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PdkDateInputComponent),
      multi: true
    }
  ],
  imports: [
    PdkInteractionContainerComponent,
    FormsModule,
    ReactiveFormsModule,
    PdkLabelDirective,
    PdkLabelComponent,
    PdkInputComponent,
    PdkInputDirective,
    PdkMarginDirective,
    PdkDatePickerToggleComponent
  ]
})
export class PdkDateInputComponent implements ControlValueAccessor, FormFieldControl, Validator {
  @Input() id: string;
  @Input() ariaDescribedBy: string | null;
  @Input()
  set futureDate(enabled: boolean) {
    this._futureDate = coerceBooleanProperty(enabled);
  }
  get futureDate() {
    return this._futureDate;
  }
  @Input()
  set pastDate(enabled: boolean) {
    this._pastDate = coerceBooleanProperty(enabled);
  }
  get pastDate() {
    return this._pastDate;
  }

  @Input('weekDate')
  set disableWeekend(enabled: boolean) {
    this._disableWeekend = coerceBooleanProperty(enabled);
  }
  get disableWeekend() {
    return this._disableWeekend;
  }

  @Input() minDate?: string;
  @Input() maxDate?: string;
  @Input() hasError = false;
  @Input() set picker(on: unknown) {
    this.hasPicker = coerceBooleanProperty(on);
  }

  // simulate blur and focus events as if this were a single input
  @Output() blur = new EventEmitter();
  @Output() focus = new EventEmitter();

  canBlur = false;
  controlType = 'date';
  dateInputs: FormGroup<DateinputControls>;
  errorMessages = DEFAULT_ERROR_MESSAGES;
  hasFocus = false;
  hasPicker = false;
  pickerValue: Date | null;
  multi = true;

  private _futureDate = false;
  private _pastDate = false;
  private _disableWeekend = false;

  set value(value: string | undefined) {
    this._value = value;

    if (value && !this.validate({ value } as FormControl<string>)) {
      const [year, month, day] = value.split('-');
      this.pickerValue = new Date(Number(year), Number(month) - 1, Number(day));
    } else {
      this.pickerValue = null;
    }
  }
  get value() {
    return this._value;
  }
  readonly controlRef = viewChild.required('inputRef', { read: ElementRef<HTMLInputElement> });

  private _value: string | undefined;
  private propagateChange = (_: string) => {};
  private propagateTouch = () => {};

  constructor(private injector: Injector, private cdr: ChangeDetectorRef) {
    this.id = generateId('pdk-date-input');
    this.dateInputs = new FormGroup<DateinputControls>({
      day: new FormControl(''),
      month: new FormControl(''),
      year: new FormControl('')
    });

    // obtain the composite value from the three inner inputs in order to
    // simulate a date being typed in a single field - the combined value is
    // considered to exist when any of the three inner inputs are set
    this.dateInputs.valueChanges
      .pipe(
        map(({ day, month, year }) => {
          if (day || month || year) {
            return [year ? year : '    ', month ? pad(+month) : '  ', day ? pad(+day) : '  '].join(
              '-'
            );
          }
        })
      )
      .subscribe((val) => {
        if (val && val.length > 10) {
          this.writeValue(val);
        } else if (val !== this.value) {
          this.value = val;
          this.propagateChange(val);
        }
      });
  }

  get ngControl() {
    return this.injector.get(NgControl as Type<NgControl>);
  }

  handleBlurInput($event: any) {
    this.canBlur = true;
    setTimeout(() => {
      if (this.canBlur) {
        this.blur.emit($event);
        this.propagateTouch();
        this.hasFocus = false;
      }
    });
  }

  handleFocusInput($event: any) {
    if (!this.hasFocus) {
      this.focus.emit($event);
      this.hasFocus = true;
    }
    this.canBlur = false;
  }

  handlePickDate(value: string) {
    this.writeValue(value);
    this.value = value;
    this.propagateChange(value);
  }

  registerOnChange(fn: (_: any) => void): void {
    this.propagateChange = fn.bind(this);
  }

  registerOnTouched(fn: (_: any) => void) {
    this.propagateTouch = fn.bind(this);
  }

  validate(c: FormControl): ValidationErrors | null {
    // treat an empty value as valid so that the input can be optional
    if (!c.value) {
      return null;
    }
    // expose any internal validation errors to the outer control under the
    // `dateFormat` key
    const dateFormat = ['day', 'month', 'year'].reduce(
      (errors: { [k: string]: ValidationErrors | null }, controlName) => {
        if (this.dateInputs.controls[controlName].invalid) {
          return {
            ...(errors || {}),
            [controlName]: this.dateInputs.controls[controlName].errors
          };
        }
        return errors;
      },
      null
    );

    if (dateFormat) {
      return { dateFormat };
    }

    if (!UNIVERSAL_DATE_FORMAT.test(c.value)) {
      return { dateFormat: true };
    }

    if (!DATE_EXISTS.test(c.value.split('-').reverse().join('-'))) {
      return { dateExists: true };
    }

    return null;
  }

  writeValue(dateString: string | undefined) {
    let day = '';
    let month = '';
    let year = '';

    [year, month, day] = (dateString || '').split('-');

    this.dateInputs.patchValue({
      day: day ? day.slice(0, 2) : undefined,
      month: month ? month.slice(0, 2) : undefined,
      year: year ? year.slice(0, 4) : undefined
    });
    this.value = dateString;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.dateInputs.disable() : this.dateInputs.enable();
    this.cdr.markForCheck();
  }
}
