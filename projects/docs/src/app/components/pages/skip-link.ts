import { Component } from '@angular/core';
import { HeaderComponent } from '../../common/example-header/example-header';
import {
  PdkTypographyDirective,
  PdkLinkDirective,
  PdkSkipLinkComponent as SkipLinkComponent_1
} from '@cpp/pdk';
import { ExampleComponent } from '../../common/example/example.component';
import {
  CodeComponent,
  PropsListComponent,
  PropsListItemComponent
} from '../../common/props-list/props-list';

const markup = `
<pdk-skip-link target="target-id"></pdk-skip-link>
`;

@Component({
  selector: 'docs-skip-link',
  template: `
    <docs-example-header origin="GOV.UK">
      <span pdk-typography="caption-xlarge">Components</span>
      <h1 pdk-typography="heading-xlarge">Skip link</h1>
    </docs-example-header>
    <p pdk-typography="body">
      Use the skip link component to help keyboard-only users skip to the main content on a page.
      The usage guidelines and related research for this component can be found
      <a pdk-link href="https://design-system.service.gov.uk/components/skip-link">here</a>.
    </p>

    <!-- Example -->

    <h2 pdk-typography="heading-large">Example</h2>

    <docs-example [html]="html">
      To view the skip link component tab to this example, or click inside this example and press
      tab.
      <pdk-skip-link target="target-id"></pdk-skip-link>
    </docs-example>

    <!-- Api -->

    <h2 pdk-typography="heading-large">Api</h2>

    <h3 pdk-typography="heading-medium">pdk-skip-link</h3>
    <p pdk-typography="body">
      To use this component, add <code docs-code>PdkSkipLinkComponent</code> to your list of
      ngModule/ standalone component imports.
    </p>

    <docs-props-list>
      <docs-props-list-item name="target" type="string">
        The element id of the main content to jump to.
      </docs-props-list-item>
    </docs-props-list>
  `,
  imports: [
    HeaderComponent,
    PdkTypographyDirective,
    PdkLinkDirective,
    ExampleComponent,
    SkipLinkComponent_1,
    CodeComponent,
    PropsListComponent,
    PropsListItemComponent
  ]
})
export class SkipLinkComponent {
  html = markup;
}
