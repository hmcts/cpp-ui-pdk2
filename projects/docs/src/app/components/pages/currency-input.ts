import { Component } from '@angular/core';
import { HeaderComponent } from '../../common/example-header/example-header';
import {
  PdkTypographyDirective,
  PdkFormFieldComponent,
  PdkCurrencyInputComponent as CurrencyInputComponent_1
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
  label="Expenditure"
  hintText="Your expenditure is your total outgoings for the financial year."
>
  <pdk-currency-input
    ngModel
    name="currency"
  >
  </pdk-currency-input>
</pdk-form-field>
`;

@Component({
  selector: 'docs-currency-input',
  template: `
    <docs-example-header origin="CPP">
      <span pdk-typography="caption-xlarge">Components</span>
      <h1 pdk-typography="heading-xlarge">Currency input</h1>
    </docs-example-header>
    <p pdk-typography="body">
      Use this component to present a text input as one that requires and validates a value in pound
      sterling.
    </p>

    <!-- Example -->

    <h2 pdk-typography="heading-large">Example</h2>

    <docs-example [html]="html">
      <form>
        <pdk-form-field
          label="Expenditure"
          hintText="Your expenditure is your total outgoings for the financial year."
        >
          <pdk-currency-input ngModel name="currency" inputWidth="2"> </pdk-currency-input>
        </pdk-form-field>
      </form>
    </docs-example>

    <!-- Api -->

    <h2 pdk-typography="heading-large">Api</h2>
    <p pdk-typography="body">
      This component functions as a <code docs-code>ControlValueAccessor</code> and a
      <code docs-code>FormFieldControl</code>. To use this component, add
      <code docs-code>PdkCurrencyInputComponent</code> to your list of ngModule/ standalone
      component imports.
    </p>

    <h3 pdk-typography="heading-medium">pdk-currency-input</h3>
    <docs-props-list>
      <docs-props-list-item name="inputWidth" type="number">
        The width in responsive units to attribute to the input.
      </docs-props-list-item>
      <docs-props-list-item name="min" type="number">
        A minimum value against which to validate the entered currency.
      </docs-props-list-item>
      <docs-props-list-item name="max" type="number">
        A maximum value against which to validate the entered currency.
      </docs-props-list-item>
    </docs-props-list>
  `,
  imports: [
    HeaderComponent,
    PdkTypographyDirective,
    ExampleComponent,
    FormsModule,
    PdkFormFieldComponent,
    CurrencyInputComponent_1,
    CodeComponent,
    PropsListComponent,
    PropsListItemComponent
  ]
})
export class CurrencyInputComponent {
  html = markup;
}
