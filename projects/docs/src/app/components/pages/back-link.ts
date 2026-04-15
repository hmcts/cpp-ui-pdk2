import { Component } from '@angular/core';
import { HeaderComponent } from '../../common/example-header/example-header';
import {
  PdkTypographyDirective,
  PdkLinkDirective,
  PdkBackLinkComponent as BackLinkComponent_1,
  PdkBackLinkDirective
} from '@cpp/pdk';
import { ExampleComponent } from '../../common/example/example.component';
import { CodeComponent } from '../../common/props-list/props-list';

const markup = `
<a href="#" pdk-back-link>Back</a>
`;

@Component({
  selector: 'docs-back-link',
  template: `
    <docs-example-header origin="GOV.UK">
      <span pdk-typography="caption-xlarge">Components</span>
      <h1 pdk-typography="heading-xlarge">Back link</h1>
    </docs-example-header>
    <p pdk-typography="body">
      Use the back link component to help users go back to the previous page in a multi-page
      transaction. The usage guidelines and related research for this component can be found
      <a pdk-link href="https://design-system.service.gov.uk/components/back-link/">here</a>.
    </p>

    <!-- Example -->

    <h2 pdk-typography="heading-large">Example</h2>

    <docs-example [html]="html"> <a href="javascript:void(0)" pdk-back-link>Back</a> </docs-example>

    <!-- Api -->

    <h2 pdk-typography="heading-large">Api</h2>
    <p pdk-typography="body">
      To use this component, add <code docs-code>PdkBackLink</code> to your list of
      ngModule/standalone component imports.
    </p>
  `,
  imports: [
    HeaderComponent,
    PdkTypographyDirective,
    PdkLinkDirective,
    ExampleComponent,
    BackLinkComponent_1,
    PdkBackLinkDirective,
    CodeComponent
  ]
})
export class BackLinkComponent {
  html = markup;
}
