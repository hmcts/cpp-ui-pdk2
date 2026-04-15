import { Component } from '@angular/core';
import { HeaderComponent } from '../../common/example-header/example-header';
import {
  PdkTypographyDirective,
  PdkLinkDirective,
  PdkInsetTextComponent as InsetTextComponent_1,
  PdkMarginDirective
} from '@cpp/pdk';
import { ExampleComponent } from '../../common/example/example.component';
import {
  CodeComponent,
  PropsListComponent,
  PropsListItemComponent
} from '../../common/props-list/props-list';

const markup = `
<pdk-inset-text>
  It can take up to 8 weeks to register a lasting power of attorney if there are no mistakes
  in the application.
</pdk-inset-text>
`;

@Component({
  selector: 'docs-inset-text',
  template: `
    <docs-example-header origin="GOV.UK">
      <span pdk-typography="caption-xlarge">Components</span>
      <h1 pdk-typography="heading-xlarge">Inset text</h1>
    </docs-example-header>
    <p pdk-typography="body">
      Use the inset text component to differentiate a block of text from the content that surrounds
      it, for example with quotes, examples, or additional information about the page. The usage
      guidelines and related research for this component can be found
      <a pdk-link href="https://design-system.service.gov.uk/components/inset-text">here</a>.
    </p>

    <!-- Example -->

    <h2 pdk-typography="heading-large">Example</h2>

    <docs-example [html]="html">
      <pdk-inset-text pdk-margin="0">
        It can take up to 8 weeks to register a lasting power of attorney if there are no mistakes
        in the application.
      </pdk-inset-text>
    </docs-example>

    <!-- Api -->

    <h2 pdk-typography="heading-large">Api</h2>
    <p pdk-typography="body">
      To use this component, add <code docs-code>PdkInsetTextComponent</code> to your list of
      ngModule/ standalone component imports.
    </p>

    <h3 pdk-typography="heading-medium">pdk-inset-text</h3>
    <docs-props-list>
      <docs-props-list-item name="ng-content" type="node">
        The content for the component.
      </docs-props-list-item>
    </docs-props-list>
  `,
  imports: [
    HeaderComponent,
    PdkTypographyDirective,
    PdkLinkDirective,
    ExampleComponent,
    InsetTextComponent_1,
    PdkMarginDirective,
    CodeComponent,
    PropsListComponent,
    PropsListItemComponent
  ]
})
export class InsetTextComponent {
  html = markup;
}
