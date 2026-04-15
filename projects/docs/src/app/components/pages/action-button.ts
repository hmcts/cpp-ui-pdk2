import { Component } from '@angular/core';
import { HeaderComponent } from '../../common/example-header/example-header';
import {
  PdkTypographyDirective,
  PdkActionButtonComponent as ActionButtonComponent_1
} from '@cpp/pdk';
import { ExampleComponent } from '../../common/example/example.component';
import {
  CodeComponent,
  PropsListComponent,
  PropsListItemComponent
} from '../../common/props-list/props-list';

const markup = `
<a href="#" pdk-action-button>
  Action button
</a>
`;

@Component({
  selector: 'docs-action-button',
  template: `
    <docs-example-header origin="CPP">
      <span pdk-typography="caption-xlarge">Components</span>
      <h1 pdk-typography="heading-xlarge">Action button</h1>
    </docs-example-header>
    <p pdk-typography="body">
      Use this component as a link or button for any action that exists as part of a workflow.
    </p>

    <!-- Example -->

    <h2 pdk-typography="heading-large">Example</h2>

    <docs-example [html]="html">
      <a href="javascript:void(0)" pdk-action-button> Action button </a>
    </docs-example>

    <!-- Api -->

    <h2 pdk-typography="heading-large">Api</h2>
    <p pdk-typography="body">
      To use this component, add <code docs-code>PdkAction</code> or
      <code docs-code>PdkActionButtonComponent</code> to your list of ngModule or standalone
      component imports.
    </p>

    <h3 pdk-typography="heading-medium">pdk-action-button, [pdk-action-button]</h3>
    <docs-props-list>
      <docs-props-list-item name="ng-content" type="node">
        The content for the component.
      </docs-props-list-item>
      <docs-props-list-item name="disabled" type="boolean" defaultValue="false">
        If <code docs-code>true</code>, the button will be disabled.
      </docs-props-list-item>
      <docs-props-list-item name="inverted" type="boolean" defaultValue="false">
        If <code docs-code>true</code>, the button will use the inverted colorset.
      </docs-props-list-item>
      <docs-props-list-item name="error" type="boolean" defaultValue="false">
        If <code docs-code>true</code>, the button will be styled with an error.
      </docs-props-list-item>
      <docs-props-list-item name="role" type="string" defaultValue="link">
        The ARIA role to attribute to the button.
      </docs-props-list-item>
    </docs-props-list>
  `,
  imports: [
    HeaderComponent,
    PdkTypographyDirective,
    ExampleComponent,
    ActionButtonComponent_1,
    CodeComponent,
    PropsListComponent,
    PropsListItemComponent
  ]
})
export class ActionButtonComponent {
  html = markup;
}
