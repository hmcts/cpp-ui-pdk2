import { Component } from '@angular/core';
import { HeaderComponent } from '../../common/example-header/example-header';
import {
  PdkTypographyDirective,
  PdkLinkDirective,
  PdkTabsetComponent,
  PdkTabComponent,
  PdkTableComponent,
  PdkTableHeadDirective,
  PdkTableRowDirective,
  PdkTableHeaderDirective,
  PdkTableBodyDirective,
  PdkTableCellDirective
} from '@cpp/pdk';
import { ExampleComponent } from '../../common/example/example.component';
import {
  CodeComponent,
  PropsListComponent,
  PropsListItemComponent
} from '../../common/props-list/props-list';

const markup = `
<pdk-tabs [selectedTabIndex]="0">
  <pdk-tab heading="Past day">
    <h2 pdk-typography="heading-large">Past day</h2>
    <table pdk-table>
      <thead pdk-table-head>
        <tr pdk-table-row>
          <th pdk-table-header>Case manager</th>
          <th pdk-table-header>Cases opened</th>
          <th pdk-table-header>Cases closed</th>
        </tr>
      </thead>
      <tbody pdk-table-body>
        <tr pdk-table-row>
          <td pdk-table-cell>David Francis</td>
          <td pdk-table-cell>3</td>
          <td pdk-table-cell>0</td>
        </tr>
        <tr pdk-table-row>
          <td pdk-table-cell>Paul Farmer</td>
          <td pdk-table-cell>1</td>
          <td pdk-table-cell>0</td>
        </tr>
        <tr pdk-table-row>
          <td pdk-table-cell>Rita Patel</td>
          <td pdk-table-cell>2</td>
          <td pdk-table-cell>0</td>
        </tr>
      </tbody>
    </table>
  </pdk-tab>
  <pdk-tab heading="Past week">
    <h2 pdk-typography="heading-large">Past week</h2>
    <table pdk-table>
      <thead pdk-table-head>
        <tr pdk-table-row>
          <th pdk-table-header>Case manager</th>
          <th pdk-table-header>Cases opened</th>
          <th pdk-table-header>Cases closed</th>
        </tr>
      </thead>
      <tbody pdk-table-body>
        <tr pdk-table-row>
          <td pdk-table-cell>David Francis</td>
          <td pdk-table-cell>24</td>
          <td pdk-table-cell>18</td>
        </tr>
        <tr pdk-table-row>
          <td pdk-table-cell>Paul Farmer</td>
          <td pdk-table-cell>16</td>
          <td pdk-table-cell>20</td>
        </tr>
        <tr pdk-table-row>
          <td pdk-table-cell>Rita Patel</td>
          <td pdk-table-cell>24</td>
          <td pdk-table-cell>27</td>
        </tr>
      </tbody>
    </table>
  </pdk-tab>
  <pdk-tab heading="Past month">
    <h2 pdk-typography="heading-large">Past month</h2>
    <table pdk-table>
      <thead pdk-table-head>
        <tr pdk-table-row>
          <th pdk-table-header>Case manager</th>
          <th pdk-table-header>Cases opened</th>
          <th pdk-table-header>Cases closed</th>
        </tr>
      </thead>
      <tbody pdk-table-body>
        <tr pdk-table-row>
          <td pdk-table-cell>David Francis</td>
          <td pdk-table-cell>98</td>
          <td pdk-table-cell>95</td>
        </tr>
        <tr pdk-table-row>
          <td pdk-table-cell>Paul Farmer</td>
          <td pdk-table-cell>122</td>
          <td pdk-table-cell>131</td>
        </tr>
        <tr pdk-table-row>
          <td pdk-table-cell>Rita Patel</td>
          <td pdk-table-cell>126</td>
          <td pdk-table-cell>142</td>
        </tr>
      </tbody>
    </table>
  </pdk-tab>
</pdk-tabs>
`;

