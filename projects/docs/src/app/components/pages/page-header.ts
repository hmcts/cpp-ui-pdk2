import { Component } from '@angular/core';
import { HeaderComponent } from '../../common/example-header/example-header';
import {
  PdkTypographyDirective,
  PdkPageHeaderComponent as PageHeaderComponent_1,
  PdkPageHeaderContentComponent,
  PdkPageHeaderNavDirective,
  PdkPageHeaderNavItemDirective
} from '@cpp/pdk';
import { ExampleComponent } from '../../common/example/example.component';
import {
  CodeComponent,
  PropsListComponent,
  PropsListItemComponent
} from '../../common/props-list/props-list';

const markup = `
<pdk-page-header>
  <pdk-page-header-content marker="SENSITIVE" reference="URN123456A">
    <b>MY PAGE TITLE</b>
  </pdk-page-header-content>
  <pdk-page-header-nav>
    <a href="#" pdk-page-header-nav-item>Navigation link</a>
  </pdk-page-header-nav>
</pdk-page-header>
`;

@Component({
  selector: 'docs-page-header',
  template: `
    <docs-example-header origin="CPP">
      <span pdk-typography="caption-xlarge">Components</span>
      <h1 pdk-typography="heading-xlarge">Page Header</h1>
    </docs-example-header>
    <p pdk-typography="body">Use this component as the headline banner for a page.</p>

    <!-- Example -->

    <h2 pdk-typography="heading-large">Example</h2>

    <docs-example [html]="html">
      <pdk-page-header>
        <pdk-page-header-content marker="SENSITIVE" reference="URN123456A">
          <b>MY PAGE TITLE</b>
        </pdk-page-header-content>
        <pdk-page-header-nav>
          <pdk-page-header-nav-item>
            <a href="javascript:void(0)">Navigation link</a>
          </pdk-page-header-nav-item>
        </pdk-page-header-nav>
      </pdk-page-header>
    </docs-example>

    <!-- Api -->

    <h2 pdk-typography="heading-large">Api</h2>
    <p>
      To use this component, add <code docs-code>PdkPageHeader</code> to your list of ngModule/
      standalone components imports.
    </p>

    <h3 pdk-typography="heading-medium">pdk-page-header</h3>
    <docs-props-list>
      <docs-props-list-item name="ng-content" type="node">
        The content for the component.
      </docs-props-list-item>
    </docs-props-list>

    <h3 pdk-typography="heading-medium">pdk-page-header-content</h3>
    <docs-props-list>
      <docs-props-list-item name="ng-content" type="node">
        The content for the component.
      </docs-props-list-item>
    </docs-props-list>

    <h3 pdk-typography="heading-medium">pdk-page-header-nav</h3>
    <docs-props-list>
      <docs-props-list-item name="ng-content" type="node">
        The content for the component.
      </docs-props-list-item>
    </docs-props-list>

    <h3 pdk-typography="heading-medium">[pdk-page-header-nav-item]</h3>
    <p>Apply this directive to style a child link of <code docs-code>pdk-page-header-nav</code>.</p>
  `,
  imports: [
    HeaderComponent,
    PdkTypographyDirective,
    ExampleComponent,
    PageHeaderComponent_1,
    PdkPageHeaderContentComponent,
    PdkPageHeaderNavDirective,
    PdkPageHeaderNavItemDirective,
    CodeComponent,
    PropsListComponent,
    PropsListItemComponent
  ]
})
export class PageHeaderComponent {
  html = markup;
}
