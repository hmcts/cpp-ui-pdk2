import { Component } from '@angular/core';
import { HeaderComponent } from '../../common/example-header/example-header';
import {
  PdkTypographyDirective,
  PdkLinkDirective,
  PdkTabsNavigationComponent as TabsNavigationComponent_1,
  PdkTabsNavItemDirective,
  PdkTabsLinkDirective
} from '@cpp/pdk';
import { RouterLink } from '@angular/router';
import { ExampleComponent } from '../../common/example/example.component';
import {
  CodeComponent,
  PropsListComponent,
  PropsListItemComponent
} from '../../common/props-list/props-list';

const markup = `
<pdk-tabs-navigation>
  <pdk-tabs-nav-item [selected]="selected">
    <a href="#" pdk-tabs-link (click)="selected = 0">Tab one</a>
  </pdk-tabs-nav-item>
  <pdk-tabs-nav-item [selected]="selected">
    <a href="#" pdk-tabs-link (click)="selected = 1">Tab two</a>
  </pdk-tabs-nav-item>
</pdk-tabs-navigation>
`;

@Component({
  selector: 'docs-tabs-navigation',
  template: `
    <docs-example-header origin="CPP">
      <span pdk-typography="caption-xlarge">Components</span>
      <h1 pdk-typography="heading-xlarge">Tabs navigation</h1>
    </docs-example-header>
    <p pdk-typography="body">
      A navigation header used for displaying links as related sections of content. For a
      traditional tabs implementation, see <a pdk-link routerLink="/components/tabs">Tabs</a>.
    </p>

    <!-- Example -->

    <h2 pdk-typography="heading-large">Example</h2>

    <docs-example [html]="html">
      <pdk-tabs-navigation>
        <pdk-tabs-nav-item [selected]="selected === 0">
          <a href="javascript:void(0)" pdk-tabs-link (click)="selected = 0">Tab one</a>
        </pdk-tabs-nav-item>
        <pdk-tabs-nav-item [selected]="selected === 1">
          <a href="javascript:void(0)" pdk-tabs-link (click)="selected = 1">Tab two</a>
        </pdk-tabs-nav-item>
      </pdk-tabs-navigation>
    </docs-example>

    <!-- Api -->

    <h2 pdk-typography="heading-large">Api</h2>
    <p pdk-typography="body">
      To use this component, add <code docs-code>PdkTabs</code> to your list of ngModule/standalone
      component imports.
    </p>

    <h3 pdk-typography="heading-medium">pdk-tabs-navigation</h3>
    <p>The outer container for all navigation content.</p>
    <docs-props-list>
      <docs-props-list-item name="ng-content" type="node">
        The content for the component.
      </docs-props-list-item>
      <docs-props-list-item name="vertical" type="boolean" defaultValue="false">
        When <code docs-code>true</code> the child nav-items will be rendered vertically.
      </docs-props-list-item>
    </docs-props-list>

    <h3 pdk-typography="heading-medium">pdk-tabs-nav-item</h3>
    <p>Used for each navigation item in your tabs navigation.</p>
    <docs-props-list>
      <docs-props-list-item name="ng-content" type="node">
        The content for the component.
      </docs-props-list-item>
      <docs-props-list-item name="selected" type="boolean" defaultValue="false">
        When <code docs-code>true</code>, displays the link as the selected tab.
      </docs-props-list-item>
    </docs-props-list>

    <h3 pdk-typography="heading-medium">a[pdk-tabs-link]</h3>
    <p>Styles any nav link used in your navigation.</p>
  `,
  imports: [
    HeaderComponent,
    PdkTypographyDirective,
    PdkLinkDirective,
    RouterLink,
    ExampleComponent,
    TabsNavigationComponent_1,
    PdkTabsNavItemDirective,
    PdkTabsLinkDirective,
    CodeComponent,
    PropsListComponent,
    PropsListItemComponent
  ]
})
export class TabsNavigationComponent {
  html = markup;

  selected = 0;
}
