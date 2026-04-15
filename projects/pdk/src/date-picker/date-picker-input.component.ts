import { formatDate } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  Injector,
  Input,
  Type,
  viewChild
} from '@angular/core';
import { ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { FormFieldControl } from '../form/form.interfaces';
import { coerceBooleanProperty } from '../util';
import { PdkInteractionContainerComponent } from '../core/interaction';
import { PdkPaddingDirective } from '../core/spacing';
import { PdkInputComponent, PdkInputDirective } from '../input/input.directive';
import { PdkDatePickerComponent } from './date-picker.component';
import { PdkVisuallyHiddenDirective } from '../core';

const defaultFormatFn = (date: string) => formatDate(date, 'dd MMM yyyy', 'en-GB');

@Component({
  selector: 'pdk-date-picker-input',
  template: `
    <pdk-interaction-container (blur)="didOpenPicker = false">
      <div style="position: relative">
        <div (click)="didOpenPicker = true">
          <div pdk-padding="0" class="pdk-date-picker-input__selection">
            @if (!ariaDescribedBy) {
            <span [attr.id]="'datePickerSelector-' + id" hidden>
              Select to open the date picker and choose a date.</span
            >
            }
            <input
              #selectionInputRef
              [ngModel]="displayValue"
              [ngModelOptions]="{ standalone: true }"
              [attr.id]="id"
              [attr.placeholder]="placeholder"
              [attr.aria-placeholder]="placeholder"
              [attr.aria-describedby]="ariaDescribedBy || 'datePickerSelector-' + id"
              [attr.aria-expanded]="didOpenPicker"
              aria-haspopup="dialog"
              class="pdk-date-picker-input__selection-text"
              pdk-input
              [hasError]="hasError"
              pdk-padding-right="6"
              readonly="true"
              role="button"
              (focus)="handleFocusSelection()"
              (keydown.enter)="didOpenPicker = true; preventDefault($event)"
              (keydown.space)="didOpenPicker = true; preventDefault($event)"
            />

            @if (value && didOpenPicker) {
            <span role="status" aria-live="polite" pdk-visually-hidden>
              {{ liveAnnouncement }}
            </span>

            <div
              class="pdk-date-picker-input__clear-selection"
              role="button"
              tabindex="0"
              aria-label="Clear value"
              pdk-padding="1"
              (click)="handleValueChange(undefined); preventDefault($event)"
              (keydown.enter)="handleValueChange(undefined); preventDefault($event)"
            >
              &times;
            </div>
            }
          </div>
        </div>
        @if (didOpenPicker) {
        <div>
          <pdk-date-picker
            class="pdk-date-picker-input__picker"
            [style.left]="align === 'left' ? 0 : null"
            [style.right]="align === 'right' ? 0 : null"
            [isDateDisabled]="isDateDisabled"
            [isDateHighlighted]="isDateHighlighted"
            [isDateSelected]="isDateSelected"
            [futureDate]="futureDate"
            [minDate]="minDate"
            [maxDate]="maxDate"
            [pastDate]="pastDate"
            [value]="value"
            (change)="handleValueChange($event)"
          >
          </pdk-date-picker>
        </div>
        }
      </div>
    </pdk-interaction-container>
  `,
  providers: [
    {
      provide: FormFieldControl,
      useExisting: PdkDatePickerInputComponent
    },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PdkDatePickerInputComponent),
      multi: true
    }
  ],
  styleUrls: ['./date-picker.scss'],
  imports: [
    PdkInteractionContainerComponent,
    PdkPaddingDirective,
    FormsModule,
    PdkInputComponent,
    PdkInputDirective,
    PdkDatePickerComponent,
    PdkVisuallyHiddenDirective
  ]
})
export class PdkDatePickerInputComponent implements ControlValueAccessor, FormFieldControl {
  @Input() id: string;
  @Input() align: 'left' | 'right' = 'right';
  @Input() ariaDescribedBy: string | null;
  @Input() hasError = false;
  @Input()
  set futureDate(enabled: boolean) {
    this._futureDate = coerceBooleanProperty(enabled);
  }
  get futureDate() {
    return this._futureDate;
  }
  @Input() formatDisplayText: (date: string) => string = defaultFormatFn;
  @Input() isDateDisabled?: (date: Date) => boolean;
  @Input() isDateHighlighted?: (date: Date, hoveredDate: Date) => boolean;
  @Input() isDateSelected?: (date: Date, selectedDate?: string) => boolean;
  @Input() minDate?: string;
  @Input() maxDate?: string;
  @Input()
  set openOnFocus(enabled: boolean) {
    this._openOnFocus = coerceBooleanProperty(enabled);
  }
  get openOnFocus() {
    return this._openOnFocus;
  }
  @Input()
  set pastDate(enabled: boolean) {
    this._pastDate = coerceBooleanProperty(enabled);
  }
  get pastDate() {
    return this._pastDate;
  }
  @Input() placeholder?: string;

  readonly controlRef = viewChild.required('selectionInputRef', {
    read: ElementRef<HTMLInputElement>
  });

  controlType = 'date';
  didOpenPicker = false;
  multi: false;
  value?: string;
  liveAnnouncement?: string;

  private _futureDate = false;
  private _openOnFocus = false;
  private _pastDate = false;

  constructor(private injector: Injector, private cdr: ChangeDetectorRef) {}

  get ngControl() {
    return this.injector.get(NgControl as Type<NgControl>);
  }

  get displayValue() {
    return this.value ? this.formatDisplayText(this.value) : '';
  }

  handleFocusSelection() {
    if (this.openOnFocus) {
      this.didOpenPicker = true;
    }
  }

  handleValueChange(value: string | undefined) {
    this.propagateChange(value);
    this.value = value;
    this.didOpenPicker = false;
    this.liveAnnouncement = value ? this.formatDisplayText(value) : undefined;
    this.cdr.detectChanges();
    this.controlRef().nativeElement?.focus();
  }

  preventDefault(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }

  propagateChange: (_?: string) => void = (_?: string) => {};

  registerOnChange(fn: (_?: string) => void): void {
    this.propagateChange = fn.bind(this);
  }

  registerOnTouched(_: any) {}

  writeValue(value?: string) {
    this.value = value;
  }
}
