import { Component } from '@angular/core';
import { HeaderComponent } from '../../common/example-header/example-header';
import { PdkTypographyDirective, PdkCollapsable } from '@cpp/pdk';
import { ExampleComponent } from '../../common/example/example.component';
import {
  CodeComponent,
  PropsListComponent,
  PropsListItemComponent
} from '../../common/props-list/props-list';

const markup = `
<pdk-collapsable ariaLabel="Toggle the collapsable content of this example">
  <p>This content will never be collapsed.</p>
  <p pdk-collapse>This content will be collapsed.</p>
  <p>
    Words that we are <span pdk-collapse><b>only sometimes</b></span> 
    interested in seeing can be collapsed.
  </p>
</pdk-collapsable>
`;

@Component({
  selector: 'docs-character-count',
  template: `
    <docs-example-header origin="CPP">
      <span pdk-typography="caption-xlarge">Components</span>
      <h1 pdk-typography="heading-xlarge">Collapsable</h1>
    </docs-example-header>
    <p pdk-typography="body">
      Use this component with sections containing a large surface area of content that make sense to
      be toggled into a condensed view containing the most pertinent information.
    </p>

    <!-- Example -->

    <h2 pdk-typography="heading-large">Example</h2>

    <docs-example [html]="html">
      <pdk-collapsable ariaLabel="Toggle the collapsable content of this example">
        <p>This content will never be collapsed.</p>
        <p pdk-collapse>This content will be collapsed.</p>
        <p>
          Words that we are <span pdk-collapse><b>only sometimes</b></span> interested in seeing can
          be collapsed.
        </p>
      </pdk-collapsable>
    </docs-example>

    <!-- Api -->

    <h2 pdk-typography="heading-large">Api</h2>

    <p pdk-typography="body">
      The collapsable is a <strong>semi-controlled</strong> component, in that its collapsed state
      is maintained by the component itself, but this state can be overriden through an external
      input.
    </p>
    <p pdk-typography="body">
      To use this component, add <code docs-code>PdkCollapsable</code> to your list of
      ngModule/standalone component imports.
    </p>

    <h3 pdk-typography="heading-medium">pdk-collapsable</h3>
    <docs-props-list>
      <docs-props-list-item name="ng-content" type="node">
        The content of the component.
      </docs-props-list-item>
      <docs-props-list-item name="ariaLabel" type="string">
        A description for screen readers of the content that this component will hide and show.
      </docs-props-list-item>
      <docs-props-list-item name="collapseChange" type="expression">
        An expression executed when the collapse button is toggled.
      </docs-props-list-item>
      <docs-props-list-item name="collapsed" type="boolean" defaultValue="false">
        If <code docs-code>true</code> then the content will be collapsed, overriding any internal
        state.
      </docs-props-list-item>
      <docs-props-list-item name="collapsedLabel" type="string" defaultValue="Show">
        The button label when the content is collapsed.
      </docs-props-list-item>
      <docs-props-list-item name="expandedLabel" type="string" defaultValue="Hide">
        The button label when the content is expanded.
      </docs-props-list-item>
    </docs-props-list>

    <h3 pdk-typography="heading-medium">pdk-collapse, [pdk-collapse]</h3>
    <docs-props-list>
      <docs-props-list-item name="ng-content" type="node">
        The content of the component which will be collapsed.
      </docs-props-list-item>
    </docs-props-list>
  `,
  imports: [
    HeaderComponent,
    PdkTypographyDirective,
    ExampleComponent,
    CodeComponent,
    PropsListComponent,
    PropsListItemComponent,
    PdkCollapsable
  ]
})
export class CollapsableComponent {
  html = markup;
}
