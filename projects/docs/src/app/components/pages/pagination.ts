import { Component } from '@angular/core';
import { HeaderComponent } from '../../common/example-header/example-header';
import {
  PdkTypographyDirective,
  PdkLinkDirective,
  PdkPaginationComponent as PaginationComponent_1
} from '@cpp/pdk';
import { ExampleComponent } from '../../common/example/example.component';
import {
  CodeComponent,
  PropsListComponent,
  PropsListItemComponent
} from '../../common/props-list/props-list';

const markup = `
<pdk-pagination
  [currentPage]="currentPage"
  [pageSize]="10"
  [totalResults]="70"
  (pageChange)="currentPage = $event"
>
</pdk-pagination>
`;

@Component({
  selector: 'docs-pagination',
  template: `
    <docs-example-header origin="GOV.UK">
      <span pdk-typography="caption-xlarge">Components</span>
      <h1 pdk-typography="heading-xlarge">Pagination</h1>
    </docs-example-header>
    <p pdk-typography="body">
      Use this component to display pagination links for a collection of results. usage guidelines
      and related research for this component can be found
      <a pdk-link href="https://design-system.service.gov.uk/components/pagination/">here</a>.
    </p>

    <!-- Example -->

    <h2 pdk-typography="heading-large">Example</h2>

    <docs-example [html]="html">
      <pdk-pagination
        [currentPage]="currentPage"
        [pageSize]="10"
        [totalResults]="70"
        (pageChange)="currentPage = $event"
      >
      </pdk-pagination>
    </docs-example>

    <!-- Api -->

    <h2 pdk-typography="heading-large">Api</h2>
    <p pdk-typography="body">
      To use this component, add <code docs-code>PdkPaginationComponent</code> to your list of
      ngModule/ standalone component imports.
    </p>

    <h3 pdk-typography="heading-medium">pdk-pagination</h3>
    <docs-props-list>
      <docs-props-list-item name="currentPage" type="number">
        The number of the selected page.
      </docs-props-list-item>
      <docs-props-list-item name="maxPages" type="number">
        The maximum number of pages for which links will be displayed.
      </docs-props-list-item>
      <docs-props-list-item name="pageChange" type="expression">
        An expression invoked with a new <code docs-code>currentPage</code> when a page is clicked.
      </docs-props-list-item>
      <docs-props-list-item name="pageSize" type="number">
        The number of results belonging to an individual page.
      </docs-props-list-item>
      <docs-props-list-item name="totalResults" type="number">
        The total number of results.
      </docs-props-list-item>
    </docs-props-list>
  `,
  imports: [
    HeaderComponent,
    PdkTypographyDirective,
    PdkLinkDirective,
    ExampleComponent,
    PaginationComponent_1,
    CodeComponent,
    PropsListComponent,
    PropsListItemComponent
  ]
})
export class PaginationComponent {
  html = markup;
  currentPage = 1;
}
