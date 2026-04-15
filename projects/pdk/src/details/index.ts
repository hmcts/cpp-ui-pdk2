import {
  PdkDetailsComponent,
  PdkDetailsDirective,
  PdkDetailsSummaryComponent,
  PdkDetailsTextDirective
} from './details';
import { PdkFauxDetailsComponent } from './faux-details';

export const PdkDetailsSummary = [
  PdkDetailsComponent,
  PdkDetailsDirective,
  PdkDetailsSummaryComponent,
  PdkDetailsTextDirective,
  PdkFauxDetailsComponent
] as const;
export {
  PdkDetailsComponent,
  PdkDetailsDirective,
  PdkDetailsSummaryComponent,
  PdkDetailsTextDirective,
  PdkFauxDetailsComponent
};
