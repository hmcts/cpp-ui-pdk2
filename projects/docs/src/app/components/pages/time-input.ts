import { Component } from '@angular/core';
import { HeaderComponent } from '../../common/example-header/example-header';
import {
  PdkTypographyDirective,
  PdkFormFieldComponent,
  PdkTimeInputComponent as TimeInputComponent_1
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
  label="Start time"
  hintText="The time at which the hearing will begin."
>
  <pdk-time-input
    ngModel
    name="startTime"
  >
  </pdk-time-input>
</pdk-form-field>
`;

@Component({
  selector: 'docs-time-input',
  template: `
    <docs-example-header origin="CPP">
      <span pdk-typography="caption-xlarge">Components</span>
      <h1 pdk-typography="heading-xlarge">Time input</h1>
    </docs-example-header>
    <p pdk-typography="body">Use this component for collecting a time within a form.</p>

    <!-- Example -->

    <h2 pdk-typography="heading-large">Example</h2>

    <docs-example [html]="html">
      <form>
        <pdk-form-field label="Start time" hintText="The time at which the hearing will begin.">
          <pdk-time-input ngModel name="startTime"> </pdk-time-input>
        </pdk-form-field>
      </form>
    </docs-example>

    <!-- Api -->

    <h2 pdk-typography="heading-large">Api</h2>
    <p pdk-typography="body">
      This component functions as a <code docs-code>ControlValueAccessor</code> and a
      <code docs-code>FormFieldControl</code>.
    </p>

    <h3 pdk-typography="heading-medium">pdk-time-input</h3>
    <p pdk-typography="body">
      To use this component, add <code docs-code>PdkTimeInputComponent</code> to your list of
      ngModule/standalone component imports.
    </p>

    <docs-props-list>
      <docs-props-list-item name="autoShift" type="boolean" defaultValue="true">
        When <code docs-code>true</code>, automatically shifts focus to the minutes input once an
        hour has been entered.
      </docs-props-list-item>
      <docs-props-list-item name="labelHidden" type="boolean" defaultValue="true">
        When <code docs-code>true</code>, hides the hours and minutes labels.
      </docs-props-list-item>
    </docs-props-list>
  `,
  imports: [
    HeaderComponent,
    PdkTypographyDirective,
    ExampleComponent,
    FormsModule,
    PdkFormFieldComponent,
    TimeInputComponent_1,
    CodeComponent,
    PropsListComponent,
    PropsListItemComponent
  ]
})
export class TimeInputComponent {
  html = markup;
}
