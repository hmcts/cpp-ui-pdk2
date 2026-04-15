import { Component } from '@angular/core';
import { HeaderComponent } from '../../common/example-header/example-header';
import {
  PdkTypographyDirective,
  PdkGridComponent,
  PdkGridDirective,
  PdkRelatedComponent as RelatedComponent_1,
  PdkListDirective,
  PdkLinkDirective
} from '@cpp/pdk';
import { ExampleComponent } from '../../common/example/example.component';
import {
  CodeComponent,
  PropsListComponent,
  PropsListItemComponent
} from '../../common/props-list/props-list';

const markup = `
<pdk-related>
  <p>
    Find further information about this subject:
  </p>
  <ul pdk-list>
    <li><a href="javascript:void(0)" pdk-link>List item link #1</a></li>
    <li><a href="javascript:void(0)" pdk-link>List item link #2</a></li>
  </ul>
</pdk-related>
`;

@Component({
  selector: 'docs-related',
  template: `
    <docs-example-header origin="CPP">
      <span pdk-typography="caption-xlarge">Components</span>
      <h1 pdk-typography="heading-xlarge">Related</h1>
    </docs-example-header>
    <p pdk-typography="body">
      Use this component to logically group related information within a containing column.
    </p>

    <!-- Example -->

    <h2 pdk-typography="heading-large">Example</h2>

    <docs-example [html]="html">
      <pdk-grid container>
        <pdk-grid one-half>
          <pdk-related>
            <p>Find further information about this subject:</p>
            <ul pdk-list>
              <li><a href="javascript:void(0)" pdk-link>List item link #1</a></li>
              <li><a href="javascript:void(0)" pdk-link>List item link #2</a></li>
            </ul>
          </pdk-related>
        </pdk-grid>
      </pdk-grid>
    </docs-example>

    <!-- Api -->

    <h2 pdk-typography="heading-large">Api</h2>
    <p pdk-typography="body">
      To use this component, add <code docs-code>PdkRelatedComponent</code> to your list of
      ngModule/standalone component imports.
    </p>

    <h3 pdk-typography="heading-medium">pdk-related</h3>
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
    PdkGridComponent,
    PdkGridDirective,
    RelatedComponent_1,
    PdkListDirective,
    PdkLinkDirective,
    CodeComponent,
    PropsListComponent,
    PropsListItemComponent
  ]
})
export class RelatedComponent {
  html = markup;
}
