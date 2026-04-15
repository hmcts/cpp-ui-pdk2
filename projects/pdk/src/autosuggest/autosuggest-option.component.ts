import { ChangeDetectionStrategy, Component, Input, TemplateRef } from '@angular/core';
import { PdkColor, PdkFillColorDirective } from '../core/colour';
import { NgTemplateOutlet } from '@angular/common';

export interface AutosuggestSuggestionTemplateContext<T = unknown> {
  highlighted: boolean;
  suggestion: T;
}

@Component({
  selector: 'pdk-autosuggest-option',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="pdk-autosuggest__suggestion"
      [class.pdk-autosuggest__suggestion--highlighted]="highlighted"
      [pdk-fill-colour]="highlighted && highlightColor"
    >
      <ng-template
        [ngTemplateOutlet]="templateRef"
        [ngTemplateOutletContext]="{
          highlighted: highlighted,
          matchText: matchText,
          suggestion: suggestion
        }"
      >
      </ng-template>
    </div>
  `,
  imports: [PdkFillColorDirective, NgTemplateOutlet]
})
export class PdkAutosuggestOptionComponent<T = unknown> {
  @Input() highlightColor?: PdkColor = 'dark-grey';
  @Input() highlighted = false;
  @Input() matchText = '';
  @Input() suggestion!: T;
  @Input() templateRef?: TemplateRef<AutosuggestSuggestionTemplateContext<T>>;
}
