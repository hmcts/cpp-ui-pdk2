import { Component } from '@angular/core';
import { HeaderComponent } from '../../common/example-header/example-header';
import {
  PdkTypographyDirective,
  PdkServiceNavigationComponent as ServiceNavigationComponent_1,
  PdkMarginDirective,
  PdkServiceNavigationListDirective,
  PdkServiceNavigationListItemDirective
} from '@cpp/pdk';
import { ExampleComponent } from '../../common/example/example.component';
import {
  CodeComponent,
  PropsListComponent,
  PropsListItemComponent
} from '../../common/props-list/props-list';

const markup = `
<nav pdk-service-nav>
  <ul pdk-service-nav-list>
    <li pdk-service-nav-list-item [selected]="true"><a href="#">Service item 1</a></li>
    <li pdk-service-nav-list-item><a href="#">Service item 2</a></li>
    <li pdk-service-nav-list-item><a href="#">Service item 3</a></li>
  </ul>
</nav>
`;

@Component({
  selector: 'docs-service-navigation',
  template: `
    <docs-example-header origin="GOV.UK | CPP">
      <span pdk-typography="caption-xlarge">Components</span>
      <h1 pdk-typography="heading-xlarge">Service navigation</h1>
    </docs-example-header>
    <p pdk-typography="body">
      A service navigation menu is used for displaying links as related sections within a service.
      Service navigation helps users understand that they’re using your service and lets them
      navigate around your service. The core usage guidelines and related research for this
      component can be found
      <a pdk-link href="https://design-system.service.gov.uk/components/service-navigation/">here</a
      >.
    </p>

    <!-- Example -->

    <h2 pdk-typography="heading-large">Example</h2>

    <docs-example [html]="html">
      <nav pdk-service-nav pdk-margin="0">
        <ul pdk-service-nav-list>
          <li pdk-service-nav-list-item [selected]="true">
            <a href="javascript:void(0)">Service item 1</a>
          </li>
          <li pdk-service-nav-list-item><a href="javascript:void(0)">Service item 2</a></li>
          <li pdk-service-nav-list-item><a href="javascript:void(0)">Service item 3</a></li>
        </ul>
      </nav>
    </docs-example>

    <!-- Api -->
    <h2 pdk-typography="heading-large">Api</h2>
    <p pdk-typography="body">
      To use this component, add <code docs-code>PdkServiceNavigation</code> to your list of
      ngModule/ standalone component imports.
    </p>

    <h3 pdk-typography="heading-medium">nav[pdk-service-nav]</h3>
    <p>The outer container for all service navigation content.</p>
    <docs-props-list>
      <docs-props-list-item name="ng-content" type="node">
        The content for the component. Should include the navigation list directive i.e
        <code docs-code>ul[pdk-service-nav-list]</code>
      </docs-props-list-item>
      <docs-props-list-item name="ariaLabel" type="string" defaultValue="Menu">
        The accessibility label for the navigation component.
      </docs-props-list-item>
      <docs-props-list-item name="clear" type="boolean" defaultValue="false">
        Use a clear Background. This is useful when displaying sub services within the Cpp Context.
        It creates distinction between the top level navigation and the sub level navigation
      </docs-props-list-item>
    </docs-props-list>

    <h3 pdk-typography="heading-medium">ul[pdk-service-nav-list]</h3>
    <p>The list component for service navigation items.</p>

    <h3 pdk-typography="heading-medium">li[pdk-service-nav-list-item]</h3>
    <p>Used for each navigation item in your service nav.</p>
    <docs-props-list>
      <docs-props-list-item name="selected" type="boolean">
        Used for setting the service nav item as active.
      </docs-props-list-item>
    </docs-props-list>

    <h3 pdk-typography="heading-medium">a[pdk-service-nav-list-link]</h3>
    <p>Styles any nav link used in your header. (Optional if you use a hyperlink)</p>
  `,
  imports: [
    HeaderComponent,
    PdkTypographyDirective,
    ExampleComponent,
    ServiceNavigationComponent_1,
    PdkMarginDirective,
    PdkServiceNavigationListDirective,
    PdkServiceNavigationListItemDirective,
    CodeComponent,
    PropsListComponent,
    PropsListItemComponent
  ]
})
export class ServiceNavigationComponent {
  html = markup;
}
