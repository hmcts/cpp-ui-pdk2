import { Component, ViewEncapsulation } from '@angular/core';
import { PdkTypographyDirective } from '../core/typography';
import { PdkLinkDirective } from '../core/links';

@Component({
  selector: 'pdk-cookie-message',
  template: `
    <div class="pdk-cookie-message">
      <p pdk-typography="body" class="govuk-width-container">
        GOV.UK uses cookies to make the site simpler.
        <a pdk-link href="https://www.gov.uk/help/cookies">Find out more about cookies.</a>
      </p>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./cookie-message.scss'],
  imports: [PdkTypographyDirective, PdkLinkDirective]
})
export class PdkCookieMessageComponent {}
