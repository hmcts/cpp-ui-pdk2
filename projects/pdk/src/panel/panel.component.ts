import { Component, Input, ViewEncapsulation } from '@angular/core';

export type PanelType = 'confirmation';

@Component({
  selector: 'pdk-panel',
  template: `
    <div class="govuk-panel" [class.govuk-panel--confirmation]="type === 'confirmation'">
      <h1 class="govuk-panel__title">{{ title }}</h1>
      <div class="govuk-panel__body"><ng-content></ng-content></div>
    </div>
  `,
  styleUrls: ['./panel.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PdkPanelComponent {
  @Input() type: PanelType = 'confirmation';
  @Input() title: string;
}
