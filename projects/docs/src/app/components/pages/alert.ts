import { Component } from '@angular/core';
import { HeaderComponent } from '../../common/example-header/example-header';
import { PdkTypographyDirective, PdkAlertComponent as AlertComponent_1 } from '@cpp/pdk';
import { ExampleComponent } from '../../common/example/example.component';
import {
  CodeComponent,
  PropsListComponent,
  PropsListItemComponent
} from '../../common/props-list/props-list';

const markup = `
<pdk-alert icon="true" type="warning">
  An <strong>important</strong> message for users.
</pdk-alert>
`;

@Component({
  selector: 'docs-alert',
  template: `
    <docs-example-header origin="CPP">
      <span pdk-typography="caption-xlarge">Components</span>
      <h1 pdk-typography="heading-xlarge">Alert</h1>
    </docs-example-header>
    <p pdk-typography="body">
      The alert component shows important notices to the user in the form of banners.
    </p>

    <!-- Example -->

    <h2 pdk-typography="heading-large">Example</h2>

    <docs-example [html]="html">
      <pdk-alert icon="true" type="warning">
        An <strong>important</strong> message for users.
      </pdk-alert>
    </docs-example>

    <!-- Api -->

    <h2 pdk-typography="heading-large">Api</h2>
    <p pdk-typography="body">
      To use this component, add <code docs-code>PdkAlertComponent</code> to your list of ngModule
      or standalone imports.
    </p>

    <h3 pdk-typography="heading-medium">pdk-alert</h3>
    <docs-props-list>
      <docs-props-list-item name="ng-content" type="node">
        The content for the component.
      </docs-props-list-item>
      <docs-props-list-item
        name="type"
        type="enum: warning | success | notice | secure"
        defaultValue="warning"
      >
        The contextual type of the alert's message.
      </docs-props-list-item>
      <docs-props-list-item name="container" type="boolean" defaultValue="false">
        If <code docs-code>true</code>, displays the <code docs-code>ng-content</code> inside a
        container that respects the maximum content width of the application.
      </docs-props-list-item>
      <docs-props-list-item name="icon" type="boolean" defaultValue="false">
        If <code docs-code>true</code>, an accompanying icon will be displayed according to the
        <code docs-code>type</code>.
      </docs-props-list-item>
    </docs-props-list>
  `,
  imports: [
    HeaderComponent,
    PdkTypographyDirective,
    ExampleComponent,
    AlertComponent_1,
    CodeComponent,
    PropsListComponent,
    PropsListItemComponent
  ]
})
export class AlertComponent {
  html = markup;
}
