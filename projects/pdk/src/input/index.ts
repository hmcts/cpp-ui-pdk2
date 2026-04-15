import { PdkFieldsetComponent, PdkFieldsetLegendDirective } from './input-fieldset.directive';
import { PdkLabelComponent, PdkLabelDirective, LabelType } from './input-label.directive';
import { PdkInputComponent, PdkInputDirective, InputWidth } from './input.directive';
import {
  PdkMaxCountValidatorDirective,
  PdkMaximumLengthValidatorDirective,
  PdkMaxValueValidatorDirective,
  PdkMinCountValidatorDirective,
  PdkMinValueValidatorDirective,
  PdkValidatorDirective
} from './input.validators';

export { InputWidth, LabelType };

export const PdkInput = [
  PdkFieldsetComponent,
  PdkFieldsetLegendDirective,
  PdkInputComponent,
  PdkInputDirective,
  PdkLabelComponent,
  PdkLabelDirective,
  PdkMaxCountValidatorDirective,
  PdkMaximumLengthValidatorDirective,
  PdkMaxValueValidatorDirective,
  PdkMinCountValidatorDirective,
  PdkMinValueValidatorDirective,
  PdkValidatorDirective
] as const;
export {
  PdkFieldsetComponent,
  PdkFieldsetLegendDirective,
  PdkInputComponent,
  PdkInputDirective,
  PdkLabelComponent,
  PdkLabelDirective,
  PdkMaxCountValidatorDirective,
  PdkMaximumLengthValidatorDirective,
  PdkMaxValueValidatorDirective,
  PdkMinCountValidatorDirective,
  PdkMinValueValidatorDirective,
  PdkValidatorDirective
};
export * from './input.validators';
