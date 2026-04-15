import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'pdk-button-group',
  template: ` <div class="govuk-button-group"><ng-content></ng-content></div> `,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./button-group.scss']
})
export class PdkButtonGroupComponent {}
