import { PdkFormFieldComponent } from './form-field.component';
import { PdkFormGroupComponent, PdkFormGroupDirective } from './form-group.component';
import { PdkFormComponent } from './form.component';

export const PdkForm = [
  PdkFormFieldComponent,
  PdkFormComponent,
  PdkFormGroupComponent,
  PdkFormGroupDirective
] as const;
export * from './form.interfaces';

export { PdkFormFieldComponent, PdkFormComponent, PdkFormGroupComponent, PdkFormGroupDirective };
