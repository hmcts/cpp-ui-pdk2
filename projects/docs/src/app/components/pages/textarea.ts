import { Component } from '@angular/core';
import { HeaderComponent } from '../../common/example-header/example-header';
import {
  PdkTypographyDirective,
  PdkLinkDirective,
  PdkFormFieldComponent,
  PdkResizeDirective,
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
<pdk-form-field
  label="Can you provide more detail?"
  hintText="Do not include personal or financial information, like 
    your National Insurance number or credit card details." 
>
  <textarea
    id="more-detail"
    name="more-detail"
    ngModel
    pdk-resize
    minRows="5"
    maxRows="10"
    pdk-text-input
    pdk-input
  >
  </textarea>
</pdk-form-field>
`;

@Component({
  selector: 'docs-textarea',
  template: `
    <docs-example-header origin="GOV.UK">
      <span pdk-typography="caption-xlarge">Components</span>
      <h1 pdk-typography="heading-xlarge">Textarea</h1>
    </docs-example-header>
    <p pdk-typography="body">
      Use the textarea component when you need to let users enter an amount of text that’s longer
      than a single line. The usage guidelines and related research for this component can be found
      <a pdk-link href="https://design-system.service.gov.uk/components/textarea">here</a>.
    </p>

    <!-- Example -->

    <h2 pdk-typography="heading-large">Example</h2>

    <docs-example [html]="html">
      <form>
        <pdk-form-field
          label="Can you provide more detail?"
          hintText="Do not include personal or financial information, like your National Insurance number or
          credit card details."
        >
          <textarea
            id="more-detail"
            name="more-detail"
            ngModel
            pdk-resize
            minRows="5"
            maxRows="10"
            pdk-text-input
            pdk-input
          ></textarea>
        </pdk-form-field>
      </form>
    </docs-example>

    <!-- Api -->

    <h2 pdk-typography="heading-large">Api</h2>
    <p pdk-typography="body">
      To use this component, add <code docs-code>PdkResizeDirective</code> and
      <code docs-code>PdkTextInput</code> to your list of ngModule/ standalone component imports.
    </p>

    <h3 pdk-typography="heading-medium">[pdk-resize]</h3>
    <p>Apply this directive to a textarea to add elastic resize behaviour to its height.</p>
    <docs-props-list>
      <docs-props-list-item name="minRows" type="number" defaultValue="4">
        The minimum height of the textarea in rows.
      </docs-props-list-item>
      <docs-props-list-item name="maxRows" type="number" defaultValue="16">
        The maximum height of the textarea in rows.
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
    PdkResizeDirective,
    PdkTextInputDirective,
    PdkInputComponent,
    PdkInputDirective,
    CodeComponent,
    PropsListComponent,
    PropsListItemComponent
  ]
})
export class TextareaComponent {
  html = markup;
}
