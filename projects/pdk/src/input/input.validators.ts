import { Directive, forwardRef, Injector, Input, Type } from '@angular/core';
import {
  AbstractControl,
  NgControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn
} from '@angular/forms';

export function createValidatorForFormControl(
  validateFn: (value: unknown) => ValidationErrors | null
) {
  return function validatorForFormControl(control: AbstractControl) {
    return validateFn(control.value);
  };
}

export class InputValidators {
  static maxValue(max: number): ValidatorFn {
    const validator = (c: AbstractControl): ValidationErrors | null => {
      if (Number.isInteger(c.value) && c.value > max) {
        return {
          maxValue: {
            expected: max,
            actual: c.value
          }
        };
      }
      return null;
    };

    return validator;
  }

  static minValue(min: number): ValidatorFn {
    const validator = (c: AbstractControl): ValidationErrors | null => {
      if (Number.isInteger(c.value) && c.value < min) {
        return {
          maxValue: {
            expected: min,
            actual: c.value
          }
        };
      }
      return null;
    };

    return validator;
  }

  static minCount(count: number): ValidatorFn {
    const validator = (c: AbstractControl): ValidationErrors | null => {
      const value = c.value;

      if (value && value.length < count) {
        return {
          minCount: {
            expected: count,
            actual: value
          }
        };
      }
      return null;
    };

    return validator;
  }

  static maxCount(count: number): ValidatorFn {
    const validator = (c: AbstractControl): ValidationErrors | null => {
      const value = c.value || [];

      if (value.length > count) {
        return {
          maxCount: {
            expected: count,
            actual: value
          }
        };
      }
      return null;
    };

    return validator;
  }

  static maximumLength(length: number): ValidatorFn {
    const validator = (c: AbstractControl): ValidationErrors | null => {
      const value = c.value || '';

      if (value.length > length) {
        return {
          maximumLength: {
            expected: length,
            actual: value
          }
        };
      }
      return null;
    };

    return validator;
  }
}

@Directive({
  selector: '[validator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PdkValidatorDirective,
      multi: true
    }
  ]
})
export class PdkValidatorDirective implements Validator {
  @Input() validator: ValidatorFn;

  validate(control: AbstractControl): ValidationErrors | null {
    return this.validator(control);
  }
}

@Directive({
  selector: '[maxValue]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PdkMaxValueValidatorDirective),
      multi: true
    }
  ]
})
export class PdkMaxValueValidatorDirective implements Validator {
  private _validator: ValidatorFn;

  @Input('maxValue') set validator(max: number) {
    const ngControl = this.injector.get(NgControl as Type<NgControl>);
    this._validator = InputValidators.maxValue(max);
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
  selector: '[minValue]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PdkMinValueValidatorDirective),
      multi: true
    }
  ]
})
export class PdkMinValueValidatorDirective implements Validator {
  private _validator: ValidatorFn;

  @Input('minValue') set validator(min: number) {
    const ngControl = this.injector.get(NgControl as Type<NgControl>);
    this._validator = InputValidators.minValue(min);
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
  selector: '[minCount]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PdkMinCountValidatorDirective),
      multi: true
    }
  ]
})
export class PdkMinCountValidatorDirective implements Validator {
  private _validator: ValidatorFn;

  @Input('minCount') set validator(count: number) {
    const ngControl = this.injector.get(NgControl as Type<NgControl>);
    this._validator = InputValidators.minCount(count);
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
  selector: '[maxCount]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PdkMaxCountValidatorDirective),
      multi: true
    }
  ]
})
export class PdkMaxCountValidatorDirective implements Validator {
  private _validator: ValidatorFn;

  @Input('maxCount') set validator(count: number) {
    const ngControl = this.injector.get(NgControl as Type<NgControl>);
    this._validator = InputValidators.maxCount(count);
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
  // deliberately named 'maximum' to not clash with browser maxlength attribute
  selector: '[maximumLength]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PdkMaximumLengthValidatorDirective),
      multi: true
    }
  ]
})
export class PdkMaximumLengthValidatorDirective implements Validator {
  private _validator: ValidatorFn;

  @Input('maximumLength') set validator(length: number) {
    const ngControl = this.injector.get(NgControl as Type<NgControl>);
    this._validator = InputValidators.maximumLength(length);
    if (ngControl && ngControl.control) {
      ngControl.control.updateValueAndValidity();
    }
  }

  constructor(private injector: Injector) {}

  validate(c: AbstractControl): ValidationErrors | null {
    return this._validator(c);
  }
}
