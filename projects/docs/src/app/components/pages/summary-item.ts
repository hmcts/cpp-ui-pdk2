import { Component } from '@angular/core';
import { HeaderComponent } from '../../common/example-header/example-header';
import {
  PdkTypographyDirective,
  PdkGridComponent,
  PdkGridDirective,
  PdkSummaryItemComponent as SummaryItemComponent_1,
  PdkTextColorDirective
} from '@cpp/pdk';
import { ExampleComponent } from '../../common/example/example.component';
import {
  CodeComponent,
  PropsListComponent,
  PropsListItemComponent
} from '../../common/props-list/props-list';

const markup = `
<pdk-summary-item
  count="10"
  label="Exhibits"
>
</pdk-summary-item>

<pdk-summary-item
  pdk-text-colour="blue"
  hero
  count="2"
  label="Case documents"
>
</pdk-summary-item>
`;

@Component({
  selector: 'docs-summary-item',
  template: `
    <docs-example-header origin="CPP">
      <span pdk-typography="caption-xlarge">Components</span>
      <h1 pdk-typography="heading-xlarge">Summary item</h1>
    </docs-example-header>
    <p pdk-typography="body">Use this component to highlight the numeric count of a given unit.</p>

    <!-- Example -->

    <h2 pdk-typography="heading-large">Example</h2>

    <docs-example [html]="html">
      <pdk-grid container>
        <pdk-grid one-quarter>
          <pdk-summary-item count="10" label="Exhibits"></pdk-summary-item>
        </pdk-grid>
        <pdk-grid one-quarter>
          <pdk-summary-item
            pdk-text-colour="blue"
            hero
            count="2"
            label="Case documents"
          ></pdk-summary-item>
        </pdk-grid>
      </pdk-grid>
    </docs-example>

    <!-- Api -->

    <h2 pdk-typography="heading-large">Api</h2>
    <p pdk-typography="body">
      To use this component, add <code docs-code>PdkSummaryItemComponent</code> to your list of
      ngModule/ standalone component imports.
    </p>

    <h3 pdk-typography="heading-medium">pdk-summary-item</h3>
    <docs-props-list>
      <docs-props-list-item name="count" type="number">
        The total number of units being summarized.
      </docs-props-list-item>
      <docs-props-list-item name="label" type="string">
        The units being summarized.
      </docs-props-list-item>
      <docs-props-list-item name="hero" type="boolean" defaultValue="false">
        If <code docs-code>true</code>, the <code docs-code>count</code> will use its larger
        display.
      </docs-props-list-item>
      <docs-props-list-item name="inline" type="boolean" defaultValue="false">
        If <code docs-code>true</code>, the <code docs-code>label</code> will be displayed alongside
        the <code docs-code>count</code>.
      </docs-props-list-item>
    </docs-props-list>
  `,
  imports: [
    HeaderComponent,
    PdkTypographyDirective,
    ExampleComponent,
    PdkGridComponent,
    PdkGridDirective,
    SummaryItemComponent_1,
    PdkTextColorDirective,
    CodeComponent,
    PropsListComponent,
    PropsListItemComponent
  ]
})
export class SummaryItemComponent {
  html = markup;
}
