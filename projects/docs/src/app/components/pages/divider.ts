import { Component } from '@angular/core';
import { HeaderComponent } from '../../common/example-header/example-header';
import { PdkTypographyDirective, PdkDividerComponent as DividerComponent_1 } from '@cpp/pdk';
import { ExampleComponent } from '../../common/example/example.component';
import {
  CodeComponent,
  PropsListComponent,
  PropsListItemComponent
} from '../../common/props-list/props-list';

const markup = `
<pdk-divider dark hero></pdk-divider>
`;

@Component({
  selector: 'docs-divider',
  template: `
    <docs-example-header origin="CPP">
      <span pdk-typography="caption-xlarge">Components</span>
      <h1 pdk-typography="heading-xlarge">Divider</h1>
    </docs-example-header>
    <p pdk-typography="body">Use this component to divide pages into clearly distinct sections.</p>

    <!-- Example -->

    <h2 pdk-typography="heading-large">Example</h2>

    <docs-example [html]="html"> <pdk-divider dark hero></pdk-divider> </docs-example>

    <!-- Api -->

    <h2 pdk-typography="heading-large">Api</h2>
    <p pdk-typography="body">
      To use this component, add <code docs-code>PdkDividerComponent</code> to your list of
      ngModule/ standalone component imports.
    </p>
    <h3 pdk-typography="heading-medium">pdk-divider</h3>
    <docs-props-list>
      <docs-props-list-item name="hero" type="boolean" defaultValue="false">
        If <code docs-code>true</code>, the divider will use its thicker form.
      </docs-props-list-item>
      <docs-props-list-item name="dark" type="boolean" defaultValue="false">
        If <code docs-code>true</code>, the divider will use its darker tone.
      </docs-props-list-item>
    </docs-props-list>
  `,
  imports: [
    HeaderComponent,
    PdkTypographyDirective,
    ExampleComponent,
    DividerComponent_1,
    CodeComponent,
    PropsListComponent,
    PropsListItemComponent
  ]
})
export class DividerComponent {
  html = markup;
}
