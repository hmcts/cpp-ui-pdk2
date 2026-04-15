import { Component } from '@angular/core';
import { HeaderComponent } from '../../common/example-header/example-header';
import {
  PdkTypographyDirective,
  PdkFormFieldComponent,
  PdkRichTextInputComponent as RichTextInputComponent_1
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
  <pdk-rich-text-input
    ngModel
    name="test"

  >
  </pdk-rich-text-input>
</pdk-form-field>
`;

@Component({
  selector: 'docs-rich-text-input',
  template: `
    <docs-example-header origin="GOV.UK">
      <span pdk-typography="caption-xlarge">Components</span>
      <h1 pdk-typography="heading-xlarge">Rich text input</h1>
    </docs-example-header>
    <p pdk-typography="body">
      Use this component for editing html contents. This rich text input is based on an external
      library quill.js.
    </p>

    <!-- Example -->

    <h2 pdk-typography="heading-large">Example</h2>

    <docs-example [html]="html">
      <form>
        <pdk-form-field label="Edit template" labelType="medium">
          <pdk-rich-text-input name="html"></pdk-rich-text-input>
        </pdk-form-field>
      </form>
    </docs-example>

    <!-- Api -->

    <h2 pdk-typography="heading-large">Api</h2>
    <p pdk-typography="body">
      This component functions as a <code docs-code>ControlValueAccessor</code> and a
      <code docs-code>FormFieldControl</code>. To use this component, add
      <code docs-code>PdkRichTextInputComponent</code> to your list of ngModule/ standalone
      component imports.
    </p>

    <h3 pdk-typography="heading-medium">pdk-rich-text-input</h3>
    <docs-props-list>
      <docs-props-list-item
        name="alignments"
        type="Array<'left' | 'right' | 'center' | 'justified'>"
        defaultValue="['left', 'center', 'right']"
      >
        Sets the alignment buttons
      </docs-props-list-item>
      <docs-props-list-item
        name="styles"
        type="Array<'bold' | 'italic' | 'underline' | 'strikethrough'>"
        defaultValue="['bold' | 'italic' | 'underline']"
      >
        Sets the text style buttons
      </docs-props-list-item>
      <docs-props-list-item
        name="listTypes"
        type="Array<'bullet' | 'ordered'>"
        defaultValue="['bullet' | 'ordered']"
      >
        Sets the list types buttons
      </docs-props-list-item>
    </docs-props-list>
  `,
  imports: [
    HeaderComponent,
    PdkTypographyDirective,
    ExampleComponent,
    FormsModule,
    PdkFormFieldComponent,
    RichTextInputComponent_1,
    CodeComponent,
    PropsListComponent,
    PropsListItemComponent
  ]
})
export class RichTextInputComponent {
  html = markup;
}
