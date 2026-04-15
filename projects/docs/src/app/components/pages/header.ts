import { Component } from '@angular/core';
import { HeaderComponent as HeaderComponent_1 } from '../../common/example-header/example-header';
import {
  PdkTypographyDirective,
  PdkLinkDirective,
  PdkHeader,
  PdkWarningTextComponent
} from '@cpp/pdk';
import { ExampleComponent } from '../../common/example/example.component';
import {
  CodeComponent,
  PropsListComponent,
  PropsListItemComponent
} from '../../common/props-list/props-list';

const markup = `
<pdk-header>
  <a pdk-header-title href="#">Platform Development Kit</a>
  <pdk-header-nav>
    <pdk-header-nav-item>
      <a href="#" pdk-header-link>Navigation item 1</a>
    </pdk-header-nav-item>
  </pdk-header-nav>
</pdk-header>
`;

@Component({
  selector: 'docs-header',
  template: `
    <docs-example-header origin="GOV.UK">
      <span pdk-typography="caption-xlarge">Components</span>
      <h1 pdk-typography="heading-xlarge">Header</h1>
    </docs-example-header>
    <p pdk-typography="body">
      The header shows users which service they are using. The usage guidelines and related research
      for this component can be found
      <a pdk-link href="https://design-system.service.gov.uk/components/header">here</a>.
    </p>

    <!-- Example -->

    <h2 pdk-typography="heading-large">Example</h2>

    <docs-example [html]="html">
      <pdk-header>
        <a pdk-header-title href="javascript:void(0)">Platform Development Kit</a>
        <pdk-header-nav>
          <pdk-header-nav-item>
            <a href="javascript:void(0)" pdk-header-link>Navigation item 1</a>
          </pdk-header-nav-item>
        </pdk-header-nav>
      </pdk-header>
    </docs-example>

    <!-- Api -->

    <h2 pdk-typography="heading-large">Api</h2>
    <p pdk-typography="body">
      To use this component, add <code docs-code>PdkHeader</code> to your list of ngModule/
      standalone component imports.
    </p>

    <h3 pdk-typography="heading-medium">pdk-header</h3>
    <p>The outer container for all header content.</p>
    <docs-props-list>
      <docs-props-list-item name="ng-content" type="node">
        The content for the component.
      </docs-props-list-item>
    </docs-props-list>

    <h3 pdk-typography="heading-medium">pdk-header-nav</h3>
    <p>The container component for header nav items.</p>
    <docs-props-list>
      <docs-props-list-item name="ng-content" type="node">
        The content for the component.
      </docs-props-list-item>
    </docs-props-list>

    <h3 pdk-typography="heading-medium">pdk-header-nav-item</h3>
    <p>Used for each navigation item in your header nav.</p>
    <docs-props-list>
      <docs-props-list-item name="ng-content" type="node">
        The content for the component.
      </docs-props-list-item>
    </docs-props-list>

    <h3 pdk-typography="heading-medium">a[pdk-header-title]</h3>
    <p>Styles the service link used in your header.</p>

    <h3 pdk-typography="heading-medium">a[pdk-header-link]</h3>
    <p>Styles any nav link used in your header.</p>

    <pdk-warning-text>
      The [pdk-header-title] and pdk-header-nav components should be direct descendants of the
      pdk-header. Although you can project your content within the header to include components like
      search , if the [pdk-header-title] and pdk-header-nav are nested descendants , it may break
      the Design pattern specified by Gov.UK.
    </pdk-warning-text>
  `,
  imports: [
    HeaderComponent_1,
    PdkTypographyDirective,
    PdkLinkDirective,
    ExampleComponent,
    PdkHeader,
    CodeComponent,
    PropsListComponent,
    PropsListItemComponent,
    PdkWarningTextComponent
  ]
})
export class HeaderComponent {
  html = markup;
}
