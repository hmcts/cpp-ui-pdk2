import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../common/example-header/example-header';
import {
  PdkTypographyDirective,
  PdkLinkDirective,
  PdkTableComponent as TableComponent_1,
  PdkTableCaptionDirective,
  PdkTableHeadDirective,
  PdkTableRowDirective,
  PdkTableHeaderDirective,
  PdkTableBodyDirective,
  PdkTableCellDirective,
  PdkSortableHeaderComponent,
  SortOrder
} from '@cpp/pdk';
import { ExampleComponent } from '../../common/example/example.component';
import {
  CodeComponent,
  PropsListComponent,
  PropsListItemComponent
} from '../../common/props-list/props-list';

const markup = `
<table pdk-table>
  <caption pdk-table-caption>Dates and amounts</caption>
  <thead pdk-table-head>
    <tr pdk-table-row>
      <th pdk-table-header">Date</th>
      <th pdk-table-header">Amount</th>
    </tr>
  </thead>
  <tbody pdk-table-body>
    <tr pdk-table-row>
      <th pdk-table-header="row">First 6 weeks</th>
      <td pdk-table-cell>£109.80 per week</td>
    </tr>
    <tr pdk-table-row>
      <th pdk-table-header="row">Next 33 weeks</th>
      <td pdk-table-cell>£109.80 per week</td>
    </tr>
    <tr pdk-table-row>
      <th pdk-table-header="row">Total estimated pay</th>
      <td pdk-table-cell>£4,282.20</td>
    </tr>
  </tbody>
</table>
`;

const markupWithSort = `
<table pdk-table>
<caption pdk-table-caption>
  Dates and amounts
</caption>
<thead pdk-table-head>
  <tr pdk-table-row>
    <th 
      pdk-table-header 
      pdk-sortable-header 
      [direction]="getColumnDirection('date')"
      (directionChange)="handleColumnDirectionChange($event, 'date')"
      >
      Date
    </th>
    <th 
      pdk-table-header
      pdk-sortable-header
      [direction]="getColumnDirection('amounts')"
      (directionChange)="handleColumnDirectionChange($event, 'amounts')"
      >
      Amount
    </th>
    <th
      pdk-table-header
      pdk-sortable-header
      [direction]="getColumnDirection('dueDate')"
      (directionChange)="handleColumnDirectionChange($event, 'dueDate', 'date')"
      >
      Due Date
    </th>
  </tr>
</thead>
<tbody pdk-table-body>
@for (data of dataSource; let index = $index; track index) {
  <tr pdk-table-row>
    <th pdk-table-header="row">{{ data.date }}</th>
    <td pdk-table-cell>{{ data.amounts }}</td>
    <td pdk-table-cell>{{ data.dueDate }}</td>
  </tr>
}

</tbody>
</table>
`;

const code = `
interface ExampleDataSource {
  date: string;
  amounts: string;
  dueDate: string;
}

class ExampleSortTableComponent {
  dataSource = [
    {
      date: 'First 6 weeks',
      amounts: '£109.80 per week',
      dueDate: '20 January 2022'
    },
    {
      date: 'Next 33 weeks',
      amounts: '£109.80 per week',
      dueDate: '20 August 2021'
    },
    {
      date: 'Total estimated pay',
      amounts: '£4,282.20',
      dueDate: '20 February 2022'
    }
  ];
  sortedByColumnName: keyof ExampleDataSource = 'dueDate';
  sortDirection = 'asc';
  sortOrder: number

  handleColumnDirectionChange(direction: 'asc' | 'desc', column:  keyof ExampleDataSource, type?: string) {
    this.sortedByColumnName = column;
    this.sortDirection = direction;
    this.exampleDataSource = this.exampleDataSource.slice().sort(this.comparer(type));
  }

  getColumnDirection(column:  keyof ExampleDataSource) {
    if (column !== this.sortedByColumnName) {
      return ''
    }
    return this.sortDirection;
  }

  private comparer = (type:'string' | 'date' = 'string') => {
    this.sortOrder = 0;
    this.sortOrder = this.sortDirection === 'desc' ? -1 
                    : this.sortDirection === 'asc' ? 1 : 0

    return (item1: ExampleDataSource, item2: ExampleDataSource) => {
      const value1 = item1[this.sortedByColumnName];
      const value2 = item2[this.sortedByColumnName];

      if (type === 'date') {
        const date1 = new Date(value1);
        const date2 = new Date(value2);
        return (date1.getTime() - date2.getTime()) * this.sortOrder;
      }

      if (type === 'string') {
        const stringVal1 = value1.toUpperCase();
        const stringVal2 = value2.toUpperCase();
        return stringVal1.localeCompare(stringVal2) * this.sortOrder;
      }

      return 0;
    };
  };
`;

