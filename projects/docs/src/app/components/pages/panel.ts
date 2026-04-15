import { Component } from '@angular/core';
import { HeaderComponent } from '../../common/example-header/example-header';
import {
  PdkTypographyDirective,
  PdkLinkDirective,
  PdkPanelComponent as PanelComponent_1
} from '@cpp/pdk';
import { ExampleComponent } from '../../common/example/example.component';
import {
  CodeComponent,
  PropsListComponent,
  PropsListItemComponent
} from '../../common/props-list/props-list';

const markup = `
<pdk-panel title="Application complete">
  Your reference number
  <br><strong>HDJ2123F</strong>
</pdk-panel>
`;

@Component({
  selector: 'docs-panel',
  template: `
    <docs-example-header origin="GOV.UK">
      <span pdk-typography="caption-xlarge">Components</span>
      <h1 pdk-typography="heading-xlarge">Panel</h1>
    </docs-example-header>
    <p pdk-typography="body">
      The panel component is a visible container used on confirmation or results pages to highlight
      important content. The usage guidelines and related research for this component can be found
      <a pdk-link href="https://design-system.service.gov.uk/components/panel">here</a>.
    </p>

    <!-- Example -->

    <h2 pdk-typography="heading-large">Example</h2>

    <docs-example [html]="html">
      <pdk-panel title="Application complete">
        Your reference number <br /><strong>HDJ2123F</strong>
      </pdk-panel>
    </docs-example>

    <!-- Api -->

    <h2 pdk-typography="heading-large">Api</h2>
    <p pdk-typography="body">
      To use this component, add <code docs-code>PdkPanelComponent</code> to your list of ngModule/
      standalone component imports.
    </p>

    <h3 pdk-typography="heading-medium">pdk-panel</h3>
    <docs-props-list>
      <docs-props-list-item name="type" type="enum: confirmation" defaultValue="confirmation">
        The contextual colour for the panel.
      </docs-props-list-item>
      <docs-props-list-item name="title" type="string"> The title text </docs-props-list-item>
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
    PanelComponent_1,
    CodeComponent,
    PropsListComponent,
    PropsListItemComponent
  ]
})
export class PanelComponent {
  html = markup;
}
