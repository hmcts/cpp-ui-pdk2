import { Component } from '@angular/core';
import { HeaderComponent } from '../../common/example-header/example-header';
import {
  PdkTypographyDirective,
  PdkDropdownComponent as DropdownComponent_1,
  PdkDropdownItemDirective,
  PdkLinkDirective
} from '@cpp/pdk';
import { ExampleComponent } from '../../common/example/example.component';
import {
  CodeComponent,
  PropsListComponent,
  PropsListItemComponent
} from '../../common/props-list/props-list';

const markup = `
<pdk-dropdown name="Menu">
  <pdk-dropdown-nav-item>
    <a pdk-link href="#">Menu item 1</a>
  </pdk-dropdown-nav-item>
  <pdk-dropdown-nav-item>
    <a pdk-link href="#">Menu item 2</a>
  </pdk-dropdown-nav-item>
</pdk-dropdown>
`;

@Component({
  selector: 'docs-dropdown',
  template: `
    <docs-example-header origin="GOV.UK">
      <span pdk-typography="caption-xlarge">Components</span>
      <h1 pdk-typography="heading-xlarge">Dropdown</h1>
    </docs-example-header>
    <p pdk-typography="body">Use this component to show the sub menu links as dropdown.</p>

    <!-- Example -->

    <h2 pdk-typography="heading-large">Example</h2>

    <docs-example [html]="html">
      <pdk-dropdown name="Menu">
        <pdk-dropdown-nav-item> <a pdk-link href="#">Menu item 1</a> </pdk-dropdown-nav-item>
        <pdk-dropdown-nav-item> <a pdk-link href="#">Menu item 2</a> </pdk-dropdown-nav-item>
        <pdk-dropdown-nav-item> <a pdk-link href="#">Menu item 3</a> </pdk-dropdown-nav-item>
        <pdk-dropdown-nav-item> <a pdk-link href="#">Menu item 4</a> </pdk-dropdown-nav-item>
        <pdk-dropdown-nav-item> <a pdk-link href="#">Menu item 5</a> </pdk-dropdown-nav-item>
      </pdk-dropdown>
    </docs-example>

    <!-- Api -->

    <h2 pdk-typography="heading-large">Api</h2>
    <p pdk-typography="body">
      To use this component, add <code docs-code>PdkDropdown</code> to your list of ngModule /
      standalone component imports.
    </p>

    <h3 pdk-typography="heading-medium">pdk-dropdown</h3>
    <docs-props-list>
      <docs-props-list-item name="name" type="string">
        The main link text of the dropdown menu.
      </docs-props-list-item>
      <docs-props-list-item name="menuAlignment" type="enum: left | right" defaultValue="left">
        The alignment of the dropdown menu.
      </docs-props-list-item>
    </docs-props-list>

    <h3 pdk-typography="heading-medium">pdk-dropdown-nav-item</h3>
    <docs-props-list>
      <docs-props-list-item name="ng-content" type="node">
        The dropdown menu item.
      </docs-props-list-item>
    </docs-props-list>
  `,
  imports: [
    HeaderComponent,
    PdkTypographyDirective,
    ExampleComponent,
    DropdownComponent_1,
    PdkDropdownItemDirective,
    PdkLinkDirective,
    CodeComponent,
    PropsListComponent,
    PropsListItemComponent
  ]
})
export class DropdownComponent {
  open = [0, 2];
  html = markup;
}
