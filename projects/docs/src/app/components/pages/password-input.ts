import { Component } from '@angular/core';
import { HeaderComponent } from '../../common/example-header/example-header';
import {
  PdkTypographyDirective,
  PdkFormFieldComponent,
  PdkMarginDirective,
  PdkPasswordInputComponent as PasswordInputComponent_1,
  PdkLinkDirective
} from '@cpp/pdk';
import { ExampleComponent } from '../../common/example/example.component';
import { FormsModule } from '@angular/forms';
import {
  CodeComponent,
  PropsListComponent,
  PropsListItemComponent
} from '../../common/props-list/props-list';

const markup = `
<pdk-form-field label="Password" pdk-margin-bottom="0">
    <pdk-password-input type="text" ngModel name="password"></pdk-password-input>
</pdk-form-field>
`;

@Component({
  selector: 'docs-text-input',
  template: `
    <docs-example-header origin="GOV.UK">
      <span pdk-typography="caption-xlarge">Components</span>
      <h1 pdk-typography="heading-xlarge">Password input</h1>
    </docs-example-header>
    <p pdk-typography="body">
      The usage guidelines and related research for this component can be found
      <a pdk-link href="https://design-system.service.gov.uk/components/password-input/">here</a>.
    </p>

    <!-- Example -->

    <h2 pdk-typography="heading-large">Example</h2>

    <docs-example [html]="html">
      <form>
        <pdk-form-field label="Password" pdk-margin-bottom="0">
          <pdk-password-input type="text" ngModel name="password"></pdk-password-input>
        </pdk-form-field>
      </form>
    </docs-example>

    <!-- Api -->

    <p pdk-typography="body">
      This directive functions as a <code docs-code>FormFieldControl</code>. To use this directive,
      add <code docs-code>PdkPasswordInputComponent</code> to your list of ngModule/ standalone
      component imports.
    </p>

    <h3 pdk-typography="heading-medium">pdk-password-input | [pdk-password-input]</h3>
    <docs-props-list>
      <docs-props-list-item name="disabled" type="boolean">
        Use for disabling the password input and display button.
      </docs-props-list-item>
      <docs-props-list-item name="inputWidth" type="2 | 3 | 4 | 5 | 10 | 20 | 30">
        Use for setting the size of the password input
      </docs-props-list-item>
      <docs-props-list-item name="ariaDescribedBy" type="string">
        Use for setting the accessibility described by property
      </docs-props-list-item>
      <docs-props-list-item name="required" type="boolean">
        Use for setting the required status of the form control
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
    PasswordInputComponent_1,
    CodeComponent,
    PropsListComponent,
    PropsListItemComponent,
    PdkLinkDirective
  ]
})
export class PasswordInputComponent {
  html = markup;
}
