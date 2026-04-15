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
  OnDestroy,
  Output,
  Type,
  viewChild,
  ViewEncapsulation
} from '@angular/core';
import {
  ControlValueAccessor,
  UntypedFormControl,
  UntypedFormGroup,
  NgControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  Validators,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { map, take, takeUntil, tap } from 'rxjs/operators';
import { FormFieldControl, FormFieldControlV2 } from '../form/form.interfaces';
import { coerceBooleanProperty, generateId } from '../util';
import { PdkLabelDirective, PdkLabelComponent } from '../input/input-label.directive';
import { PdkVisuallyHiddenDirective } from '../core/accessibility';
import { PdkInputComponent, PdkInputDirective } from '../input/input.directive';

const TWENTY_FOUR_HOUR_REGEX = /^(?:\d|[01]\d|2[0-3]):[0-5]\d$/;

const DEFAULT_ERROR_MESSAGES = [
  {
    rule: 'required',
    message: 'Enter a time, for example 14 45'
  },
  {
    rule: 'timeExists',
    message: `Time doesn't exist – enter again`
  },
  {
    rule: 'timeFormat',
    message: `Time not recognised – use format, for example 14 45`
  }
];

function pad(value: string): string {
  return value.length >= 2 ? value : new Array(2 - value.length + 1).join('0') + value;
}

@Component({
  selector: 'pdk-time-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [formGroup]="timeInputs" class="pdk-time-input">
      <div class="pdk-time-input__item pdk-time-input__item--hour">
        <label pdk-label [pdk-visually-hidden]="labelHidden" [attr.for]="id + '-hours'">
          Hours
        </label>
        <input
          #hours
          [pdk-input]="2"
          [hasError]="hasError"
          [attr.aria-describedby]="ariaDescribedBy"
          [attr.id]="id + '-hours'"
          [required]="required"
          formControlName="hours"
          type="text"
          name="timeHours"
          pattern="[0-9]*"
          maxlength="2"
          autocomplete="off"
          (keydown)="handleKeyDown($event)"
          (focus)="handleFocusInput($event)"
          (blur)="handleBlurInput($event)"
        />
      </div>

      <div class="pdk-time-input__item">
        <label pdk-label [pdk-visually-hidden]="labelHidden" [attr.for]="id + '-minutes'">
          Minutes
        </label>
        <input
          #minutes
          [attr.id]="id + '-minutes'"
          [pdk-input]="2"
          [hasError]="hasError"
          [required]="required"
          formControlName="minutes"
          type="text"
          name="timeMinutes"
          pattern="[0-9]*"
          minlength="2"
          maxlength="2"
          autocomplete="off"
          (keydown)="handleKeyDown($event)"
          (focus)="handleFocusInput($event)"
          (blur)="handleBlurInput($event)"
        />
      </div>
    </div>
  `,
  styleUrls: ['./time-input.scss'],
  providers: [
    {
      provide: FormFieldControl,
      useExisting: PdkTimeInputComponent
    },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PdkTimeInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PdkTimeInputComponent),
      multi: true
    }
  ],
  encapsulation: ViewEncapsulation.None,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    PdkLabelDirective,
    PdkLabelComponent,
    PdkVisuallyHiddenDirective,
    PdkInputComponent,
    PdkInputDirective
  ]
})
export class PdkTimeInputComponent
  implements AfterViewInit, ControlValueAccessor, FormFieldControlV2, Validator, OnDestroy
{
  @Input() ariaDescribedBy: string;
  @Input() hasError = false;
  @Input()
  get labelHidden(): boolean {
    return this._labelHidden;
  }
  set labelHidden(val: boolean) {
    this._labelHidden = coerceBooleanProperty(val);
  }

  @Input()
  get autoShift(): boolean {
    return this._autoShift;
  }
  set autoShift(val: boolean) {
    this._autoShift = coerceBooleanProperty(val);
  }

  @Input()
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this._disabled ? this.timeInputs.disable() : this.timeInputs.enable();
  }
  get disabled(): boolean {
    return this._disabled;
  }

  @Input()
  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
  }
  get required(): boolean {
    return this._required;
  }

  // simulate blur and focus events as if this were a single input
  @Output() blur = new EventEmitter();
  @Output() focus = new EventEmitter();
  readonly controlRef = viewChild.required('hours', { read: ElementRef<HTMLInputElement> });
  readonly minutesInput = viewChild('minutes', { read: ElementRef<HTMLInputElement> });

  id = generateId('pdk-time-input');
  multi = true;
  controlType = 'time';
  timeInputs: UntypedFormGroup;
  errorMessages = DEFAULT_ERROR_MESSAGES;
  canBlur = false;
  hasFocus = false;

  private _autoShift = true;
  private _labelHidden = true;
  private _disabled = false;
  private ngAfterViewInit$ = new ReplaySubject<void>(1);
  private ngOnDestroy$ = new Subject<void>();
  private _required = false;

  get ngControl(): NgControl {
    return this.injector.get(NgControl as Type<NgControl>);
  }

  private propagateChange: (_: any) => void = (_: any) => {};

  constructor(private injector: Injector, private cdr: ChangeDetectorRef) {
    this.timeInputs = new UntypedFormGroup({
      hours: new UntypedFormControl(''),
      minutes: new UntypedFormControl('')
    });

    // obtain the composite value from the three inner inputs in order to
    // simulate a time being typed in a single field - the combined value is
    // considered to exist when any of the inner inputs are set
    (this.timeInputs.valueChanges as Observable<{ hours?: string; minutes?: string }>)
      .pipe(
        tap(({ hours }) => {
          const minutesInput = this.minutesInput();
          if (this.autoShift && hours.length > 1 && minutesInput.nativeElement) {
            minutesInput.nativeElement.focus();
          }
        }),
        map(({ hours, minutes }) => {
          if (hours || minutes) {
            return [
              hours !== undefined ? pad(hours) : '',
              minutes !== undefined ? minutes : ''
            ].join(':');
          }
          return '';
        })
      )
      .subscribe((val) => this.propagateChange(val));
  }

  ngAfterViewInit() {
    setTimeout(() => this.ngAfterViewInit$.next());
  }

  ngOnDestroy() {
    this.ngOnDestroy$.next(null);
  }

  markForCheck() {
    this.cdr.markForCheck();
  }

  handleKeyDown($event: any) {
    // Allow: backspace, delete, tab, escape, enter and .
    if ([46, 8, 9, 27, 13, 110, 190].indexOf($event.keyCode) > -1) {
      return;
    }
    // Ensure that it is a number and stop the keypress
    if (
      ($event.shiftKey || $event.keyCode < 48 || $event.keyCode > 57) &&
      ($event.keyCode < 96 || $event.keyCode > 105)
    ) {
      $event.preventDefault();
    }
  }

  handleBlurInput($event: any) {
    this.canBlur = true;
    setTimeout(() => {
      if (this.canBlur) {
        this.blur.emit($event);
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

  registerOnChange(fn: (_: any) => void): void {
    this.propagateChange = fn.bind(this);
  }

  registerOnTouched() {}

  validate(c: UntypedFormControl): ValidationErrors | null {
    // treat an empty value as valid so that the input can be optional
    if (!c.value) {
      return null;
    }
    // expose any internal validation errors to the outer control under the
    // `timeFormat` key
    const timeFormat = ['hours', 'minutes'].reduce(
      (errors: { [k: string]: ValidationErrors | null }, controlName) => {
        if (!this.timeInputs.controls[controlName].valid) {
          return {
            ...(errors || {}),
            [controlName]: this.timeInputs.controls[controlName].errors
          };
        }
        return errors;
      },
      null
    );

    if (timeFormat) {
      return { timeFormat };
    }
    if (!TWENTY_FOUR_HOUR_REGEX.test(c.value)) {
      return { timeExists: true };
    }
    return null;
  }

  writeValue(timeString: string) {
    this.ngAfterViewInit$.pipe(take(1), takeUntil(this.ngOnDestroy$)).subscribe(() => {
      let hours = '';
      let minutes = '';

      [hours, minutes] = (timeString || '').split(':');

      this.timeInputs.patchValue({ hours, minutes });
    });
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }
}
