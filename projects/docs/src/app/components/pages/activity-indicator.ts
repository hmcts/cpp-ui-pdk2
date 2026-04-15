import { Component } from '@angular/core';
import { HeaderComponent } from '../../common/example-header/example-header';
import {
  PdkTypographyDirective,
  PdkActivityIndicatorComponent as ActivityIndicatorComponent_1
} from '@cpp/pdk';
import { ExampleComponent } from '../../common/example/example.component';
import { CodeComponent } from '../../common/props-list/props-list';

const markup = `
<p>
  Proin eget tortor risus. Vivamus suscipit tortor eget felis porttitor volutpat. Quisque
  velit nisi, pretium ut lacinia in, elementum id enim. Pellentesque in ipsum id orci porta
  dapibus. Pellentesque in ipsum id orci porta dapibus.
</p>]
<p>
  Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Sed porttitor lectus
  nibh.
</p>
<pdk-activity-indicator></pdk-activity-indicator>
`;

@Component({
  selector: 'docs-activity-indicator',
  template: `
    <docs-example-header origin="CPP">
      <span pdk-typography="caption-xlarge">Components</span>
      <h1 pdk-typography="heading-xlarge">Activity indicator</h1>
    </docs-example-header>
    <p pdk-typography="body">
      Use this component to indicate to the user that an asynchronous action is in progress, and
      that the UI cannot be interacted with.
    </p>

    <!-- Example -->

    <h2 pdk-typography="heading-large">Example</h2>

    <docs-example [html]="html">
      <div style="position: relative; overflow: hidden">
        <p>
          Proin eget tortor risus. Vivamus suscipit tortor eget felis porttitor volutpat. Quisque
          velit nisi, pretium ut lacinia in, elementum id enim. Pellentesque in ipsum id orci porta
          dapibus. Pellentesque in ipsum id orci porta dapibus.
        </p>
        <p>
          Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Sed porttitor lectus
          nibh.
        </p>
        <pdk-activity-indicator></pdk-activity-indicator>
      </div>
    </docs-example>

    <!-- Api -->

    <p pdk-typography="body">
      To use this component, add <code docs-code>PdkActivityIndicatorComponent</code> to your list
      of ngModule or standalone imports.
    </p>
  `,
  styles: [
    `
      pdk-activity-indicator {
        position: absolute;
      }
    `
  ],
  imports: [
    HeaderComponent,
    PdkTypographyDirective,
    ExampleComponent,
    ActivityIndicatorComponent_1,
    CodeComponent
  ]
})
export class ActivityIndicatorComponent {
  html = markup;
}
