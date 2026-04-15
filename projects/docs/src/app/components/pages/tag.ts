import { Component } from '@angular/core';
import {
  PdkTagColor,
  PdkTypographyDirective,
  PdkLinkDirective,
  PdkTableComponent,
  PdkMarginDirective,
  PdkTableHeadDirective,
  PdkTableRowDirective,
  PdkTableHeaderDirective,
  PdkTableBodyDirective,
  PdkTableCellDirective,
  PdkTagComponent as TagComponent_1
} from '@cpp/pdk';
import { HeaderComponent } from '../../common/example-header/example-header';
import { ExampleComponent } from '../../common/example/example.component';

import {
  CodeComponent,
  PropsListComponent,
  PropsListItemComponent
} from '../../common/props-list/props-list';

const markup = `
<table pdk-table pdk-margin="0">
  <thead pdk-table-head>
    <tr pdk-table-row>
      <th pdk-table-header>Colour</th>
      <th pdk-table-header>Tag</th>
    </tr>
  </thead>
  <tbody pdk-table-body>
  @for (tag of tags; let index = $index; track index) {
    <tr pdk-table-row>
      <td pdk-table-cell>{{ tag[0] }}</td>
      <td pdk-table-cell>
        <pdk-tag [color]="tag[0]">{{ tag[1] }}</pdk-tag>
      </td>
    </tr>
}
  </tbody>
</table>
`;

@Component({
  selector: 'docs-tag',
  template: `
    <docs-example-header origin="GOV.UK">
      <span pdk-typography="caption-xlarge">Components</span>
      <h1 pdk-typography="heading-xlarge">Tag</h1>
    </docs-example-header>
    <p pdk-typography="body">
      Use the tag component when it’s possible for something to have more than one status and it’s
      useful for the user to know about that status. For example, you can use a tag to show whether
      an item in a
      <a pdk-link href="https://design-system.service.gov.uk/patterns/task-list-pages/"
        >task list</a
      >
      has been ‘completed’. The usage guidelines and related research for this component can be
      found <a pdk-link href="https://design-system.service.gov.uk/components/tag">here</a>.
    </p>

    <!-- Example -->

    <h2 pdk-typography="heading-large">Example</h2>

    <docs-example [html]="html">
      <table pdk-table pdk-margin="0">
        <thead pdk-table-head>
          <tr pdk-table-row>
            <th pdk-table-header>Colour</th>
            <th pdk-table-header>Tag</th>
          </tr>
        </thead>
        <tbody pdk-table-body>
          @for (tag of tags; let index = $index; track index) {
          <tr pdk-table-row>
            <td pdk-table-cell>{{ tag[0] }}</td>
            <td pdk-table-cell>
              <pdk-tag [color]="tag[0]">{{ tag[1] }}</pdk-tag>
            </td>
          </tr>
          }
        </tbody>
      </table>
    </docs-example>

    <!-- Api -->

    <h2 pdk-typography="heading-large">Api</h2>
    <p pdk-typography="body">
      To use this component, add <code docs-code>PdkTagComponent</code> to your list of ngModule/
      standalone component imports.
    </p>

    <h3 pdk-typography="heading-medium">pdk-tag</h3>
    <docs-props-list>
      <docs-props-list-item name="ng-content" type="node">
        The content for the component.
      </docs-props-list-item>
      <docs-props-list-item name="color" type="enum" defaultValue="default">
        The color from the available options above.
      </docs-props-list-item>
      <docs-props-list-item name="condensed" type="boolean" defaultValue="false">
        When <code docs-code>true</code>, displays the tag in its smaller, more condensed form.
      </docs-props-list-item>
    </docs-props-list>
  `,
  imports: [
    HeaderComponent,
    PdkTypographyDirective,
    PdkLinkDirective,
    ExampleComponent,
    PdkTableComponent,
    PdkMarginDirective,
    PdkTableHeadDirective,
    PdkTableRowDirective,
    PdkTableHeaderDirective,
    PdkTableBodyDirective,
    PdkTableCellDirective,
    TagComponent_1,
    CodeComponent,
    PropsListComponent,
    PropsListItemComponent
  ]
})
export class TagComponent {
  html = markup;
  tags: Array<[PdkTagColor, string]> = [
    ['default', 'Active'],
    ['grey', 'Inactive'],
    ['green', 'New'],
    ['turquoise', 'Active'],
    ['blue', 'Pending'],
    ['purple', 'Received'],
    ['pink', 'Sent'],
    ['red', 'Rejected'],
    ['orange', 'Declined'],
    ['yellow', 'Delayed']
  ];
}
