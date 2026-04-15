import { Directive, forwardRef } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';

const ADDRESS_LINE = /^[a-zA-Z0-9].*/;
const NUMBER = /^\d+$/;
const EMAIL =
  /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const POSTCODE =
  /^(([gG][iI][rR] {0,}0[aA]{2})|(([aA][sS][cC][nN]|[sS][tT][hH][lL]|[tT][dD][cC][uU]|[bB][bB][nN][dD]|[bB][iI][qQ][qQ]|[fF][iI][qQ][qQ]|[pP][cC][rR][nN]|[sS][iI][qQ][qQ]|[iT][kK][cC][aA]) {0,}1[zZ]{2})|((([a-pr-uwyzA-PR-UWYZ][a-hk-yxA-HK-XY]?[0-9][0-9]?)|(([a-pr-uwyzA-PR-UWYZ][0-9][a-hjkstuwA-HJKSTUW])|([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y][0-9][abehmnprv-yABEHMNPRV-Y]))) [0-9][abd-hjlnp-uw-zABD-HJLNP-UW-Z]{2}))$/;

export function validateAddressLine(value: string): boolean {
  return ADDRESS_LINE.test(value);
}

export function validateEmail(value: string): boolean {
  return EMAIL.test(value);
}

export function validateNumber(value: string): boolean {
  return NUMBER.test(value);
}

export function validatePostcode(value: string): boolean {
  return POSTCODE.test(value);
}

export class PdkTextInputValidators {
  static addressLine(control: AbstractControl) {
    if (control.value && !validateAddressLine(control.value)) {
      return {
        addressLine: true
      };
    }
    return null;
  }

  static email(control: AbstractControl) {
    if (control.value && !validateEmail(control.value)) {
      return {
        email: true
      };
    }
    return null;
  }

  static number(control: AbstractControl) {
    if (control.value && !validateNumber(control.value)) {
      return {
        number: true
      };
    }
    return null;
  }

  static postcode(control: AbstractControl) {
    if (control.value && !validatePostcode(control.value)) {
      return {
        postcode: true
      };
    }
    return null;
  }
}

@Directive({
  selector: '[addressLine]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PdkAddressLineValidatorDirective),
      multi: true
    }
  ]
})
export class PdkAddressLineValidatorDirective implements Validator {
  validate = PdkTextInputValidators.addressLine;
}

@Directive({
  selector: '[email]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PdkEmailValidatorDirective),
      multi: true
    }
  ]
})
export class PdkEmailValidatorDirective implements Validator {
  validate = PdkTextInputValidators.email;
}

@Directive({
  selector: '[number]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PdkNumberValidatorDirective),
      multi: true
    }
  ]
})
export class PdkNumberValidatorDirective implements Validator {
  validate = PdkTextInputValidators.number;
}

@Directive({
  selector: '[postcode]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PdkPostcodeValidatorDirective),
      multi: true
    }
  ]
})
export class PdkPostcodeValidatorDirective implements Validator {
  validate = PdkTextInputValidators.postcode;
}
