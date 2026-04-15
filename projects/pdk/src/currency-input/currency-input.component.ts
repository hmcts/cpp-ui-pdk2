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
  viewChild,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  NgControl,
  ValidationErrors,
  Validator,
  FormsModule
} from '@angular/forms';

import { FormFieldControl } from '../form/form.interfaces';
import { generateId } from '../util';
import { PdkInputComponent, PdkInputDirective } from '../input/input.directive';

const CURRENCY_REGEX = /^$|(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{2})?$/;

@Component({
  selector: 'pdk-currency-input',
  template: `
    <div class="pdk-currency-input">
      <input
        #inputRef
        #currencyFormat="ngModel"
        type="text"
        [pdk-input]="inputWidth"
        autocomplete="off"
        [ngModel]="value"
        [attr.aria-describedby]="ariaDescribedBy"
        [attr.id]="id"
        [attr.name]="name"
        [disabled]="disabled"
        [hasError]="hasError"
        [pattern]="pattern"
        (blur)="blur.emit($event)"
        (focus)="focus.emit($event)"
        (ngModelChange)="onChange($event)"
      />
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: FormFieldControl,
      useExisting: PdkCurrencyInputComponent
    },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PdkCurrencyInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PdkCurrencyInputComponent),
      multi: true
    }
  ],
  styleUrls: ['./currency-input.scss'],
  imports: [FormsModule, PdkInputComponent, PdkInputDirective]
})
export class PdkCurrencyInputComponent
  implements ControlValueAccessor, FormFieldControl, Validator
{
  @Input() id = generateId('pdk-currency-input');
  @Input() name: string;
  @Input() disabled: boolean;
  @Input() hasError = false;
  @Input() min: string;
  @Input() max: string;
  @Input() inputWidth: number;
  @Input() ariaDescribedBy: string | null;
  @Output() blur = new EventEmitter();
  @Output() focus = new EventEmitter();

  @ViewChild('currencyFormat', { static: true }) currencyFormat: NgControl;
  readonly controlRef = viewChild.required('inputRef', { read: ElementRef<HTMLInputElement> });

  controlType = 'currency';
  errorMessages = [{ rule: 'required', message: 'Enter an amount, for example £250' }];
  multi = false;
  pattern = CURRENCY_REGEX;
  value: string = null;

  constructor(private injector: Injector, private cdr: ChangeDetectorRef) {}

  get ngControl() {
    return this.injector.get(NgControl as Type<NgControl>);
  }

  onChange(value: string) {
    const float = parseFloat(value);
    this.value = value;
    this.propagateChange(!isNaN(float) ? float : undefined);
  }

  propagateChange = (_?: number) => {};

  registerOnChange(fn: (_?: number) => void): void {
    this.propagateChange = fn.bind(this);
  }

  registerOnTouched(_?: number) {}

  validate(c: FormControl<string>): ValidationErrors | null {
    if (!this.currencyFormat.valid) {
      return {
        currencyFormat: {
          actual: this.currencyFormat.value
        }
      };
    }
    if (c.value !== null && c.value !== undefined) {
      if (this.min) {
        const minFloat = parseFloat(this.min);
        const valFloat = parseFloat(c.value);

        if (valFloat < minFloat) {
          return {
            currencyMin: {
              expected: this.min,
              actual: c.value
            }
          };
        }
      }
      if (this.max) {
        const maxFloat = parseFloat(this.max);
        const valFloat = parseFloat(c.value);

        if (valFloat > maxFloat) {
          return {
            currencyMax: {
              expected: this.max,
              actual: c.value
            }
          };
        }
      }
    }
    return null;
  }

  writeValue(value: number | string) {
    const float = typeof value === 'number' ? value : parseFloat(value);

    if (!isNaN(float)) {
      // If a decimal exists, make sure we cast it to a correct currency format
      if (float.toString().indexOf('.') !== -1) {
        this.value = float.toFixed(2);
      } else {
        this.value = float.toFixed(0);
      }
    } else {
      this.value = '';
    }
    this.cdr.detectChanges();
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }
}