export interface ExampleDataSource {
  date: string;
  amounts: string;
  dueDate: string;
}

const exampleDataSource: ExampleDataSource[] = [
  {
    date: 'First 6 weeks',
    amounts: '£109.80 per week',
    dueDate: '20 January 2022'
  },
  {
    date: 'Next 33 weeks',
    amounts: '£109.80 per week',
    dueDate: '20 August 2021'
  },
  {
    date: 'Total estimated pay',
    amounts: '£4,282.20',
    dueDate: '20 February 2022'
  }
];

@Component({
  selector: 'docs-table',
  template: `
    <docs-example-header origin="GOV.UK | HMCTS">
      <span pdk-typography="caption-xlarge">Components</span>
      <h1 pdk-typography="heading-xlarge">Table</h1>
    </docs-example-header>
    <p pdk-typography="body">
      Use the table component to make information easier to compare and scan for users. The usage
      guidelines and related research for this component can be found
      <a pdk-link href="https://design-system.service.gov.uk/components/table">here</a>.
    </p>

    <!-- Example -->

    <h2 pdk-typography="heading-large">Example</h2>

    <docs-example [html]="html">
      <table pdk-table>
        <caption pdk-table-caption>
          Dates and amounts
        </caption>
        <thead pdk-table-head>
          <tr pdk-table-row>
            <th pdk-table-header>Date</th>
            <th pdk-table-header>Amount</th>
          </tr>
        </thead>
        <tbody pdk-table-body>
          <tr pdk-table-row>
            <th pdk-table-header="row">First 6 weeks</th>
            <td pdk-table-cell>£109.80 per week</td>
          </tr>
          <tr pdk-table-row>
            <th pdk-table-header="row">Next 33 weeks</th>
            <td pdk-table-cell>£109.80 per week</td>
          </tr>
          <tr pdk-table-row>
            <th pdk-table-header="row">Total estimated pay</th>
            <td pdk-table-cell>£4,282.20</td>
          </tr>
        </tbody>
      </table>
    </docs-example>

    <!--Sorting-->
    <h2 pdk-typography="heading-large">Sorting</h2>
    <p>
      Use the <code docs-code>PdkSortableHeaderComponent</code> to let users sort table cells in
      ascending or descending order. The usage guidelines and related research for this component
      can be found
      <a pdk-link href="https://hmcts-design-system.herokuapp.com/components/sortable-table">here</a
      >.
    </p>

    <!-- Example -->

    <h2 pdk-typography="heading-large">Example</h2>

    <docs-example [html]="sortHtml" [typescript]="typescript">
      <table pdk-table>
        <caption pdk-table-caption>
          Dates and amounts
        </caption>
        <thead pdk-table-head>
          <tr pdk-table-row>
            <th
              pdk-table-header
              pdk-sortable-header
              [direction]="getColumnDirection('date')"
              (directionChange)="handleColumnDirectionChange($event, 'date')"
            >
              Date
            </th>
            <th
              pdk-table-header
              pdk-sortable-header
              [direction]="getColumnDirection('amounts')"
              (directionChange)="handleColumnDirectionChange($event, 'amounts')"
            >
              Amount
            </th>
            <th
              pdk-table-header
              pdk-sortable-header
              [direction]="getColumnDirection('dueDate')"
              (directionChange)="handleColumnDirectionChange($event, 'dueDate', 'date')"
            >
              Due Date
            </th>
          </tr>
        </thead>
        <tbody pdk-table-body>
          @for (data of exampleDataSource;let index = $index; track index) {
          <tr pdk-table-row>
            <th pdk-table-header="row">{{ data.date }}</th>
            <td pdk-table-cell>{{ data.amounts }}</td>
            <td pdk-table-cell>{{ data.dueDate }}</td>
          </tr>
          }
        </tbody>
      </table>
    </docs-example>

    <!-- Api -->

    <h2 pdk-typography="heading-large">Api</h2>
    <p>
      To use these components, add <code docs-code>PdkTable</code> to your list of ngModule/
      standalone component imports.
    </p>

    <h3 pdk-typography="heading-medium">table[pdk-table]</h3>
    <docs-props-list>
      <docs-props-list-item name="ng-content" type="node">
        The content for the table.
      </docs-props-list-item>
    </docs-props-list>

    <h3 pdk-typography="heading-medium">thead[pdk-table-head]</h3>
    <docs-props-list>
      <docs-props-list-item name="ng-content" type="node">
        The header content for the table.
      </docs-props-list-item>
    </docs-props-list>

    <h3 pdk-typography="heading-medium">tr[pdk-table-row]</h3>
    <docs-props-list>
      <docs-props-list-item name="ng-content" type="node"> The row content. </docs-props-list-item>
    </docs-props-list>

    <h3 pdk-typography="heading-medium">th[pdk-table-header]</h3>
    <docs-props-list>
      <docs-props-list-item name="ng-content" type="node">
        The content for a table cell.
      </docs-props-list-item>
      <docs-props-list-item name="pdk-table-header" type="col | row" defaultValue="col">
        The scope of a table header cell.
      </docs-props-list-item>
    </docs-props-list>

    <h3 pdk-typography="heading-medium">th[pdk-table-header][pdk-sortable-header]</h3>
    <docs-props-list>
      <docs-props-list-item name="direction" type="SortOrder" defaultValue="none">
        The sort order.
      </docs-props-list-item>
      <docs-props-list-item name="directionChange" type="expression">
        An expression executed when the direction changes.
      </docs-props-list-item>
      <docs-props-list-item name="ng-content" type="node">
        The content for a table cell.
      </docs-props-list-item>
    </docs-props-list>

    <h3 pdk-typography="heading-medium">tbody[pdk-table-body]</h3>
    <docs-props-list>
      <docs-props-list-item name="ng-content" type="node">
        The body content for the table.
      </docs-props-list-item>
    </docs-props-list>

    <h3 pdk-typography="heading-medium">td[pdk-table-cell]</h3>
    <docs-props-list>
      <docs-props-list-item name="ng-content" type="node">
        The content for a table cell.
      </docs-props-list-item>
    </docs-props-list>
  `,
  imports: [
    HeaderComponent,
    PdkTypographyDirective,
    PdkLinkDirective,
    ExampleComponent,
    TableComponent_1,
    PdkTableCaptionDirective,
    PdkTableHeadDirective,
    PdkTableRowDirective,
    PdkTableHeaderDirective,
    PdkTableBodyDirective,
    PdkTableCellDirective,
    CodeComponent,
    PdkSortableHeaderComponent,
    PropsListComponent,
    PropsListItemComponent
  ]
})
export class TableComponent implements OnInit {
  exampleDataSource = exampleDataSource;
  html = markup;
  sortHtml = markupWithSort;
  typescript = code;
  sortedByColumnName: keyof ExampleDataSource = 'amounts';
  sortDirection = 'desc';
  sortOrder: number;

