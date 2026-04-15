import { Component } from '@angular/core';
import { HeaderComponent } from '../../common/example-header/example-header';
import {
  PdkTypographyDirective,
  PdkLinkDirective,
  PdkFormFieldComponent,
  PdkMarginDirective,
  PdkRadioGroupComponent,
  PdkRadioButtonComponent
} from '@cpp/pdk';
import { ExampleComponent } from '../../common/example/example.component';
import { FormsModule } from '@angular/forms';
import {
  CodeComponent,
  PropsListComponent,
  PropsListItemComponent
} from '../../common/props-list/props-list';

const htmlOne = `
<pdk-form-field
  label="Where do you live?"
  labelType="medium"
>
  <pdk-radio-group 
    ngModel
    name="where-do-you-live"
    [options]="options"
  ></pdk-radio-group>
</pdk-form-field>
`;

const tsOne = `
class ExampleComponent {
  options = [
    {
      value: 'england',
      label: 'England'
    },
    {
      value: 'scotland',
      label: 'Scotland'
    },
    {
      value: 'wales',
      label: 'Wales'
    },
    {
      value: 'ireland',
      label: 'Ireland'
    }
  ]
}
`;

const htmlTwo = `
<pdk-form-field
  label="Have you changed your name?"
  labelType="medium"
  hintText="This includes changing your last name or spelling your name differently."
>
  <pdk-radio-group inline ngModel name="changed-name">
    <pdk-radio-button value="yes">Yes</pdk-radio-button>
    <pdk-radio-button value="no">No</pdk-radio-button>
  </pdk-radio-group>
</pdk-form-field>    
`;

const htmlThree = `
<pdk-form-field
  label="Filter"
  labelType="medium"
>
  <pdk-radio-group small ngModel name="filter">
    <pdk-radio-button value="yearly">Yearly</pdk-radio-button>
    <pdk-radio-button value="monthly">Monthly</pdk-radio-button>
  </pdk-radio-group>
</pdk-form-field>
`;

@Component({
  selector: 'docs-radios',
  template: `
    <docs-example-header origin="GOV.UK">
      <span pdk-typography="caption-xlarge">Components</span>
      <h1 pdk-typography="heading-xlarge">Radios</h1>
    </docs-example-header>
    <p pdk-typography="body">
      Use the radios component when users can only select one option from a list. The usage
      guidelines and related research for this component can be found
      <a pdk-link href="https://design-system.service.gov.uk/components/radios/">here</a>.
    </p>

    <!-- Example -->

    <h2 pdk-typography="heading-large">Radio group</h2>

    <docs-example [html]="htmlOne" [typescript]="tsOne">
      <form>
        <pdk-form-field label="Where do you live?" labelType="medium" pdk-margin="0">
          <pdk-radio-group ngModel name="where-do-you-live" [options]="options"></pdk-radio-group>
        </pdk-form-field>
      </form>
    </docs-example>

    <h2 pdk-typography="heading-large">Inline radios</h2>

    <docs-example [html]="htmlTwo">
      <form>
        <pdk-form-field
          label="Have you changed your name?"
          labelType="medium"
          hintText="This includes changing your last name or spelling your name differently."
          pdk-margin="0"
        >
          <pdk-radio-group inline ngModel name="changed-name">
            <pdk-radio-button value="yes">Yes</pdk-radio-button>
            <pdk-radio-button value="no">No</pdk-radio-button>
          </pdk-radio-group>
        </pdk-form-field>
      </form>
    </docs-example>

    <h2 pdk-typography="heading-large">Small radios</h2>

    <docs-example [html]="htmlThree">
      <form>
        <pdk-form-field label="Filter" labelType="medium" pdk-margin="0">
          <pdk-radio-group small ngModel name="filter">
            <pdk-radio-button value="yearly">Yearly</pdk-radio-button>
            <pdk-radio-button value="monthly">Monthly</pdk-radio-button>
          </pdk-radio-group>
        </pdk-form-field>
      </form>
    </docs-example>

    <!-- Api -->

    <h2 pdk-typography="heading-large">Api</h2>
    <p pdk-typography="body">
      These component function as a <code docs-code>ControlValueAccessor</code> and a
      <code docs-code>FormFieldControl</code>. To use these components, add
      <code docs-code>PdkRadio</code> to your list of ngModule/ standalone component imports.
    </p>

    <h3 pdk-typography="heading-medium">pdk-radio-group</h3>
    <docs-props-list>
      <docs-props-list-item name="ng-content" type="node">
        By default, it's expected that child radio buttons be populated using the
        <code docs-code>options</code> property. However, it's also possible to render one or more
        <code docs-code>pdk-radio-button</code> children in place of or in addition to the options.
      </docs-props-list-item>
      <docs-props-list-item name="ariaDescribedBy" type="string">
        An id for an element providing a full description of the radio group.
      </docs-props-list-item>
      <docs-props-list-item name="change" type="expression">
        An expression executed when the checked radio button changes.
      </docs-props-list-item>
      <docs-props-list-item name="disabled" type="boolean" defaultValue="false">
        When <code docs-code>true</code>, prevents interaction with the radio group.
      </docs-props-list-item>
      <docs-props-list-item name="inline" type="boolean" defaultValue="false">
        When <code docs-code>true</code>, displays radio buttons horizontally. This format is only
        encouraged when just two options are presented.
      </docs-props-list-item>
      <docs-props-list-item name="options" type="array" defaultValue="[]">
        Populates the radio group using an array of objects containing
        <code docs-code>value</code> and <code docs-code>label</code> properties.
      </docs-props-list-item>
      <docs-props-list-item name="required" type="boolean" defaultValue="false">
        When <code docs-code>true</code>, validates that at a radio option has been chosen.
      </docs-props-list-item>
      <docs-props-list-item name="small" type="boolean" defaultValue="false">
        When <code docs-code>true</code>, uses the smaller version of the radio buttons.
      </docs-props-list-item>
    </docs-props-list>

    <h3 pdk-typography="heading-medium">pdk-radio-button</h3>
    <docs-props-list>
      <docs-props-list-item name="ng-content" type="node">
        The label for the radio button.
      </docs-props-list-item>
      <docs-props-list-item name="ariaDescribedBy" type="string">
        An id for an element providing a full description of the radio button.
      </docs-props-list-item>
      <docs-props-list-item name="disabled" type="boolean" defaultValue="false">
        When <code docs-code>true</code>, prevents interaction with the radio button.
      </docs-props-list-item>
      <docs-props-list-item name="value" type="any">
        The model value attributed to the radio button.
      </docs-props-list-item>
    </docs-props-list>

    <h3 pdk-typography="heading-medium">pdk-radio-conditional</h3>
    <p pdk-typography="body">
      Use this component to display content that appears dependent on a radio being selected.
    </p>
    <docs-props-list>
      <docs-props-list-item name="ng-content" type="node">
        The content for the conditional.
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
    PdkRadioGroupComponent,
    PdkRadioButtonComponent,
    CodeComponent,
    PropsListComponent,
    PropsListItemComponent
  ]
})
export class RadiosComponent {
  htmlOne = htmlOne;
  htmlTwo = htmlTwo;
  htmlThree = htmlThree;
  tsOne = tsOne;
  options = [
    {
      value: 'england',
      label: 'England'
    },
    {
      value: 'scotland',
      label: 'Scotland'
    },
    {
      value: 'wales',
      label: 'Wales'
    },
    {
      value: 'ireland',
      label: 'Ireland'
    }
  ];
}
