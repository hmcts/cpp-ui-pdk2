import { Component } from '@angular/core';
import { HeaderComponent } from '../../common/example-header/example-header';
import { PdkTypographyDirective, PdkSearchbarComponent as SearchbarComponent_1 } from '@cpp/pdk';
import { ExampleComponent } from '../../common/example/example.component';
import { FormsModule } from '@angular/forms';
import {
  CodeComponent,
  PropsListComponent,
  PropsListItemComponent
} from '../../common/props-list/props-list';

const markup = `
<form novalidate>
  <pdk-searchbar
    name="test"
    ngModel
    id="search-id"
    ariaLabel="Search for users"
    placeholder="Search"
  >
  </pdk-searchbar>
</form>
`;

@Component({
  selector: 'docs-searchbar',
  template: `
    <docs-example-header origin="CPP">
      <span pdk-typography="caption-xlarge">Components</span>
      <h1 pdk-typography="heading-xlarge">Search bar</h1>
    </docs-example-header>
    <p pdk-typography="body">Use this component as the primary search for a page or section.</p>

    <!-- Example -->

    <h2 pdk-typography="heading-large">Example</h2>

    <docs-example [html]="html">
      <form novalidate>
        <pdk-searchbar
          name="test"
          ngModel
          id="search-id"
          ariaLabel="Search for users"
          placeholder="Search"
        >
        </pdk-searchbar>
      </form>
    </docs-example>

    <!-- Api -->

    <h2 pdk-typography="heading-large">Api</h2>
    <p pdk-typography="body">
      This component functions as a <code docs-code>ControlValueAccessor</code> and a
      <code docs-code>FormFieldControl</code>.
    </p>
    <p pdk-typography="body">
      To use this component, add <code docs-code>PdkSearchBar</code> to your list of ngModule/
      standalone component imports.
    </p>

    <h3 pdk-typography="heading-medium">pdk-searchbar</h3>
    <docs-props-list>
      <docs-props-list-item name="id" type="string"> A unique element id. </docs-props-list-item>
      <docs-props-list-item name="ariaDescribedBy" type="string">
        An id for an element providing a full description of the search.
      </docs-props-list-item>
      <docs-props-list-item name="ariaLabel" type="string">
        Essential information of the intent of the search.
      </docs-props-list-item>
      <docs-props-list-item name="ariaLabelledBy" type="string">
        An id for an element containing the essential information about this search.
      </docs-props-list-item>
      <docs-props-list-item name="borderless" type="boolean" defaultValue="false">
        Removes the border from the searchbar. This is used when rendering on non-white backgrounds.
      </docs-props-list-item>
      <docs-props-list-item name="invert" type="boolean" defaultValue="false">
        If <code docs-code>true</code> then inverts the component theme.
      </docs-props-list-item>
      <docs-props-list-item name="placeholder" type="string">
        Placeholder text for the search input.
      </docs-props-list-item>
      <docs-props-list-item name="required" type="boolean" defaultValue="false">
        If <code docs-code>true</code> then adds the required validator.
      </docs-props-list-item>
    </docs-props-list>
  `,
  imports: [
    HeaderComponent,
    PdkTypographyDirective,
    ExampleComponent,
    FormsModule,
    SearchbarComponent_1,
    CodeComponent,
    PropsListComponent,
    PropsListItemComponent
  ]
})
export class SearchbarComponent {
  html = markup;
}
