import { Component } from '@angular/core';
import { HeaderComponent } from '../../common/example-header/example-header';
import {
  PdkTypographyDirective,
  PdkFormFieldComponent,
  PdkMarginDirective,
  PdkTextInputDirective,
  PdkInputComponent,
  PdkInputDirective
} from '@cpp/pdk';
import { ExampleComponent } from '../../common/example/example.component';
import { FormsModule } from '@angular/forms';
import {
  CodeComponent,
  PropsListComponent,
  PropsListItemComponent
} from '../../common/props-list/props-list';

const markup = `
<pdk-form-field label="First name">
  <input
    type="text"
    ngModel
    name="first-name"
    pdk-text-input
    pdk-input
  />
</pdk-form-field>
`;

@Component({
  selector: 'docs-text-input',
  template: `
    <docs-example-header origin="GOV.UK">
      <span pdk-typography="caption-xlarge">Components</span>
      <h1 pdk-typography="heading-xlarge">Text input</h1>
    </docs-example-header>
    <p pdk-typography="body">
      The usage guidelines and related research for this component can be found
      <a pdk-link href="https://design-system.service.gov.uk/components/text-input/">here</a>.
    </p>

    <!-- Example -->

    <h2 pdk-typography="heading-large">Example</h2>

    <docs-example [html]="html">
      <form>
        <pdk-form-field label="First name" pdk-margin-bottom="0">
          <input type="text" ngModel name="first-name" pdk-text-input pdk-input />
        </pdk-form-field>
      </form>
    </docs-example>

    <!-- Api -->

    <p pdk-typography="body">
      This directive functions as a <code docs-code>FormFieldControl</code>. To use this directive,
      add <code docs-code>PdkTextInput</code> to your list of ngModule/ standalone component
      imports.
    </p>

    <h3 pdk-typography="heading-medium">pdk-text-input</h3>
    <docs-props-list>
      <docs-props-list-item name="pdk-text-input" type="enum: email | number | postcode">
        An optional configuration preset for the validation and error messages of the text input.
      </docs-props-list-item>
    </docs-props-list>
  `,
  imports: [
    HeaderComponent,
    PdkTypographyDirective,
    ExampleComponent,
    FormsModule,
    PdkFormFieldComponent,
    PdkMarginDirective,
    PdkTextInputDirective,
    PdkInputComponent,
    PdkInputDirective,
    CodeComponent,
    PropsListComponent,
    PropsListItemComponent
  ]
})
export class TextInputComponent {
  html = markup;
}
