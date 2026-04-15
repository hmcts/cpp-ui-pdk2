import { Component } from '@angular/core';
import { HeaderComponent } from '../../common/example-header/example-header';
import {
  PdkTypographyDirective,
  PdkLinkDirective,
  PdkDetailsComponent as DetailsComponent_1,
  PdkDetailsDirective,
  PdkMarginDirective,
  PdkDetailsSummaryComponent,
  PdkDetailsTextDirective
} from '@cpp/pdk';
import { ExampleComponent } from '../../common/example/example.component';
import { CodeComponent } from '../../common/props-list/props-list';

const markup = `
<details pdk-details>
  <summary>Help with nationality</summary>
  <pdk-details-text>
    We need to know your nationality so we can work out which elections you’re
    entitled to vote in. If you cannot provide your nationality, you’ll have to
    send copies of identity documents through the post.
  </pdk-details-text>
</details>
`;

@Component({
  selector: 'docs-details',
  template: `
    <docs-example-header origin="GOV.UK">
      <span pdk-typography="caption-xlarge">Components</span>
      <h1 pdk-typography="heading-xlarge">Details</h1>
    </docs-example-header>
    <p pdk-typography="body">
      Make a page easier to scan by letting users reveal more detailed information only if they need
      it. The usage guidelines and related research for this component can be found
      <a pdk-link href="https://design-system.service.gov.uk/components/details/">here</a>.
    </p>

    <!-- Example -->

    <h2 pdk-typography="heading-large">Example</h2>

    <docs-example [html]="html">
      <details pdk-details pdk-margin-bottom="0">
        <summary>Help with nationality</summary>
        <pdk-details-text>
          We need to know your nationality so we can work out which elections you’re entitled to
          vote in. If you cannot provide your nationality, you’ll have to send copies of identity
          documents through the post.
        </pdk-details-text>
      </details>
    </docs-example>

    <!-- Api -->

    <p pdk-typography="body">
      To use this component, add <code docs-code>PdkDetailsSummary</code> to your list of ngModule/
      standalone component imports.
    </p>
  `,
  imports: [
    HeaderComponent,
    PdkTypographyDirective,
    PdkLinkDirective,
    ExampleComponent,
    DetailsComponent_1,
    PdkDetailsDirective,
    PdkMarginDirective,
    PdkDetailsSummaryComponent,
    PdkDetailsTextDirective,
    CodeComponent
  ]
})
export class DetailsComponent {
  html = markup;
}
