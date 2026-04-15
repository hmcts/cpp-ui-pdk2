import {
  Component,
  ContentChildren,
  Input,
  QueryList,
  TemplateRef,
  ViewChild
} from '@angular/core';

import { PdkTabHeadingComponent } from './tab-heading.component';

@Component({
  selector: 'pdk-tab',
  template: `
    <section
      [attr.id]="'pdk-tab-section-' + (id || index)"
      [attr.aria-hidden]="!selected"
      [class.govuk-tabs__panel--hidden]="!selected"
      class="govuk-tabs__panel"
      role="tabpanel"
    >
      <ng-template #innerTemplate> <ng-content select="pdk-tab-heading"></ng-content> </ng-template>
      <ng-content></ng-content>
    </section>
  `
})
export class PdkTabComponent {
  @Input() heading: string;
  @Input() selected = false;
  @ContentChildren(PdkTabHeadingComponent) tabHeading: QueryList<PdkTabHeadingComponent>;
  @ViewChild('innerTemplate') headingTemplate: TemplateRef<any>;
  @Input() id: string;
  index: number;
}