@Component({
  selector: 'docs-tabs',
  template: `
    <docs-example-header origin="GOV.UK">
      <span pdk-typography="caption-xlarge">Components</span>
      <h1 pdk-typography="heading-xlarge">Tabs</h1>
    </docs-example-header>
    <p pdk-typography="body">
      The tabs component lets users navigate between related sections of content, displaying one
      section at a time. The usage guidelines and related research for this component can be found
      <a pdk-link href="https://design-system.service.gov.uk/components/tabs">here</a>.
    </p>

    <!-- Example -->

    <h2 pdk-typography="heading-large">Example</h2>

    <docs-example [html]="html">
      <pdk-tabs [selectedTabIndex]="0">
        <pdk-tab heading="Past day">
          <h2 pdk-typography="heading-large">Past day</h2>
          <table pdk-table>
            <thead pdk-table-head>
              <tr pdk-table-row>
                <th pdk-table-header>Case manager</th>
                <th pdk-table-header>Cases opened</th>
                <th pdk-table-header>Cases closed</th>
              </tr>
            </thead>
            <tbody pdk-table-body>
              <tr pdk-table-row>
                <td pdk-table-cell>David Francis</td>
                <td pdk-table-cell>3</td>
                <td pdk-table-cell>0</td>
              </tr>
              <tr pdk-table-row>
                <td pdk-table-cell>Paul Farmer</td>
                <td pdk-table-cell>1</td>
                <td pdk-table-cell>0</td>
              </tr>
              <tr pdk-table-row>
                <td pdk-table-cell>Rita Patel</td>
                <td pdk-table-cell>2</td>
                <td pdk-table-cell>0</td>
              </tr>
            </tbody>
          </table>
        </pdk-tab>
        <pdk-tab heading="Past week">
          <h2 pdk-typography="heading-large">Past week</h2>
          <table pdk-table>
            <thead pdk-table-head>
              <tr pdk-table-row>
                <th pdk-table-header>Case manager</th>
                <th pdk-table-header>Cases opened</th>
                <th pdk-table-header>Cases closed</th>
              </tr>
            </thead>
            <tbody pdk-table-body>
              <tr pdk-table-row>
                <td pdk-table-cell>David Francis</td>
                <td pdk-table-cell>24</td>
                <td pdk-table-cell>18</td>
              </tr>
              <tr pdk-table-row>
                <td pdk-table-cell>Paul Farmer</td>
                <td pdk-table-cell>16</td>
                <td pdk-table-cell>20</td>
              </tr>
              <tr pdk-table-row>
                <td pdk-table-cell>Rita Patel</td>
                <td pdk-table-cell>24</td>
                <td pdk-table-cell>27</td>
              </tr>
            </tbody>
          </table>
        </pdk-tab>
        <pdk-tab heading="Past month">
          <h2 pdk-typography="heading-large">Past month</h2>
          <table pdk-table>
            <thead pdk-table-head>
              <tr pdk-table-row>
                <th pdk-table-header>Case manager</th>
                <th pdk-table-header>Cases opened</th>
                <th pdk-table-header>Cases closed</th>
              </tr>
            </thead>
            <tbody pdk-table-body>
              <tr pdk-table-row>
                <td pdk-table-cell>David Francis</td>
                <td pdk-table-cell>98</td>
                <td pdk-table-cell>95</td>
              </tr>
              <tr pdk-table-row>
                <td pdk-table-cell>Paul Farmer</td>
                <td pdk-table-cell>122</td>
                <td pdk-table-cell>131</td>
              </tr>
              <tr pdk-table-row>
                <td pdk-table-cell>Rita Patel</td>
                <td pdk-table-cell>126</td>
                <td pdk-table-cell>142</td>
              </tr>
            </tbody>
          </table>
        </pdk-tab>
      </pdk-tabs>
    </docs-example>

    <!-- Api -->

    <h2 pdk-typography="heading-large">Api</h2>
    <p pdk-typography="body">
      The tabs component is a <strong>semi-controlled</strong> component, in that the opened tab is
      maintained by the component itself, but this can be overriden through an external input.
    </p>
    <p pdk-typography="body">
      To use this component, add <code docs-code>PdkTabs</code> to your list of ngModule/ standalone
      component imports.
    </p>

    <h3 pdk-typography="heading-medium">pdk-tabs</h3>
    <docs-props-list propWidth="150">
      <docs-props-list-item name="ng-content" type="node">
        The child tabs content of the component.
      </docs-props-list-item>
      <docs-props-list-item name="selectedTabChange" type="expression">
        An event callback triggered when the selected tab changes, where
        <code docs-code>$event</code> is the newly selected <code docs-code>pdk-tab</code>.
      </docs-props-list-item>
      <docs-props-list-item name="selectedTabIndex" type="number" defaultValue="0">
        The index of the <code docs-code>pdk-tab</code> child to open.
      </docs-props-list-item>
      <docs-props-list-item name="vertical" type="boolean" defaultValue="false">
        When <code docs-code>true</code> the child tabs will be rendered vertically.
      </docs-props-list-item>
    </docs-props-list>

    <h3 pdk-typography="heading-medium">pdk-tab</h3>
    <docs-props-list propWidth="150">
      <docs-props-list-item name="ng-content" type="node">
        The content of the tab.
      </docs-props-list-item>
      <docs-props-list-item name="heading" type="string">
        The heading of the tab.
      </docs-props-list-item>
    </docs-props-list>
  `,
  imports: [
    HeaderComponent,
    PdkTypographyDirective,
    PdkLinkDirective,
    ExampleComponent,
    PdkTabsetComponent,
    PdkTabComponent,
    PdkTableComponent,
    PdkTableHeadDirective,
    PdkTableRowDirective,
    PdkTableHeaderDirective,
    PdkTableBodyDirective,
    PdkTableCellDirective,
    CodeComponent,
    PropsListComponent,
    PropsListItemComponent
  ]
})
export class TabsComponent {
  html = markup;
}
