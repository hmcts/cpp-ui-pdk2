import { Component } from '@angular/core';
import { HeaderComponent } from '../../common/example-header/example-header';
import {
  PdkTypographyDirective,
  PdkLinkDirective,
  PdkSummaryListComponent as SummaryListComponent_1,
  PdkSummaryListItemDirective,
  PdkSummaryListKeyDirective,
  PdkSummaryListValueDirective,
  PdkSummaryListActionsDirective,
  PdkVisuallyHiddenDirective
} from '@cpp/pdk';
import { ExampleComponent } from '../../common/example/example.component';
import { CodeComponent } from '../../common/props-list/props-list';

const markup = `
<dl pdk-summary-list>
  <div pdk-summary-list-item>
    <dt pdk-summary-list-key>Name</dt>
    <dd pdk-summary-list-value>Sarah Phillips</dd>
    <dd pdk-summary-list-action>
      <a pdk-link href="javascript:void(0)">
        Change<span pdk-visually-hidden> name</span>
      </a>
    </dd>
  </div>
  <div pdk-summary-list-item>
    <dt pdk-summary-list-key>Date of birth</dt>
    <dd pdk-summary-list-value>5 January 1978</dd>
    <dd pdk-summary-list-action>
      <a pdk-link href="javascript:void(0)">
        Change<span pdk-visually-hidden> date of birth</span>
      </a>
    </dd>
  </div>
  <div pdk-summary-list-item>
    <dt pdk-summary-list-key>Contact information</dt>
    <dd pdk-summary-list-value>72 Guild Street<br />London<br />SE23 6FH</dd>
    <dd pdk-summary-list-action>
      <a pdk-link href="javascript:void(0)">
        Change<span pdk-visually-hidden> contact information</span>
      </a>
    </dd>
  </div>
</dl>
`;

@Component({
  selector: 'docs-summary-list',
  template: `
    <docs-example-header origin="GOV.UK">
      <span pdk-typography="caption-xlarge">Components</span>
      <h1 pdk-typography="heading-xlarge">Summary list</h1>
    </docs-example-header>
    <p pdk-typography="body">
      Use the summary list to summarise information, for example, a user’s responses at the end of a
      form. The usage guidelines and related research for this component can be found
      <a pdk-link href="https://design-system.service.gov.uk/components/summary-list/">here</a>.
    </p>

    <!-- Example -->

    <h2 pdk-typography="heading-large">Example</h2>

    <docs-example [html]="html">
      <dl pdk-summary-list>
        <div pdk-summary-list-item>
          <dt pdk-summary-list-key>Name</dt>
          <dd pdk-summary-list-value>Sarah Phillips</dd>
          <dd pdk-summary-list-action>
            <a pdk-link href="javascript:void(0)">Change<span pdk-visually-hidden> name</span></a>
          </dd>
        </div>
        <div pdk-summary-list-item>
          <dt pdk-summary-list-key>Date of birth</dt>
          <dd pdk-summary-list-value>5 January 1978</dd>
          <dd pdk-summary-list-action>
            <a pdk-link href="javascript:void(0)"
              >Change<span pdk-visually-hidden> date of birth</span></a
            >
          </dd>
        </div>
        <div pdk-summary-list-item>
          <dt pdk-summary-list-key>Contact information</dt>
          <dd pdk-summary-list-value>72 Guild Street<br />London<br />SE23 6FH</dd>
          <dd pdk-summary-list-action>
            <a pdk-link href="javascript:void(0)"
              >Change<span pdk-visually-hidden> contact information</span></a
            >
          </dd>
        </div>
      </dl>
    </docs-example>

    <!-- Api -->

    <p pdk-typography="body">
      To use this component, add
      <code docs-code>PdkSummaryList</code> to your list of ngModule/ standalone component imports.
    </p>
  `,
  imports: [
    HeaderComponent,
    PdkTypographyDirective,
    PdkLinkDirective,
    ExampleComponent,
    SummaryListComponent_1,
    PdkSummaryListItemDirective,
    PdkSummaryListKeyDirective,
    PdkSummaryListValueDirective,
    PdkSummaryListActionsDirective,
    PdkVisuallyHiddenDirective,
    CodeComponent
  ]
})
export class SummaryListComponent {
  html = markup;
}
