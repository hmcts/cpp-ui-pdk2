import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'pdk-phase-banner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p class="govuk-phase-banner__content">
      <strong class="govuk-tag govuk-phase-banner__content__tag">{{ type }}</strong>
      <span class="govuk-phase-banner__text"> <ng-content></ng-content> </span>
    </p>
  `,
  styleUrls: ['./phase-banner.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PdkPhaseBannerComponent {
  @Input() type: string;
}
