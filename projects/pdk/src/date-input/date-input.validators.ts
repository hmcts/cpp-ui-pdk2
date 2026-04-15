import { Directive, forwardRef, Injector, Input, Type } from '@angular/core';
import {
  AbstractControl,
  NgControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn
} from '@angular/forms';
import { isWeekend } from '../date-picker/date-picker.util';

function toTimestamp(value: Date | string | number): number {
  let date: Date | string | number = value;

  if (typeof date === 'string') {
    const [year, month, day] = date.split('-');
    date = new Date(+year, +month - 1, +day);
  } else {
    date = new Date(value);
  }
  (date as Date).setHours(0, 0, 0, 0);

  return date.getTime();
}

export const validateMinDate = (
  value: Date | string | number,
  minDate: Date | string | number
): boolean => {
  return timeDiff(value, minDate) <= 0;
};

export const validateMaxDate = (
  value: Date | string | number,
  maxDate: Date | string | number
): boolean => {
  return timeDiff(value, maxDate) >= 0;
};

export const validatePastDate = (value: Date | string | number): boolean => {
  return timeDiff(value, Date.now()) >= 0;
};

export const validateFutureDate = (value: Date | string | number): boolean => {
  return timeDiff(value, Date.now()) <= 0;
};

export const validateWeekDate = (value: Date | string): boolean => {
  return !isWeekend(value);
};

export function timeDiff(a: Date | string | number, b: Date | string | number): number {
  return toTimestamp(b) - toTimestamp(a);
}

export class DateValidators {
  static maxDate(maxDate: Date | string | number): ValidatorFn {
    const validator = (control: AbstractControl): ValidationErrors | null => {
      if (control.value && maxDate) {
        return validateMaxDate(control.value, maxDate) ? null : { maxDate: true };
      }
      return null;
    };

    return validator;
  }

  static minDate(minDate: Date | string | number): ValidatorFn {
    const validator = (control: AbstractControl): ValidationErrors | null => {
      if (control.value && minDate) {
        return validateMinDate(control.value, minDate) ? null : { minDate: true };
      }
      return null;
    };

    return validator;
  }

  static pastDate(control: AbstractControl): ValidationErrors | null {
    if (control.value) {
      return validatePastDate(control.value) ? null : { pastDate: true };
    }
    return null;
  }

  static futureDate(control: AbstractControl): ValidationErrors | null {
    if (control.value) {
      return validateFutureDate(control.value) ? null : { futureDate: true };
    }
    return null;
  }

  static weekDate(control: AbstractControl): ValidationErrors | null {
    if (control?.value) {
      return validateWeekDate(control.value) ? null : { weekDate: true };
    }
    return null;
  }
}

@Directive({
  selector: '[minDate]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PdkMinDateValidatorDirective),
      multi: true
    }
  ]
})
export class PdkMinDateValidatorDirective implements Validator {
  private _validator: ValidatorFn;

  @Input('minDate') set validator(minDate: string) {
    const ngControl = this.injector.get(NgControl as Type<NgControl>);
    this._validator = DateValidators.minDate(minDate);
    if (ngControl && ngControl.control) {
      ngControl.control.updateValueAndValidity();
    }
  }

  constructor(private injector: Injector) {}

  validate(c: AbstractControl): ValidationErrors | null {
    return this._validator(c);
  }
}

@Directive({
  selector: '[maxDate]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PdkMaxDateValidatorDirective),
      multi: true
    }
  ]
})
export class PdkMaxDateValidatorDirective implements Validator {
  private _validator: ValidatorFn;

  @Input('maxDate') set validator(maxDate: string) {
    const ngControl = this.injector.get(NgControl as Type<NgControl>);
    this._validator = DateValidators.maxDate(maxDate);
    if (ngControl && ngControl.control) {
      ngControl.control.updateValueAndValidity();
    }
  }

  constructor(private injector: Injector) {}

  validate(c: AbstractControl): ValidationErrors | null {
    return this._validator(c);
  }
}

@Directive({
  selector: '[pastDate]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PdkPastDateValidatorDirective),
      multi: true
    }
  ]
})
export class PdkPastDateValidatorDirective implements Validator {
  validate = DateValidators.pastDate;
}

@Directive({
  selector: '[futureDate]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PdkFutureDateValidatorDirective),
      multi: true
    }
  ]
})
export class PdkFutureDateValidatorDirective implements Validator {
  validate = DateValidators.futureDate;
}

@Directive({
  selector: '[weekDate]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PdkWeekDateValidatorDirective),
      multi: true
    }
  ]
})
export class PdkWeekDateValidatorDirective implements Validator {
  validate = DateValidators.weekDate;
}
