import { Component } from '@angular/core';
import { HeaderComponent } from '../../common/example-header/example-header';
import {
  PdkTypographyDirective,
  PdkBadgeComponent as BadgeComponent_1,
  PdkBadgeDirective
} from '@cpp/pdk';
import { ExampleComponent } from '../../common/example/example.component';
import {
  CodeComponent,
  PropsListComponent,
  PropsListItemComponent
} from '../../common/props-list/props-list';

const markup = `
<pdk-badge>
  Important information
</pdk-badge>
`;

@Component({
  selector: 'docs-badge',
  template: `
    <docs-example-header origin="CPP">
      <span pdk-typography="caption-xlarge">Components</span>
      <h1 pdk-typography="heading-xlarge">Badge</h1>
    </docs-example-header>
    <p pdk-typography="body">Use this component to display important data or messages.</p>

    <!-- Example -->

    <h2 pdk-typography="heading-large">Example</h2>

    <docs-example [html]="html"> <pdk-badge> Important information </pdk-badge> </docs-example>

    <!-- Api -->

    <h2 pdk-typography="heading-large">Api</h2>
    <p pdk-typography="body">
      To use this component, add <code docs-code>PdkBadge</code> to your list of ngModule/standalone
      component imports.
    </p>

    <h3 pdk-typography="heading-medium">pdk-badge</h3>
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
    BadgeComponent_1,
    PdkBadgeDirective,
    CodeComponent,
    PropsListComponent,
    PropsListItemComponent
  ]
})
export class BadgeComponent {
  html = markup;
}
