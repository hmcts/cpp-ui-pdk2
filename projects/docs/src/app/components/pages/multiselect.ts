import { Component } from '@angular/core';
import { HeaderComponent } from '../../common/example-header/example-header';
import {
  PdkTypographyDirective,
  PdkFormFieldComponent,
  PdkMultiSelectComponent as MultiSelectComponent_1
} from '@cpp/pdk';
import { ExampleComponent } from '../../common/example/example.component';
import { FormsModule } from '@angular/forms';
import {
  CodeComponent,
  PropsListComponent,
  PropsListItemComponent
} from '../../common/props-list/props-list';
import { JsonPipe } from '@angular/common';

const html = `
<pdk-form-field label="Select multiple">
  <pdk-multi-select
    ngModel
    name="select-multiple"
    placeholder="Choose multiple options"
    [options]="options"
  >
  </pdk-multi-select>
</pdk-form-field>
`;

const ts = `
class ExampleComponent {
  options = [
    { value: 'published', label: 'Recently published' },
    { value: 'updated', label: 'Recently updated' },
    { value: 'views', label: 'Most views' },
    { value: 'comments', label: 'Most comments' },
    { value: 'jokes', label: 'Funniest jokes' },
    { value: 'quotes', label: 'Favourite quotes' },
  ]
}
`;

@Component({
  selector: 'docs-multi-select',
  template: `
    <docs-example-header origin="CPP">
      <span pdk-typography="caption-xlarge">Components</span>
      <h1 pdk-typography="heading-xlarge">Multiselect</h1>
    </docs-example-header>
    <p pdk-typography="body">
      Use this component to select multiple entries from a drop down selection.
    </p>

    <!-- Example -->

    <h2 pdk-typography="heading-large">Example</h2>

    <docs-example [html]="html" [typescript]="ts">
      <form>
        <pdk-form-field label="Select multiple">
          <pdk-multi-select
            ngModel
            #multiSelectValue="ngModel"
            name="select-multiple"
            placeholder="Choose multiple options"
            [options]="options"
          >
          </pdk-multi-select>
        </pdk-form-field>
      </form>
      {{ multiSelectValue.value | json }}
    </docs-example>

    <!-- Api -->

    <h2 pdk-typography="heading-large">Api</h2>
    <p pdk-typography="body">
      This component functions as a <code docs-code>ControlValueAccessor</code> and a
      <code docs-code>FormFieldControl</code>. To use this component, add
      <code docs-code>PdkMultiSelectComponent</code> to your list of ngModule/ standalone component
      imports.
    </p>

    <h3 pdk-typography="heading-medium">pdk-multi-select</h3>
    <docs-props-list>
      <docs-props-list-item name="ariaDescribedBy" type="string">
        The aria description value for the multi select component.
      </docs-props-list-item>
      <docs-props-list-item name="ariaLabel" type="string">
        The aria label value for the multi select component.
      </docs-props-list-item>
      <docs-props-list-item name="canClear" type="boolean" defaultValue="true">
        When <code docs-code>true</code>, the component can clear all selections.
      </docs-props-list-item>
      <docs-props-list-item name="canSearch" type="boolean" defaultValue="true">
        When <code docs-code>true</code>, the multi select options are seachable using the input
        element.
      </docs-props-list-item>
      <docs-props-list-item name="collapseOnSelect" type="boolean" defaultValue="false">
        When <code docs-code>true</code>, the multi select options are closed whenever an item is
        selected.
      </docs-props-list-item>
      <docs-props-list-item name="disabled" type="boolean" defaultValue="false">
        When <code docs-code>true</code>, the component is disabled.
      </docs-props-list-item>
      <docs-props-list-item name="hasError" type="boolean" defaultValue="false">
        When <code docs-code>true</code>, the component is display with a red border indicating an
        error.
      </docs-props-list-item>
      <docs-props-list-item name="id" type="string" defaultValue="Internally generated Id">
        The unique id for the multi select component.
      </docs-props-list-item>
      <docs-props-list-item name="inputWidth" type="MultiSelectInputWidth">
        Sets the width of the component using values
        <code docs-code>2 | 3 | 4 | 5 | 10 | 20 | 30</code>.
      </docs-props-list-item>
      <docs-props-list-item name="justified" type="boolean" defaultValue="false">
        When <code docs-code>true</code>, the component will occupy the full width of its container.
      </docs-props-list-item>
      <docs-props-list-item name="labelTemplate" type="TemplateRef" defaultValue="tag">
        When provided, the <code docs-code>templateRef</code> will replace the standard tag template
        displayed as selection. The templateRef should expose context variables of type
        <code docs-code>MultiSelectLabelTemplateContext</code>.
      </docs-props-list-item>
      <docs-props-list-item name="options" type="array" defaultValue="[]">
        Populates the select input using an array of objects containing
        <code docs-code>value</code> and <code docs-code>label</code> properties.
      </docs-props-list-item>
      <docs-props-list-item name="optionTemplate" type="TemplateRef" defaultValue="checkbox">
        When provided, the <code docs-code>templateRef</code> will replace the standard checkbox
        template used. The templateRef should expose context variables of type
        <code docs-code>MultiSelectOptionTemplateContext</code>.
      </docs-props-list-item>
      <docs-props-list-item name="placeholder" type="string">
        The text to display when no option has been chosen.
      </docs-props-list-item>
      <docs-props-list-item name="tagColor" type="green">
        The tag color used for the standard selected option display.
      </docs-props-list-item>
      <docs-props-list-item name="required" type="boolean" defaultValue="false">
        When <code docs-code>true</code>, validates that at an option has been chosen.
      </docs-props-list-item>
    </docs-props-list>
  `,
  imports: [
    HeaderComponent,
    PdkTypographyDirective,
    ExampleComponent,
    FormsModule,
    PdkFormFieldComponent,
    MultiSelectComponent_1,
    CodeComponent,
    PropsListComponent,
    PropsListItemComponent,
    JsonPipe
  ]
})
export class MultiSelectComponent {
  html = html;
  ts = ts;
  options = [
    { value: 'published', label: 'Recently published' },
    { value: 'updated', label: 'Recently updated' },
    { value: 'views', label: 'Most views' },
    { value: 'comments', label: 'Most comments' },
    { value: 'jokes', label: 'Funniest jokes' },
    { value: 'quotes', label: 'Favourite quotes' }
  ];
}
