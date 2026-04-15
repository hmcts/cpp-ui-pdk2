import { Component } from '@angular/core';
import { HeaderComponent } from '../../common/example-header/example-header';
import {
  PdkTypographyDirective,
  PdkLinkDirective,
  PdkButtonComponent as ButtonComponent_1,
  PdkButtonDirective,
  PdkMarginDirective
} from '@cpp/pdk';
import { ExampleComponent } from '../../common/example/example.component';
import {
  CodeComponent,
  PropsListComponent,
  PropsListItemComponent
} from '../../common/props-list/props-list';

const markup = `
<button pdk-button>
  Save and continue
</button>
`;

@Component({
  selector: 'docs-button',
  template: `
    <docs-example-header origin="GOV.UK">
      <span pdk-typography="caption-xlarge">Components</span>
      <h1 pdk-typography="heading-xlarge">Button</h1>
    </docs-example-header>
    <p pdk-typography="body">
      Use the button component to help users carry out an action like starting an application or
      saving their information. The usage guidelines and related research for this component can be
      found <a pdk-link href="https://design-system.service.gov.uk/components/button">here</a>.
    </p>

    <!-- Example -->

    <h2 pdk-typography="heading-large">Example</h2>

    <docs-example [html]="html">
      <button pdk-button pdk-margin-bottom="0">Save and continue</button>
    </docs-example>

    <!-- Api -->

    <h2 pdk-typography="heading-large">Api</h2>
    <p pdk-typography="body">
      To use this component, add <code docs-code>PdkButton</code> to your list of
      ngModule/standalone component imports. You can also directily import
      <code docs-code>PdkButtonComponent</code> and
      <code docs-code>PdkButtonDirective</code> together in ngModules or standalone components.
    </p>

    <h3 pdk-typography="heading-medium">pdk-button-group</h3>
    <p pdk-typography="body">
      Use this component to act as a containing element for inline buttons. Any links within a
      button group will automatically align with the buttons. To use this component, add
      <code docs-code>PdkButton</code> to your list of ngModule/standalone component imports. You
      can also directily import <code docs-code>ButtonGroupComponent</code> in ngModules or
      standalone components.
    </p>
    <docs-props-list>
      <docs-props-list-item name="ng-content" type="node">
        The buttons or link to be displayed inline.
      </docs-props-list-item>
    </docs-props-list>

    <h3 pdk-typography="heading-medium">pdk-button</h3>
    <docs-props-list>
      <docs-props-list-item name="ng-content" type="node">
        The content for the component.
      </docs-props-list-item>
      <docs-props-list-item
        name="pdk-button"
        type="enum: default | start | secondary | warning | inverse"
        defaultValue="default"
      >
        The variation of button to be used.
      </docs-props-list-item>
      <docs-props-list-item name="disabled" type="boolean" defaultValue="false">
        If <code docs-code>true</code>, the button will be disabled.
      </docs-props-list-item>
    </docs-props-list>
  `,
  imports: [
    HeaderComponent,
    PdkTypographyDirective,
    PdkLinkDirective,
    ExampleComponent,
    ButtonComponent_1,
    PdkButtonDirective,
    PdkMarginDirective,
    CodeComponent,
    PropsListComponent,
    PropsListItemComponent
  ]
})
export class ButtonComponent {
  html = markup;
}
