import { Component } from '@angular/core';
import { HeaderComponent } from '../../common/example-header/example-header';
import {
  PdkTypographyDirective,
  PdkCookieMessageComponent as CookieMessageComponent_1
} from '@cpp/pdk';
import { ExampleComponent } from '../../common/example/example.component';
import { CodeComponent } from '../../common/props-list/props-list';

const markup = `
<pdk-cookie-message></pdk-cookie-message>
`;

@Component({
  selector: 'docs-cookie-message',
  template: `
    <docs-example-header origin="GOV.UK">
      <span pdk-typography="caption-xlarge">Components</span>
      <h1 pdk-typography="heading-xlarge">Cookie message</h1>
    </docs-example-header>
    <p pdk-typography="body">
      Use the cookie message at the top of a page when introducing users to the gov.uk cookies
      policy.
    </p>

    <!-- Example -->

    <h2 pdk-typography="heading-large">Example</h2>

    <docs-example [html]="html"> <pdk-cookie-message></pdk-cookie-message> </docs-example>

    <!-- Api -->

    <p pdk-typography="body">
      To use this component, add <code docs-code>PdkCookieMessageComponent</code> to your list of
      ngModule/ standalone component imports.
    </p>
  `,
  imports: [
    HeaderComponent,
    PdkTypographyDirective,
    ExampleComponent,
    CookieMessageComponent_1,
    CodeComponent
  ]
})
export class CookieMessageComponent {
  html = markup;
}
