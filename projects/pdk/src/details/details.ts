import { Component, Directive, HostBinding, Optional, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'details[pdk-details]',
  template: ` <ng-content></ng-content> `,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./details.scss']
})
export class PdkDetailsComponent {}

@Directive({ selector: 'details[pdk-details]' })
export class PdkDetailsDirective {
  @HostBinding('class.govuk-details') details = true;
}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'summary',
  template: ` <span class="govuk-details__summary-text"> <ng-content></ng-content> </span> `
})
export class PdkDetailsSummaryComponent {
  @HostBinding('class.govuk-details__summary')
  get summary() {
    return Boolean(this.details);
  }

  constructor(@Optional() private details: PdkDetailsDirective) {}
}

@Directive({ selector: 'pdk-details-text, pdk-details-content' })
export class PdkDetailsTextDirective {
  @HostBinding('class.govuk-details__text') className = true;
}
