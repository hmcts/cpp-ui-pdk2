import { PdkActionButtonComponent } from './action-button.component';
import {
  PdkActionDetailsComponent,
  PdkActionDetailsSelectorsDirective
} from './action-details.component';

export const PdkAction = [
  PdkActionButtonComponent,
  PdkActionDetailsComponent,
  PdkActionDetailsSelectorsDirective
] as const;

export { PdkActionButtonComponent, PdkActionDetailsComponent, PdkActionDetailsSelectorsDirective };
