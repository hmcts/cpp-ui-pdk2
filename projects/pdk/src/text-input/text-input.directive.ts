import {
  Directive,
  ElementRef,
  forwardRef,
  HostBinding,
  inject,
  Injector,
  Input,
  signal,
  Type
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { ErrorMessageConfig, FormFieldControl } from '../form/form.interfaces';
import { coerceBooleanProperty } from '../util';
import { PdkInputDirective } from '../input';

export type TextInputFormat = 'email' | 'number' | 'postcode';

@Directive({
  selector: '[pdk-text-input]',
  providers: [
    {
      provide: FormFieldControl,
      useExisting: forwardRef(() => PdkTextInputDirective)
    }
  ]
})
export class PdkTextInputDirective implements FormFieldControl {
  readonly pdkInputRef = inject(PdkInputDirective, { optional: true, self: true });
  @Input('pdk-text-input') format?: TextInputFormat;
  @Input('email')
  set email(on: boolean) {
    this.format = coerceBooleanProperty(on) ? 'email' : this.format;
  }
  @Input('number')
  set number(on: boolean) {
    this.format = coerceBooleanProperty(on) ? 'number' : this.format;
  }
  @Input('postcode')
  set postcode(on: boolean) {
    this.format = coerceBooleanProperty(on) ? 'postcode' : this.format;
  }
  @HostBinding('attr.aria-describedby') @Input() ariaDescribedBy: string | null;
  @HostBinding('attr.id') @Input() id: string;
  @HostBinding('class.govuk-input') inputClass = true;
  @HostBinding('class.govuk-input--error')
  @Input()
  set hasError(value: boolean) {
    this._hasError = value;
    if (this.pdkInputRef) {
      this.pdkInputRef.hasError = value;
    }
  }
  get hasError() {
    return this._hasError;
  }
  @HostBinding('class.govuk-input--width-5')
  get inputWidth() {
    return this.format === 'postcode';
  }

  get errorMessages() {
    return this.errorMessagesByFormat[this.format];
  }
  controlRef = signal(
    inject(ElementRef<HTMLInputElement | HTMLTextAreaElement>, { self: true })
  ).asReadonly();
  multi = false;
  controlType = 'text';
  private _hasError = false;

  private errorMessagesByFormat: Record<TextInputFormat, ErrorMessageConfig[]> = {
    email: [
      {
        rule: 'required',
        message: 'Enter an email address'
      }
    ],
    number: [
      {
        rule: 'required',
        message: 'Enter a number'
      }
    ],
    postcode: [
      {
        rule: 'required',
        message: 'Enter a postcode'
      }
    ]
  };

  constructor(private injector: Injector) {}

  get ngControl(): NgControl {
    return this.injector.get(NgControl as Type<NgControl>);
  }
}
