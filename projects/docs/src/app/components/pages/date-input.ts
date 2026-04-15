import { Component } from '@angular/core';
import { HeaderComponent } from '../../common/example-header/example-header';
import {
  PdkTypographyDirective,
  PdkLinkDirective,
  PdkFormFieldComponent,
  PdkDateInputComponent as DateInputComponent_1
} from '@cpp/pdk';
import { ExampleComponent } from '../../common/example/example.component';
import { FormsModule } from '@angular/forms';
import {
  CodeComponent,
  PropsListComponent,
  PropsListItemComponent
} from '../../common/props-list/props-list';

const markup = `
<pdk-form-field
  label="Start date"
  hint="date"
>
  <pdk-date-input
    ngModel
    name="test"
    picker
  >
  </pdk-date-input>
</pdk-form-field>
`;

@Component({
  selector: 'docs-date-input',
  template: `
    <docs-example-header origin="GOV.UK">
      <span pdk-typography="caption-xlarge">Components</span>
      <h1 pdk-typography="heading-xlarge">Date input</h1>
    </docs-example-header>
    <p pdk-typography="body">
      Use this component for collecting date values within a form. The usage guidelines and related
      research for layout can be found
      <a pdk-link href="https://design-system.service.gov.uk/patterns/dates/">here</a>.
    </p>

    <!-- Example -->

    <h2 pdk-typography="heading-large">Example</h2>

    <docs-example [html]="html">
      <form>
        <pdk-form-field label="Start date" hint="date">
          <pdk-date-input ngModel name="test" picker></pdk-date-input>
        </pdk-form-field>
      </form>
    </docs-example>

    <!-- Api -->

    <h2 pdk-typography="heading-large">Api</h2>
    <p pdk-typography="body">
      This component functions as a <code docs-code>ControlValueAccessor</code> and a
      <code docs-code>FormFieldControl</code>. To use this component, add
      <code docs-code>PdkDateInput</code> to your list of ngModule/standalone component imports.
    </p>

    <h3 pdk-typography="heading-medium">pdk-date-input</h3>
    <docs-props-list>
      <docs-props-list-item name="minDate" type="string">
        A minimum date that the entered date is validated against.
      </docs-props-list-item>
      <docs-props-list-item name="maxDate" type="string">
        A maximum date that the entered date is validated against.
      </docs-props-list-item>
      <docs-props-list-item name="futureDate" type="boolean" defaultValue="false">
        When <code docs-code>true</code>, validates that the entered date is in the future.
      </docs-props-list-item>
      <docs-props-list-item name="pastDate" type="boolean" defaultValue="false">
        When <code docs-code>true</code>, validates that the entered date is in the past.
      </docs-props-list-item>
      <docs-props-list-item name="weekDate" type="boolean" defaultValue="false">
        When <code docs-code>true</code>, validates that the entered date is a week date.
      </docs-props-list-item>
      <docs-props-list-item name="picker" type="boolean" defaultValue="false">
        When <code docs-code>true</code>, show the date picker.
      </docs-props-list-item>
    </docs-props-list>
  `,
  imports: [
    HeaderComponent,
    PdkTypographyDirective,
    PdkLinkDirective,
    ExampleComponent,
    FormsModule,
    PdkFormFieldComponent,
    DateInputComponent_1,
    CodeComponent,
    PropsListComponent,
    PropsListItemComponent
  ]
})
export class DateInputComponent {
  html = markup;
}
