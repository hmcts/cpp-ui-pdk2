import { Component } from '@angular/core';
import { HeaderComponent } from '../../common/example-header/example-header';
import {
  PdkTypographyDirective,
  PdkLinkDirective,
  PdkCookieBannerComponent as CookieBannerComponent_1,
  PdkCookieBannerContentComponent,
  PdkButtonGroupComponent,
  PdkButtonComponent,
  PdkButtonDirective
} from '@cpp/pdk';
import { ExampleComponent } from '../../common/example/example.component';
import { CodeComponent } from '../../common/props-list/props-list';

const markup = `
<pdk-cookie-banner heading="Cookies on [name of service]">
  <pdk-cookie-banner-content>
    <p>We use some essential cookies to make this service work.</p>
    <p>
      We’d like to set additional cookies so we can remember your settings, understand how
      people use the service and make improvements.
    </p>
  </pdk-cookie-banner-content>
  <pdk-button-group>
    <button pdk-button>Accept additional cookies</button>
    <button pdk-button>Reject additional cookies</button>
    <a pdk-link href="#">View cookies</a>
  </pdk-button-group>
</pdk-cookie-banner>
`;

@Component({
  selector: 'docs-cookie-banner',
  template: `
    <docs-example-header origin="GOV.UK">
      <span pdk-typography="caption-xlarge">Components</span>
      <h1 pdk-typography="heading-xlarge">Cookie banner</h1>
    </docs-example-header>
    <p pdk-typography="body">
      Use the cookie banner to allow users to accept or reject cookies which are not essential to
      making your service work. The usage guidelines and related research for this component can be
      found
      <a pdk-link href="https://design-system.service.gov.uk/components/cookie-banner/">here</a>.
    </p>

    <!-- Example -->

    <h2 pdk-typography="heading-large">Example</h2>

    <docs-example [html]="html">
      <pdk-cookie-banner heading="Cookies on [name of service]">
        <pdk-cookie-banner-content>
          <p>We use some essential cookies to make this service work.</p>
          <p>
            We’d like to set additional cookies so we can remember your settings, understand how
            people use the service and make improvements.
          </p>
        </pdk-cookie-banner-content>
        <pdk-button-group>
          <button pdk-button>Accept additional cookies</button>
          <button pdk-button>Reject additional cookies</button>
          <a pdk-link href="javascript:void(0)">View cookies</a>
        </pdk-button-group>
      </pdk-cookie-banner>
    </docs-example>

    <!-- Api -->

    <p pdk-typography="body">
      To use this component, add <code docs-code>PdkCookieBanner</code> to your list of ngModule/
      standalone component imports.
    </p>
  `,
  imports: [
    HeaderComponent,
    PdkTypographyDirective,
    PdkLinkDirective,
    ExampleComponent,
    CookieBannerComponent_1,
    PdkCookieBannerContentComponent,
    PdkButtonGroupComponent,
    PdkButtonComponent,
    PdkButtonDirective,
    CodeComponent
  ]
})
export class CookieBannerComponent {
  html = markup;
}
