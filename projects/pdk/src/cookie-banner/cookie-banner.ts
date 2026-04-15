import { Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';

import { PdkGridComponent, PdkGridDirective } from '../grid/grid.component';
import { PdkTypographyDirective } from '../core/typography';

@Component({
  selector: 'pdk-cookie-banner',
  template: `
    <div class="govuk-cookie-banner" data-nosnippet role="region" [attr.aria-label]="heading">
      <div class="govuk-width-container">
        @if (heading) {
        <pdk-grid container>
          <pdk-grid two-thirds>
            <h2 pdk-typography="heading-medium" class="govuk-cookie-banner__heading">
              {{ heading }}
            </h2>
          </pdk-grid>
        </pdk-grid>
        }
        <ng-content></ng-content>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./cookie-banner.scss'],
  imports: [PdkGridComponent, PdkGridDirective, PdkTypographyDirective]
})
export class PdkCookieBannerComponent {
  @Input() heading: string | null = null;
  @HostBinding('class.govuk-template--rebranded') brand = true;
}

@Component({
  selector: 'pdk-cookie-banner-content',
  template: `
    <pdk-grid container>
      <pdk-grid two-thirds>
        <div class="pdk-cookie-banner__content"><ng-content></ng-content></div
      ></pdk-grid>
    </pdk-grid>
  `,
  imports: [PdkGridComponent, PdkGridDirective]
})
export class PdkCookieBannerContentComponent {}
