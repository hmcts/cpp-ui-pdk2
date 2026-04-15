import { Component } from '@angular/core';
import { HeaderComponent } from '../../common/example-header/example-header';
import {
  PdkTypographyDirective,
  PdkActionDetailsComponent as ActionDetailsComponent_1,
  PdkActionDetailsSelectorsDirective,
  PdkLinkDirective
} from '@cpp/pdk';
import { ExampleComponent } from '../../common/example/example.component';
import {
  CodeComponent,
  PropsListComponent,
  PropsListItemComponent
} from '../../common/props-list/props-list';

const markup = `
<pdk-action-details highlighted="true">
  <pdk-action-title>Your nationality has been recorded</pdk-action-title>
  <pdk-action-body>
    We need to know your nationality so we can work out which elections you’re entitled to
    vote in. If you cannot provide your nationality, you’ll have to send copies of identity
    documents through the post.
  </pdk-action-body>
  <pdk-action-options> <a pdk-link href="#">Amend</a> </pdk-action-options>
</pdk-action-details>
`;

@Component({
  selector: 'docs-action-details',
  template: `
    <docs-example-header origin="CPP">
      <span pdk-typography="caption-xlarge">Components</span>
      <h1 pdk-typography="heading-xlarge">Action details</h1>
    </docs-example-header>
    <p pdk-typography="body">
      Use this component as a summary for content saved as part of a workflow.
    </p>

    <!-- Example -->

    <h2 pdk-typography="heading-large">Example</h2>

    <docs-example [html]="html">
      <pdk-action-details highlighted="true">
        <pdk-action-title>Your nationality has been recorded</pdk-action-title>
        <pdk-action-body>
          We need to know your nationality so we can work out which elections you’re entitled to
          vote in. If you cannot provide your nationality, you’ll have to send copies of identity
          documents through the post.
        </pdk-action-body>
        <pdk-action-options> <a pdk-link href="javascript:void(0)">Amend</a> </pdk-action-options>
      </pdk-action-details>
    </docs-example>

    <!-- Api -->

    <h2 pdk-typography="heading-large">Api</h2>
    <p pdk-typography="body">
      To use this component, add <code docs-code>PdkAction</code> to your list of ngModule or
      standalone imports.
    </p>

    <h3 pdk-typography="heading-medium">pdk-action-details</h3>
    <docs-props-list>
      <docs-props-list-item name="highlighted" type="boolean" defaultValue="false">
        If <code docs-code>true</code>, the action will appear with the
        <code docs-code>highlightedLabel</code>.
      </docs-props-list-item>
      <docs-props-list-item name="highlightedLabel" type="string" defaultValue="Saved">
        The text for the highlighted label.
      </docs-props-list-item>
    </docs-props-list>

    <h3 pdk-typography="heading-medium">pdk-action-title</h3>
    <docs-props-list>
      <docs-props-list-item name="ng-content" type="node">
        The title content for the <code docs-code>pdk-action-details</code>.
      </docs-props-list-item>
    </docs-props-list>

    <h3 pdk-typography="heading-medium">pdk-action-content</h3>
    <docs-props-list>
      <docs-props-list-item name="ng-content" type="node">
        The body content for the <code docs-code>pdk-action-details</code>.
      </docs-props-list-item>
    </docs-props-list>

    <h3 pdk-typography="heading-medium">pdk-action-options</h3>
    <docs-props-list>
      <docs-props-list-item name="ng-content" type="node">
        The options content for the <code docs-code>pdk-action-details</code>.
      </docs-props-list-item>
    </docs-props-list>
  `,
  imports: [
    HeaderComponent,
    PdkTypographyDirective,
    ExampleComponent,
    ActionDetailsComponent_1,
    PdkActionDetailsSelectorsDirective,
    PdkLinkDirective,
    CodeComponent,
    PropsListComponent,
    PropsListItemComponent
  ]
})
export class ActionDetailsComponent {
  html = markup;
}