  ngOnInit() {
    if (this.sortDirection !== 'none') {
      this.exampleDataSource = this.exampleDataSource.slice().sort(this.comparer());
    }
  }

  handleColumnDirectionChange(
    direction: SortOrder,
    column: keyof ExampleDataSource,
    type?: string
  ) {
    this.sortedByColumnName = column;
    this.sortDirection = direction;
    this.exampleDataSource = this.exampleDataSource.slice().sort(this.comparer(type));
  }

  getColumnDirection(column: keyof ExampleDataSource) {
    if (column !== this.sortedByColumnName) {
      return 'none';
    }
    return this.sortDirection;
  }

  private comparer = (type = 'string') => {
    this.sortOrder = 0;
    this.sortOrder = this.sortDirection === 'desc' ? -1 : this.sortDirection === 'asc' ? 1 : 0;

    return (item1: ExampleDataSource, item2: ExampleDataSource) => {
      const value1 = item1[this.sortedByColumnName];
      const value2 = item2[this.sortedByColumnName];

      if (type === 'date') {
        const date1 = new Date(value1);
        const date2 = new Date(value2);
        return (date1.getTime() - date2.getTime()) * this.sortOrder;
      }

      if (type === 'string' || (typeof value1 === 'string' && value2 === 'string')) {
        const stringVal1 = value1.toUpperCase();
        const stringVal2 = value2.toUpperCase();
        return stringVal1.localeCompare(stringVal2) * this.sortOrder;
      }

      return 0;
    };
  };
}
