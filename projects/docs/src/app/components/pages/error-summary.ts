import { Component } from '@angular/core';
import { HeaderComponent } from '../../common/example-header/example-header';
import {
  PdkTypographyDirective,
  PdkLinkDirective,
  PdkErrorSummaryComponent as ErrorSummaryComponent_1,
  PdkMarginDirective
} from '@cpp/pdk';
import { ExampleComponent } from '../../common/example/example.component';
import {
  CodeComponent,
  PropsListComponent,
  PropsListItemComponent
} from '../../common/props-list/props-list';

const markup = `
<pdk-error-summary
  [errors]="[
    { id: 'date', message: 'The date your passport was issued must be in the past' },
    { id: 'postcode', message: 'Enter a postcode, like AA1 1AA' }
  ]"
>
</pdk-error-summary>
`;

@Component({
  selector: 'docs-error-summary',
  template: `
    <docs-example-header origin="GOV.UK">
      <span pdk-typography="caption-xlarge">Components</span>
      <h1 pdk-typography="heading-xlarge">Error summary</h1>
    </docs-example-header>
    <p pdk-typography="body">
      Use this component at the top of a page to summarise any errors a user has made. When a user
      makes an error, you must show both an error summary and an error message next to each answer
      that contains an error.
    </p>
    <p pdk-typography="body">
      The usage guidelines and related research for this component can be found
      <a pdk-link href="https://design-system.service.gov.uk/components/error-summary">here</a>.
    </p>

    <!-- Example -->

    <h2 pdk-typography="heading-large">Example</h2>

    <docs-example [html]="html">
      <pdk-error-summary
        [focusOnChange]="false"
        [errors]="errors"
        pdk-margin-bottom="6"
      ></pdk-error-summary>
    </docs-example>

    <!-- Api -->

    <h2 pdk-typography="heading-large">Api</h2>
    <p pdk-typography="body">
      To use this component, add <code docs-code>PdkErrorSummaryComponent</code> to your list of
      ngModule/ standalone component imports.
    </p>

    <h3 pdk-typography="heading-medium">pdk-error-summary</h3>
    <docs-props-list>
      <docs-props-list-item name="errors" type="array" defaultValue="[]">
        A collection of errors to display, where an <code docs-code>id</code> is the id to a target
        element in the DOM, and the <code docs-code>message</code> is a description of the error.
      </docs-props-list-item>
      <docs-props-list-item name="focusOnChange" type="boolean" defaultValue="true">
        When <code docs-code>true</code>, scrolls the page to focus the error-summary whenever
        errors change.
      </docs-props-list-item>
      <docs-props-list-item name="title" type="string" defaultValue="There is a problem">
        The title for the accompanying errors.
      </docs-props-list-item>
    </docs-props-list>
  `,
  imports: [
    HeaderComponent,
    PdkTypographyDirective,
    PdkLinkDirective,
    ExampleComponent,
    ErrorSummaryComponent_1,
    PdkMarginDirective,
    CodeComponent,
    PropsListComponent,
    PropsListItemComponent
  ]
})
export class ErrorSummaryComponent {
  html = markup;
  errors = [
    { id: 'date', message: 'The date your passport was issued must be in the past' },
    { id: 'postcode', message: 'Enter a postcode, like AA1 1AA' }
  ];
}
