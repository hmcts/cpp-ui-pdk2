import { Component } from '@angular/core';
import { HeaderComponent } from '../../common/example-header/example-header';
import {
  PdkTypographyDirective,
  PdkFormFieldComponent,
  PdkFileInputComponent,
  PdkFileInputDirective
} from '@cpp/pdk';
import { ExampleComponent } from '../../common/example/example.component';
import { FormsModule } from '@angular/forms';
import { CodeComponent } from '../../common/props-list/props-list';

const markup = `
<pdk-form-field label="Upload a file">
  <input
    type="file"
    pdk-file-input
    ngModel
    name="file-upload"
  />
</pdk-form-field>
`;

@Component({
  selector: 'docs-file-upload',
  template: `
    <docs-example-header origin="GOV.UK">
      <span pdk-typography="caption-xlarge">Components</span>
      <h1 pdk-typography="heading-xlarge">File upload</h1>
    </docs-example-header>
    <p pdk-typography="body">
      Use this component to allow users to select and upload a file that is critical to the delivery
      of your service.
    </p>

    <!-- Example -->

    <h2 pdk-typography="heading-large">Example</h2>

    <docs-example [html]="html">
      <form>
        <pdk-form-field label="Upload a file">
          <input type="file" pdk-file-input required ngModel name="file-upload" />
        </pdk-form-field>
      </form>
    </docs-example>

    <!-- Api -->

    <h2 pdk-typography="heading-large">Api</h2>
    <p pdk-typography="body">
      To use this component, add <code docs-code>PdkFileInput</code> to your list of ngModule/
      standalone component imports.
    </p>

    <h3 pdk-typography="heading-medium">[pdk-file-input]</h3>
    <p pdk-typography="body">
      This directive functions as a <code docs-code>FormFieldControl</code>.
    </p>
  `,
  imports: [
    HeaderComponent,
    PdkTypographyDirective,
    ExampleComponent,
    FormsModule,
    PdkFormFieldComponent,
    PdkFileInputComponent,
    PdkFileInputDirective,
    CodeComponent
  ]
})
export class FileUploadComponent {
  html = markup;
}
