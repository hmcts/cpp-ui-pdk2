import { Component } from '@angular/core';
import { HeaderComponent } from '../../common/example-header/example-header';
import {
  PdkTypographyDirective,
  PdkContextPanelComponent as ContextPanelComponent_1
} from '@cpp/pdk';
import { ExampleComponent } from '../../common/example/example.component';
import {
  CodeComponent,
  PropsListComponent,
  PropsListItemComponent
} from '../../common/props-list/props-list';

const markup = `
<pdk-context-panel title="Upload completed">
  File is being processed
</pdk-context-panel>
`;

@Component({
  selector: 'docs-context-panel',
  template: `
    <docs-example-header origin="CPP">
      <span pdk-typography="caption-xlarge">Components</span>
      <h1 pdk-typography="heading-xlarge">Context panel</h1>
    </docs-example-header>
    <p pdk-typography="body">
      The context panel component is a visible container used on confirmation or results pages to
      highlight important content using a visual aide.
    </p>

    <!-- Example -->

    <h2 pdk-typography="heading-large">Example</h2>

    <docs-example [html]="html">
      <pdk-context-panel icon="tick" title="Your zip file is being checked for errors">
        Check back in 24 hours to find out if it's been successfully sent to court
      </pdk-context-panel>
    </docs-example>

    <!-- Api -->

    <h2 pdk-typography="heading-large">Api</h2>
    <p pdk-typography="body">
      To use this component, add <code docs-code>PdkContextPanelComponent</code> to your list of
      ngModule/ standalone imports.
    </p>

    <h3 pdk-typography="heading-medium">pdk-context-panel</h3>
    <docs-props-list>
      <docs-props-list-item
        name="type"
        type="enum: success | active | confirmation | pending | notice | invalid | important | de-registered"
        defaultValue="success"
      >
        The contextual type of the context panel.
      </docs-props-list-item>
      <docs-props-list-item name="icon" type="enum: tick | warn" defaultValue="undefined">
        The type of icon, the icon will be shown only if it is set
      </docs-props-list-item>
      <docs-props-list-item name="title" type="string"> The title text</docs-props-list-item>
      <docs-props-list-item name="ng-content" type="node">
        The content for the component.
      </docs-props-list-item>
    </docs-props-list>
  `,
  imports: [
    HeaderComponent,
    PdkTypographyDirective,
    ExampleComponent,
    ContextPanelComponent_1,
    CodeComponent,
    PropsListComponent,
    PropsListItemComponent
  ]
})
export class ContextPanelComponent {
  html = markup;
}
