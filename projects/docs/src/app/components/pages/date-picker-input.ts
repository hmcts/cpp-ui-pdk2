import { Component } from '@angular/core';
import { HeaderComponent } from '../../common/example-header/example-header';
import {
  PdkTypographyDirective,
  PdkFormComponent,
  PdkFormFieldComponent,
  PdkDatePickerInputComponent as DatePickerInputComponent_1
} from '@cpp/pdk';
import { ExampleComponent } from '../../common/example/example.component';
import { FormsModule } from '@angular/forms';
import {
  CodeComponent,
  PropsListComponent,
  PropsListItemComponent
} from '../../common/props-list/props-list';

const markup = `
<pdk-form-field label="Start date">
  <pdk-date-picker-input
    ngModel
    name="startDate"
  >
  </pdk-date-picker-input>
</pdk-form-field>
`;

@Component({
  selector: 'docs-date-picker-input',
  template: `
    <docs-example-header origin="CPP">
      <span pdk-typography="caption-xlarge">Components</span>
      <h1 pdk-typography="heading-xlarge">Date picker input</h1>
    </docs-example-header>

    <p pdk-typography="body">Use this component for collecting fixed date values within a form.</p>

    <!-- Example -->

    <h2 pdk-typography="heading-large">Example</h2>

    <docs-example [html]="html">
      <form pdk-form>
        <pdk-form-field label="Start date">
          <pdk-date-picker-input ngModel name="startDate"></pdk-date-picker-input>
        </pdk-form-field>
      </form>
    </docs-example>

    <!-- Api -->

    <h2 pdk-typography="heading-large">Api</h2>
    <p pdk-typography="body">
      This component functions as a <code docs-code>ControlValueAccessor</code> and a
      <code docs-code>FormFieldControl</code>. To use this component, add
      <code docs-code>PdkDatePicker</code> to your list of ngModule/ standalone component imports.
    </p>

    <h3 pdk-typography="heading-medium">pdk-date-input</h3>
    <docs-props-list propWidth="150">
      <docs-props-list-item name="align" type="enum: left | right" defaultValue="right">
        When <code docs-code>true</code>, validates that the entered date is in the future.
      </docs-props-list-item>
      <docs-props-list-item name="formatDisplayText" type="function">
        A function which, when passed the selected value as a <code docs-code>Date</code>, returns a
        string value to be displayed to the user. Defaults to formatting with
        <code docs-code>dd MMM yyyy</code>.
      </docs-props-list-item>
      <docs-props-list-item name="isDateDisabled" type="function">
        A function which, when passed a <code docs-code>Date</code>, returns a boolean to indicate
        the disabled status in the calendar.
      </docs-props-list-item>
      <docs-props-list-item name="isDateHighlighted" type="function">
        A function which, when passed a <code docs-code>Date</code> and the hovered
        <code docs-code>Date</code> in the calendar, returns a boolean to indicate the highlighted
        status in the calendar. Defaults to matching with the hovered date.
      </docs-props-list-item>
      <docs-props-list-item name="isDateSelected" type="function">
        A function which, when passed a <code docs-code>Date</code> and the selected datestamp,
        returns a boolean to indicate its selected status in the calendar. Defaults to matching with
        the selected value.
      </docs-props-list-item>
      <docs-props-list-item name="futureDate" type="boolean" defaultValue="false">
        When <code docs-code>true</code>, validates that the entered date is in the future.
      </docs-props-list-item>
      <docs-props-list-item name="maxDate" type="string">
        A maximum date that the entered date is validated against.
      </docs-props-list-item>
      <docs-props-list-item name="minDate" type="string">
        A minimum date that the entered date is validated against.
      </docs-props-list-item>
      <docs-props-list-item name="openOnFocus" type="boolean" defaultValue="false">
        When <code docs-code>true</code>, opens the picker when the input is focused.
      </docs-props-list-item>
      <docs-props-list-item name="pastDate" type="boolean" defaultValue="false">
        When <code docs-code>true</code>, validates that the entered date is in the past.
      </docs-props-list-item>
      <docs-props-list-item name="placeholder" type="string">
        Placeholder text for the input.
      </docs-props-list-item>
    </docs-props-list>
  `,
  imports: [
    HeaderComponent,
    PdkTypographyDirective,
    ExampleComponent,
    FormsModule,
    PdkFormComponent,
    PdkFormFieldComponent,
    DatePickerInputComponent_1,
    CodeComponent,
    PropsListComponent,
    PropsListItemComponent
  ]
})
export class DatePickerInputComponent {
  html = markup;
}
