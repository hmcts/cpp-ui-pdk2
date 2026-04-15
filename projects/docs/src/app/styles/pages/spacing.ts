import { Component } from '@angular/core';
import { PdkTable, PdkTypographyDirective } from '@cpp/pdk';

import {
  CodeComponent,
  PropsListComponent,
  PropsListItemComponent
} from '../../common/props-list/props-list';

@Component({
  selector: 'docs-colour',
  template: `
    <span pdk-typography="caption-xlarge">Styles</span>
    <h1 pdk-typography="heading-xlarge">Spacing</h1>
    <h2 pdk-typography="heading-large">The responsive spacing scale</h2>
    <p pdk-typography="body-medium">
      The Design System uses a responsive spacing scale which adapts based on screen size. For
      example, if you apply spacing unit 9 to a margin, it will be 60px on large screens and 40px on
      small screens.
    </p>
    <table pdk-table>
      <thead pdk-table-head>
        <tr pdk-table-row>
          <th pdk-table-header>Spacing unit</th>
          <th pdk-table-header>Large screens</th>
          <th pdk-table-header>Small screens</th>
        </tr>
      </thead>
      <tbody pdk-table-body>
        @for (item of spacing; track item.units) {
        <tr pdk-table-row>
          <th pdk-table-header="row">{{ item.units }}</th>
          <td pdk-table-cell>{{ item.large }}px</td>
          <td pdk-table-cell>{{ item.small }}px</td>
        </tr>
        }
      </tbody>
    </table>

    <!-- Example -->

    <h2 pdk-typography="heading-large">Api</h2>
    <p>
      Occasionally, you might need to make minor adjustments to the default spacing on a component
      or html elements. You can use the responsive spacing override directives for this.
    </p>
    <p>
      To include these directives, add <code docs-code>PdkCore</code> to your list of ngModule
      imports.
    </p>

    <h3 pdk-typography="heading-medium">Margin</h3>
    <docs-props-list hideDefaultValue [propWidth]="200">
      <docs-props-list-item name="pdk-margin" type="number">
        The margin in units.
      </docs-props-list-item>
      <docs-props-list-item name="pdk-margin-top" type="number">
        The top margin in units.
      </docs-props-list-item>
      <docs-props-list-item name="pdk-margin-right" type="number">
        The right margin to apply in units.
      </docs-props-list-item>
      <docs-props-list-item name="pdk-margin-bottom" type="number">
        The bottom margin to apply in units.
      </docs-props-list-item>
      <docs-props-list-item name="pdk-margin-left" type="number">
        The left margin to apply in units.
      </docs-props-list-item>
      <docs-props-list-item name="pdk-margin-horizontal" type="number">
        The left and right margin to apply in units.
      </docs-props-list-item>
      <docs-props-list-item name="pdk-margin-vertical" type="number">
        The top and bottom margin to apply in units.
      </docs-props-list-item>
    </docs-props-list>

    <h3 pdk-typography="heading-medium">Padding</h3>
    <docs-props-list hideDefaultValue [propWidth]="200">
      <docs-props-list-item name="pdk-padding" type="number">
        The padding in units.
      </docs-props-list-item>
      <docs-props-list-item name="pdk-padding-top" type="number">
        The top padding in units.
      </docs-props-list-item>
      <docs-props-list-item name="pdk-padding-right" type="number">
        The right padding to apply in units.
      </docs-props-list-item>
      <docs-props-list-item name="pdk-padding-bottom" type="number">
        The bottom padding to apply in units.
      </docs-props-list-item>
      <docs-props-list-item name="pdk-padding-left" type="number">
        The left padding to apply in units.
      </docs-props-list-item>
      <docs-props-list-item name="pdk-padding-horizontal" type="number">
        The left and right padding to apply in units.
      </docs-props-list-item>
      <docs-props-list-item name="pdk-padding-vertical" type="number">
        The top and bottom padding to apply in units.
      </docs-props-list-item>
    </docs-props-list>
  `,
  imports: [
    PdkTypographyDirective,
    PdkTable,
    CodeComponent,
    PropsListComponent,
    PropsListItemComponent
  ]
})
export class SpacingComponent {
  spacing = [
    { units: 9, large: 60, small: 40 },
    { units: 8, large: 50, small: 30 },
    { units: 7, large: 40, small: 25 },
    { units: 6, large: 30, small: 20 },
    { units: 5, large: 25, small: 15 },
    { units: 4, large: 20, small: 15 },
    { units: 3, large: 15, small: 15 },
    { units: 2, large: 10, small: 10 },
    { units: 1, large: 5, small: 5 }
  ];
}
