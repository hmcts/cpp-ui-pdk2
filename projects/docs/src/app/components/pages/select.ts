import { Component } from '@angular/core';
import { HeaderComponent } from '../../common/example-header/example-header';
import {
  PdkTypographyDirective,
  PdkLinkDirective,
  PdkFormFieldComponent,
  PdkMarginDirective,
  PdkSelectComponent as SelectComponent_1
} from '@cpp/pdk';
import { ExampleComponent } from '../../common/example/example.component';
import { FormsModule } from '@angular/forms';
import {
  CodeComponent,
  PropsListComponent,
  PropsListItemComponent
} from '../../common/props-list/props-list';

const html = `
<pdk-form-field label="Sort by">
  <pdk-select
    ngModel
    name="sort"
    placeholder="Choose an option"
    [options]="options"
  >
  </pdk-select>
</pdk-form-field>
`;

const ts = `
class ExampleComponent {
  options = [
    { value: 'published', label: 'Recently published' },
    { value: 'updated', label: 'Recently updated' },
    { value: 'views', label: 'Most views' },
    { value: 'comments', label: 'Most comments' }
  ]
}
`;

@Component({
  selector: 'docs-select',
  template: `
    <docs-example-header origin="GOV.UK">
      <span pdk-typography="caption-xlarge">Components</span>
      <h1 pdk-typography="heading-xlarge">Select</h1>
    </docs-example-header>
    <p pdk-typography="body">
      The usage guidelines and related research for this component can be found
      <a pdk-link href="https://design-system.service.gov.uk/components/select/">here</a>.
    </p>

    <!-- Example -->

    <h2 pdk-typography="heading-large">Example</h2>

    <docs-example [html]="html" [typescript]="ts">
      <form>
        <pdk-form-field label="Sort by" pdk-margin-bottom="0">
          <pdk-select
            ngModel
            name="sort"
            placeholder="Choose an option"
            [options]="options"
          ></pdk-select>
        </pdk-form-field>
      </form>
    </docs-example>

    <!-- Api -->

    <h2 pdk-typography="heading-large">Api</h2>
    <p pdk-typography="body">
      This component functions as a <code docs-code>ControlValueAccessor</code> and a
      <code docs-code>FormFieldControl</code>. To use this component, add
      <code docs-code>PdkSelectComponent</code> to your list of ngModule/ standalone component
      imports.
    </p>

    <h3 pdk-typography="heading-medium">pdk-select</h3>
    <docs-props-list>
      <docs-props-list-item name="ng-content" type="node">
        By default, it's expected that child options be populated using the
        <code docs-code>options</code> property. However, it's also possible to render one or more
        <code docs-code>option</code> children in place of or in addition to the options.
      </docs-props-list-item>
      <docs-props-list-item name="disabled" type="boolean" defaultValue="false">
        When <code docs-code>true</code>, prevents interaction with the select input.
      </docs-props-list-item>
      <docs-props-list-item name="justified" type="boolean" defaultValue="false">
        When <code docs-code>true</code>, the component will occupy the full width of its container.
      </docs-props-list-item>
      <docs-props-list-item name="options" type="array" defaultValue="[]">
        Populates the select input using an array of objects containing
        <code docs-code>value</code> and <code docs-code>label</code> properties.
      </docs-props-list-item>
      <docs-props-list-item name="placeholder" type="string">
        The text to display when no option has been chosen.
      </docs-props-list-item>
      <docs-props-list-item name="required" type="boolean" defaultValue="false">
        When <code docs-code>true</code>, validates that at an option has been chosen.
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
    PdkMarginDirective,
    SelectComponent_1,
    CodeComponent,
    PropsListComponent,
    PropsListItemComponent
  ]
})
export class SelectComponent {
  html = html;
  ts = ts;
  options = [
    { value: 'published', label: 'Recently published' },
    { value: 'updated', label: 'Recently updated' },
    { value: 'views', label: 'Most views' },
    { value: 'comments', label: 'Most comments' }
  ];
}
