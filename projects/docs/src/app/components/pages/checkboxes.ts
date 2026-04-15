import { Component } from '@angular/core';
import { HeaderComponent } from '../../common/example-header/example-header';
import {
  PdkTypographyDirective,
  PdkLinkDirective,
  PdkFormFieldComponent,
  PdkMarginDirective,
  PdkInputComponent,
  PdkInputDirective,
  PdkTextInputDirective,
  PdkCheckBox
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
  label="What is your nationality?"
  labelType="medium"
  hint
>
  <pdk-checkbox-group
    ngModel 
    name="nationality"
    [options]="options"
  >
  </pdk-checkbox-group>
</pdk-form-field>
`;

const tsOne = `
class ExampleComponent {
  options = [
    {
      value: 'british',
      label: 'British',
      hintText: 'including English, Scottish, Welsh and Northern Irish'
    },
    {
      value: 'irish',
      label: 'Irish'
    },
    {
      value: 'other',
      label: 'Citizen of another country'
    }
  ];
}
`;

const htmlTwo = `
<pdk-form-field
  label="Organisation"
  labelType="medium"
>
  <pdk-checkbox-group
    ngModel
    name="organisation"
    checkboxType="small"
    [options]="options"
  >
  </pdk-checkbox>
</pdk-form-field>
`;

const tsTwo = `
class ExampleComponent {
  options = [
    {
      value: 1,
      label: 'HM Revenue and Customs (HMRC)'
    },
    {
      value: 2,
      label: 'Employment Tribunal',
    },
    {
      value: 3,
      label: 'Ministry of Defence'
    },
    {
      value: 4,
      label: 'Department for Transport'
    }
  ];
}
`;

const htmlThree = `
<pdk-form-field
  label="Terms and conditions"
  labelType="medium"
  hintText="Do you agree to the terms and conditions?"
>
  <pdk-checkbox
    #terms="ngModel"
    ngModel
    name="terms"
  >
    I accept
  </pdk-checkbox>
   @if (terms.value) {
  <pdk-checkbox-conditional>
    <pdk-form-field label="Further information">
      <input pdk-input pdk-text-input ngModel name="details" />
    </pdk-form-field>
  </pdk-checkbox-conditional>
}
</pdk-form-field>
`;

@Component({
  selector: 'docs-checkbox',
  template: `
    <docs-example-header origin="GOV.UK">
      <span pdk-typography="caption-xlarge">Components</span>
      <h1 pdk-typography="heading-xlarge">Checkboxes</h1>
    </docs-example-header>
    <p pdk-typography="body">
      Let users select one or more options by using the checkboxes component. The usage guidelines
      and related research for this component can be found
      <a pdk-link href="https://design-system.service.gov.uk/components/checkboxes/">here</a>.
    </p>

    <!-- Examples -->

    <h2 pdk-typography="heading-large">Checkbox group</h2>

    <docs-example [html]="htmlOne" [typescript]="tsOne">
      <form>
        <pdk-form-field label="What is your nationality?" labelType="medium" hint pdk-margin="0">
          <pdk-checkbox-group name="nationality" [options]="optionsOne"> </pdk-checkbox-group>
        </pdk-form-field>
      </form>
    </docs-example>

    <h2 pdk-typography="heading-large">Small checkboxes</h2>

    <docs-example [html]="htmlTwo" [typescript]="tsTwo">
      <form>
        <pdk-form-field label="Organisation" labelType="medium" pdk-margin="0">
          <pdk-checkbox-group
            ngModel
            checkboxType="small"
            name="organisation"
            [options]="optionsTwo"
          >
          </pdk-checkbox-group>
        </pdk-form-field>
      </form>
    </docs-example>

    <h2 pdk-typography="heading-large">Conditional checkbox</h2>

    <docs-example [html]="htmlThree">
      <form>
        <h2 id="terms" pdk-typography="heading-medium">Terms and conditions</h2>
        <pdk-form-field hintText="Do you agree to the terms and conditions?" pdk-margin="0">
          <pdk-checkbox
            pdk-margin-bottom="2"
            #terms="ngModel"
            ngModel
            name="terms"
            ariaDescribedBy="terms"
            >I accept</pdk-checkbox
          >
          @if (terms.value) {
          <pdk-checkbox-conditional>
            <pdk-form-field label="Further information">
              <input pdk-input pdk-text-input ngModel name="details" />
            </pdk-form-field>
          </pdk-checkbox-conditional>
          }
        </pdk-form-field>
      </form>
    </docs-example>

    <!-- Api -->

    <h2 pdk-typography="heading-large">Api</h2>
    <p pdk-typography="body">
      These components function as a <code docs-code>ControlValueAccessor</code> and a
      <code docs-code>FormFieldControl</code>. To use these components, add
      <code docs-code>PdkCheckBox</code> to your list of ngModule/ standalone component imports. For
      a single checkbox that isnt a member of a Checkbox group, you can directly import
      <code docs-code>PdkCheckboxComponent</code> also.
    </p>

    <h3 pdk-typography="heading-medium">pdk-checkbox-group</h3>
    <docs-props-list>
      <docs-props-list-item name="ng-content" type="node">
        By default, it's expected that child checkboxes be populated using the
        <code docs-code>options</code> property. However, it's also possible to render one or more
        <code docs-code>pdk-checkbox</code> children in place of or in addition to the options.
      </docs-props-list-item>
      <docs-props-list-item name="ariaDescribedBy" type="string">
        An id for an element providing a full description of the checkbox group.
      </docs-props-list-item>
      <docs-props-list-item name="change" type="expression">
        An expression executed when the checked status of a checkbox changes.
      </docs-props-list-item>
      <docs-props-list-item name="checkboxType" type="small | default" defaultValue="default">
        The size of the checkboxes rendered by the <code docs-code>options</code>.
      </docs-props-list-item>
      <docs-props-list-item name="disabled" type="boolean" defaultValue="false">
        When <code docs-code>true</code>, prevents interaction with the checkbox group.
      </docs-props-list-item>
      <docs-props-list-item name="options" type="array" defaultValue="[]">
        Populates the checkbox group using an array of objects containing
        <code docs-code>value</code> and <code docs-code>label</code> properties, and optional
        <code docs-code>hintText</code> property.
      </docs-props-list-item>
    </docs-props-list>

    <h3 pdk-typography="heading-medium">pdk-checkbox</h3>
    <docs-props-list>
      <docs-props-list-item name="ng-content" type="node">
        The label for the checkbox.
      </docs-props-list-item>
      <docs-props-list-item name="ariaDescribedBy" type="string">
        An id for an element providing a full description of the checkbox.
      </docs-props-list-item>
      <docs-props-list-item name="change" type="expression">
        An expression executed when the checked status of the checkbox changes.
      </docs-props-list-item>
      <docs-props-list-item name="checkboxType" type="small | default" defaultValue="default">
        The size of the checkbox.
      </docs-props-list-item>
      <docs-props-list-item name="disabled" type="boolean" defaultValue="false">
        When <code docs-code>true</code>, prevents interaction with the checkbox.
      </docs-props-list-item>
      <docs-props-list-item name="hintText" type="string">
        An extended description of this checkbox.
      </docs-props-list-item>
      <docs-props-list-item name="required" type="boolean" defaultValue="false">
        When <code docs-code>true</code>, requires interaction with the checkbox.
      </docs-props-list-item>
      <docs-props-list-item name="valueChecked" defaultValue="true">
        The value set by the control when the checkbox is checked.
      </docs-props-list-item>
      <docs-props-list-item name="valueUnchecked" defaultValue="false">
        The value set by the control when the checkbox is unchecked.
      </docs-props-list-item>
    </docs-props-list>

    <h3 pdk-typography="heading-medium">pdk-checkbox-conditional</h3>
    <p pdk-typography="body">
      Use this component to display content that appears dependent on a checkbox being checked.
    </p>
    <docs-props-list>
      <docs-props-list-item name="ng-content" type="node">
        The content for the conditional.
      </docs-props-list-item>
      <docs-props-list-item name="checkboxType" type="small | default" defaultValue="default">
        The size of the conditional inset.
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
    PdkInputComponent,
    PdkInputDirective,
    PdkTextInputDirective,
    CodeComponent,
    PropsListComponent,
    PropsListItemComponent,
    PdkCheckBox
  ]
})
export class CheckboxesComponent {
  htmlOne = htmlOne;
  htmlTwo = htmlTwo;
  htmlThree = htmlThree;
  tsOne = tsOne;
  tsTwo = tsTwo;
  optionsOne = [
    {
      value: 'british',
      label: 'British',
      hintText: 'including English, Scottish, Welsh and Northern Irish'
    },
    {
      value: 'irish',
      label: 'Irish'
    },
    {
      value: 'other',
      label: 'Citizen of another country'
    }
  ];
  optionsTwo = [
    {
      value: 1,
      label: 'HM Revenue and Customs (HMRC)'
    },
    {
      value: 2,
      label: 'Employment Tribunal'
    },
    {
      value: 3,
      label: 'Ministry of Defence'
    },
    {
      value: 4,
      label: 'Department for Transport'
    }
  ];
}
