import { PdkDateInputComponent } from './date-input.component';
import {
  PdkFutureDateValidatorDirective,
  PdkMaxDateValidatorDirective,
  PdkMinDateValidatorDirective,
  PdkPastDateValidatorDirective,
  DateValidators,
  PdkWeekDateValidatorDirective
} from './date-input.validators';

export const PdkDateInput = [
  PdkDateInputComponent,
  PdkFutureDateValidatorDirective,
  PdkPastDateValidatorDirective,
  PdkMaxDateValidatorDirective,
  PdkMinDateValidatorDirective,
  PdkWeekDateValidatorDirective
] as const;

export {
  DateValidators,
  PdkDateInputComponent,
  PdkFutureDateValidatorDirective,
  PdkPastDateValidatorDirective,
  PdkMaxDateValidatorDirective,
  PdkMinDateValidatorDirective,
  PdkWeekDateValidatorDirective
};
