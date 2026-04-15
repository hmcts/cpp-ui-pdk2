import { Component } from '@angular/core';
import { HeaderComponent } from '../../common/example-header/example-header';
import {
  PdkTypographyDirective,
  PdkLinkDirective,
  PdkBreadcrumbListComponent,
  PdkBreadcrumbListItemDirective,
  PdkBreadcrumbDirective
} from '@cpp/pdk';
import { ExampleComponent } from '../../common/example/example.component';
import {
  CodeComponent,
  PropsListComponent,
  PropsListItemComponent
} from '../../common/props-list/props-list';

const markup = `
<nav aria-label="breadcrumb region">
<ol pdk-breadcrumb-list>
  <li pdk-breadcrumb-list-item>
    <a href="#" pdk-breadcrumb>Home</a>
  </li>
  <li pdk-breadcrumb-list-item>
    <a href="#" pdk-breadcrumb>Passports, travel and living abroad</a>
  </li>
  <li pdk-breadcrumb-list-item>
    <span pdk-breadcrumb="active">Travel abroad</span>
  </li>
</ol>
<nav>
`;

@Component({
  selector: 'docs-breadcrumbs',
  template: `
    <docs-example-header origin="GOV.UK">
      <span pdk-typography="caption-xlarge">Components</span>
      <h1 pdk-typography="heading-xlarge">Breadcrumbs</h1>
    </docs-example-header>
    <p pdk-typography="body">
      The breadcrumbs component helps users to understand where they are within a website’s
      structure and move between levels. The usage guidelines and related research for this
      component can be found
      <a pdk-link href="https://design-system.service.gov.uk/components/breadcrumbs/">here</a>.
    </p>

    <!-- Example -->

    <h2 pdk-typography="heading-large">Example</h2>

    <docs-example [html]="html">
      <nav aria-label="bread-crumb region">
        <ol pdk-breadcrumb-list>
          <li pdk-breadcrumb-list-item><a href="javascript:void(0)" pdk-breadcrumb>Home</a></li>
          <li pdk-breadcrumb-list-item>
            <a href="javascript:void(0)" pdk-breadcrumb>Passports, travel and living abroad</a>
          </li>
          <li pdk-breadcrumb-list-item><span pdk-breadcrumb="active">Travel abroad</span></li>
        </ol>
      </nav>
    </docs-example>

    <!-- Api -->

    <h2 pdk-typography="heading-large">Api</h2>
    <p pdk-typography="body">
      To use this component, add <code docs-code>PdkBreadcrumbs</code> to your list of
      ngModule/standalone component imports.
    </p>

    <h3 pdk-typography="heading-medium">[pdk-breadcrumb-list]</h3>
    <docs-props-list>
      <docs-props-list-item name="ng-content" type="node">
        The content for the component.
      </docs-props-list-item>
    </docs-props-list>

    <h3 pdk-typography="heading-medium">[pdk-breadcrumb-list-item]</h3>
    <docs-props-list>
      <docs-props-list-item name="ng-content" type="node">
        The content for the component.
      </docs-props-list-item>
    </docs-props-list>

    <h3 pdk-typography="heading-medium">[pdk-breadcrumb]</h3>
    <docs-props-list>
      <docs-props-list-item name="ng-content" type="node">
        The content for the component.
      </docs-props-list-item>
      <docs-props-list-item
        name="pdk-breadcrumb"
        type="enum: active | inactive"
        defaultValue="inactive"
      >
        The activated state of a breadcrumb. Use <code docs-code>active</code> when the breadcrumb
        belongs to the current page.
      </docs-props-list-item>
    </docs-props-list>
  `,
  imports: [
    HeaderComponent,
    PdkTypographyDirective,
    PdkLinkDirective,
    ExampleComponent,
    PdkBreadcrumbListComponent,
    PdkBreadcrumbListItemDirective,
    PdkBreadcrumbDirective,
    CodeComponent,
    PropsListComponent,
    PropsListItemComponent
  ]
})
export class BreadcrumbsComponent {
  html = markup;
}
