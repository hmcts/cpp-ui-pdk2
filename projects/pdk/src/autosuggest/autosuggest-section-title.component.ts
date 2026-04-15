import { Component, Input, TemplateRef } from '@angular/core';
import { AutosuggestSection } from './autosuggest.interfaces';
import { NgTemplateOutlet } from '@angular/common';
import { PdkTypographyDirective } from '../core/typography';

@Component({
  selector: 'pdk-autosuggest-section-title',
  template: `
    <ng-template
      [ngTemplateOutlet]="templateRef || sectionTitleRef"
      [ngTemplateOutletContext]="{ section: section }"
    >
    </ng-template>
    <ng-template #sectionTitleRef>
      <span pdk-typography="heading-small">{{ section.title }}</span>
    </ng-template>
  `,
  imports: [NgTemplateOutlet, PdkTypographyDirective]
})
export class PdkAutosuggestSectionTitleComponent<T = unknown> {
  @Input() section!: AutosuggestSection<T>;
  @Input() templateRef?: TemplateRef<{ section: AutosuggestSection<T> }>;
}
