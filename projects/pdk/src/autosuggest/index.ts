import { PdkAutosuggestLiteComponent } from './autosuggest-lite.component';
import { PdkAutosuggestOptionComponent } from './autosuggest-option.component';
import { PdkAutosuggestSectionTitleComponent } from './autosuggest-section-title.component';
import { PdkAutosuggestComponent } from './autosuggest.component';

export {
  PdkAutosuggestComponent,
  PdkAutosuggestLiteComponent,
  PdkAutosuggestOptionComponent,
  PdkAutosuggestSectionTitleComponent
};

export const PdkAutosuggest = [
  PdkAutosuggestComponent,
  PdkAutosuggestLiteComponent,
  PdkAutosuggestOptionComponent,
  PdkAutosuggestSectionTitleComponent
] as const;

export * from './autosuggest.interfaces';
