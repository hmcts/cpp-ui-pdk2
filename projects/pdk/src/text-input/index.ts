import { PdkTextInputDirective, TextInputFormat } from './text-input.directive';
import {
  PdkAddressLineValidatorDirective,
  PdkEmailValidatorDirective,
  PdkNumberValidatorDirective,
  PdkPostcodeValidatorDirective,
  validateAddressLine,
  validateEmail,
  validateNumber,
  validatePostcode,
  PdkTextInputValidators
} from './text-input.validators';

export const PdkTextInput = [
  PdkAddressLineValidatorDirective,
  PdkEmailValidatorDirective,
  PdkNumberValidatorDirective,
  PdkPostcodeValidatorDirective,
  PdkTextInputDirective
] as const;

export {
  validateAddressLine,
  validateEmail,
  validateNumber,
  validatePostcode,
  PdkTextInputValidators,
  TextInputFormat,
  PdkAddressLineValidatorDirective,
  PdkEmailValidatorDirective,
  PdkNumberValidatorDirective,
  PdkPostcodeValidatorDirective,
  PdkTextInputDirective
};
