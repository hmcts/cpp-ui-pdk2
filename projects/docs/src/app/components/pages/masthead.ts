import { Component } from '@angular/core';
import { HeaderComponent } from '../../common/example-header/example-header';
import { PdkTypographyDirective, PdkMastheadComponent as MastheadComponent_1 } from '@cpp/pdk';
import { ExampleComponent } from '../../common/example/example.component';
import {
  CodeComponent,
  PropsListComponent,
  PropsListItemComponent
} from '../../common/props-list/props-list';

const markup = `
<pdk-masthead>
  <h1>Platform Development Kit</h1>
  <p>It can take up to 8 weeks to register a lasting power of attorney if there are no mistakes
  in the application.</p>
</pdk-masthead>
`;

@Component({
  selector: 'docs-masthead',
  template: `
    <docs-example-header origin="CPP">
      <span pdk-typography="caption-xlarge">Components</span>
      <h1 pdk-typography="heading-xlarge">Masthead</h1>
    </docs-example-header>
    <p pdk-typography="body">Use this component as the headline banner for a page.</p>

    <!-- Example -->

    <h2 pdk-typography="heading-large">Example</h2>

    <docs-example [html]="html" style="overflow: hidden; display: block">
      <pdk-masthead>
        <h1>Platform Development Kit</h1>
        <p>
          It can take up to 8 weeks to register a lasting power of attorney if there are no mistakes
          in the application.
        </p>
      </pdk-masthead>
    </docs-example>

    <!-- Api -->

    <h2 pdk-typography="heading-large">Api</h2>
    <p pdk-typography="body">
      To use this component, add <code docs-code>PdkMastheadComponent</code> to your list of
      ngModule/ standalone component imports.
    </p>

    <h3 pdk-typography="heading-medium">pdk-masthead</h3>
    <docs-props-list>
      <docs-props-list-item name="ng-content" type="node">
        The content for the component.
      </docs-props-list-item>
    </docs-props-list>
  `,
  imports: [
    HeaderComponent,
    PdkTypographyDirective,
    ExampleComponent,
    MastheadComponent_1,
    CodeComponent,
    PropsListComponent,
    PropsListItemComponent
  ]
})
export class MastheadComponent {
  html = markup;
}
