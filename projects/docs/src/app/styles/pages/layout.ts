import { Component } from '@angular/core';
import { PdkGrid, PdkCore } from '@cpp/pdk';
import { ExampleComponent } from '../../common/example/example.component';
import {
  PropsListComponent,
  PropsListItemComponent,
  CodeComponent
} from '../../common/props-list/props-list';

const grid = `
<pdk-grid container>
  <pdk-grid two-thirds>
    <h1 pdk-typography="heading-xlarge">Two-thirds column</h1>
    <p pdk-typography="body">This is a paragraph inside a two-thirds wide column</p>
  </pdk-grid>
  <div pdk-grid one-third>
    <h2 pdk-typography="heading-medium">One-third column</h2>
    <p pdk-typography="body">This is a paragraph inside a one-third wide column</p>
  </div>
</pdk-grid>
`;

@Component({
  selector: 'docs-styles-layout-page',
  template: `
    <span pdk-typography="caption-xlarge">Styles</span>
    <h1 pdk-typography="heading-xlarge">Layout</h1>
    <p pdk-typography="body">
      The usage guidelines and related research for layout can be found
      <a pdk-link href="https://design-system.service.gov.uk/styles/layout">here</a>.
    </p>

    <!-- Example -->

    <h2 pdk-typography="heading-large">Grid</h2>

    <p pdk-typography="body">Use the grid system to lay out the content on your service’s pages.</p>
    <p></p>
    <p pdk-typography="body">
      Most GOV.UK pages follow a two-thirds to one-third layout but the grid system allows for a
      number of additional combinations when necessary.
    </p>
    <p pdk-typography="body">
      Your main content should always be in a two-thirds column even if you’re not using a
      corresponding one-third column for secondary content.
    </p>

    <h3 pdk-typography="heading-medium">Example</h3>

    <docs-example [html]="grid">
      <pdk-grid container pdk-margin-bottom="6">
        <pdk-grid two-thirds>
          <h1 pdk-typography="heading-xlarge">Two-thirds column</h1>
          <p pdk-typography="body">This is a paragraph inside a two-thirds wide column</p>
        </pdk-grid>
        <div pdk-grid one-third>
          <h2 pdk-typography="heading-medium">One-third column</h2>
          <p pdk-typography="body">This is a paragraph inside a one-third wide column</p>
        </div>
      </pdk-grid>
    </docs-example>

    <h3 pdk-typography="heading-medium">Api</h3>

    <h4 pdk-typography="heading-small">pdk-grid, [pdk-grid]</h4>
    <docs-props-list [propWidth]="200">
      <docs-props-list-item name="ng-content" type="node">
        The content for the component.
      </docs-props-list-item>
      <docs-props-list-item name="container" type="boolean" defaultValue="false">
        When <code docs-code>true</code>, the component will behave as a containing row.
      </docs-props-list-item>
      <docs-props-list-item name="full" type="boolean">
        When <code docs-code>true</code>, applies a responsive full width.
      </docs-props-list-item>
      <docs-props-list-item name="one-half" type="boolean">
        When <code docs-code>true</code>, applies a responsive width of one half.
      </docs-props-list-item>
      <docs-props-list-item name="one-third" type="boolean">
        When <code docs-code>true</code>, applies a responsive width of one thirds.
      </docs-props-list-item>
      <docs-props-list-item name="two-thirds" type="boolean">
        When <code docs-code>true</code>, applies a responsive width of two thirds.
      </docs-props-list-item>
      <docs-props-list-item name="one-quarter" type="boolean">
        When <code docs-code>true</code>, applies a responsive width of one quarter.
      </docs-props-list-item>
      <docs-props-list-item name="three-quarters" type="boolean">
        When <code docs-code>true</code>, applies a responsive width of three quarters.
      </docs-props-list-item>
      <docs-props-list-item name="offset-one-quarter" type="boolean">
        When <code docs-code>true</code>, applies a responsive offset of one quarter.
      </docs-props-list-item>
      <docs-props-list-item name="offset-one-half" type="boolean">
        When <code docs-code>true</code>, applies a responsive offset of one half.
      </docs-props-list-item>
      <docs-props-list-item name="offset-one-third" type="boolean">
        When <code docs-code>true</code>, applies a responsive offset of one third.
      </docs-props-list-item>
      <docs-props-list-item name="offset-two-thirds" type="boolean">
        When <code docs-code>true</code>, applies a responsive offset of two thirds.
      </docs-props-list-item>
      <docs-props-list-item name="offset-three-quarters" type="boolean">
        When <code docs-code>true</code>, applies a responsive offset of three quarters.
      </docs-props-list-item>
    </docs-props-list>
  `,
  imports: [
    PdkCore,
    ExampleComponent,
    PdkGrid,
    PropsListComponent,
    PropsListItemComponent,
    CodeComponent
  ]
})
export class LayoutComponent {
  grid = grid;
}
