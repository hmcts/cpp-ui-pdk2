import { Component } from '@angular/core';
import { HeaderComponent } from '../../common/example-header/example-header';
import {
  PdkTypographyDirective,
  PdkLinkDirective,
  PdkWarningTextComponent as WarningTextComponent_1,
  PdkMarginDirective
} from '@cpp/pdk';
import { ExampleComponent } from '../../common/example/example.component';
import {
  CodeComponent,
  PropsListComponent,
  PropsListItemComponent
} from '../../common/props-list/props-list';

const markup = `
<pdk-warning-text>
  You can be fined up to £5,000 if you do not register.
</pdk-warning-text>
`;

@Component({
  selector: 'docs-warning-text',
  template: `
    <docs-example-header origin="GOV.UK">
      <span pdk-typography="caption-xlarge">Components</span>
      <h1 pdk-typography="heading-xlarge">Warning text</h1>
    </docs-example-header>
    <p pdk-typography="body">
      Use the warning text component when you need to warn users about something important, such as
      legal consequences of an action, or lack of action, that they might take.
    </p>
    <p>
      The usage guidelines and related research for this component can be found
      <a pdk-link href="https://design-system.service.gov.uk/components/warning-text">here</a>.
    </p>

    <!-- Example -->

    <h2 pdk-typography="heading-large">Example</h2>

    <docs-example [html]="html">
      <pdk-warning-text pdk-margin="0">
        You can be fined up to £5,000 if you do not register.
      </pdk-warning-text>
    </docs-example>

    <!-- Api -->

    <h2 pdk-typography="heading-large">Api</h2>
    <p pdk-typography="body">
      To use this component, add <code docs-code>PdkWarningTextComponent</code> to your list of
      ngModule / standalone component imports.
    </p>

    <h3 pdk-typography="heading-medium">pdk-warning-text</h3>
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
    WarningTextComponent_1,
    PdkMarginDirective,
    CodeComponent,
    PropsListComponent,
    PropsListItemComponent
  ]
})
export class WarningTextComponent {
  html = markup;
}
