import { Component } from '@angular/core';
import { HeaderComponent } from '../../common/example-header/example-header';
import {
  PdkTypographyDirective,
  PdkLinkDirective,
  PdkArrowLinksComponent,
  PdkArrowLinkComponent as ArrowLinkComponent_1
} from '@cpp/pdk';
import { ExampleComponent } from '../../common/example/example.component';
import {
  CodeComponent,
  PropsListComponent,
  PropsListItemComponent
} from '../../common/props-list/props-list';

const markup = `
  <pdk-arrow-navigation>
        <pdk-arrow-link type="backward" title="Alert">
          Show important notices to the user
        </pdk-arrow-link>
        <pdk-arrow-link type="forward" title="Components">
          Emphasise data to the user
        </pdk-arrow-link>
  </pdk-arrow-navigation>
`;

@Component({
  selector: 'docs-arrow-link',
  template: `
    <docs-example-header origin="GOV.UK">
      <span pdk-typography="caption-xlarge">Components</span>
      <h1 pdk-typography="heading-xlarge">Arrow link</h1>
    </docs-example-header>
    <p pdk-typography="body">
      Use this component, presented as ‘block’ style of pagination, to provide forward and backward
      navigation between related pages belonging to an ordered sequence. usage guidelines and
      related research for this component can be found
      <a pdk-link href="https://design-system.service.gov.uk/components/pagination/">here</a>.
    </p>

    <!-- Example -->

    <h2 pdk-typography="heading-large">Example</h2>

    <docs-example [html]="html">
      <pdk-arrow-navigation>
        <pdk-arrow-link type="backward" title="Alert">
          Show important notices to the user
        </pdk-arrow-link>
        <pdk-arrow-link type="forward" title="Components">
          Emphasise data to the user
        </pdk-arrow-link>
      </pdk-arrow-navigation>
    </docs-example>

    <!-- Api -->

    <h2 pdk-typography="heading-large">Api</h2>
    <p pdk-typography="body">
      Arrow links have their direction set through a <code docs-code>type</code> input parameter.
      Please note that arrow links should be rendered within their navigation container below.
    </p>
    <p pdk-typography="body">
      To use this component, add <code docs-code>PdkArrowLinks</code> to your list of ngModule or
      standalone imports.
    </p>

    <h3 pdk-typography="heading-medium">pdk-arrow-navigation</h3>
    <docs-props-list>
      <docs-props-list-item name="ng-content" type="node">
        The <code docs-code>pdk-arrow-link</code> elements as content.
      </docs-props-list-item>
    </docs-props-list>

    <h3 pdk-typography="heading-medium">pdk-arrow-link</h3>
    <docs-props-list>
      <docs-props-list-item name="ng-content" type="node">
        The descriptive content for the component.
      </docs-props-list-item>
      <docs-props-list-item name="type" type="enum: forward | backward">
        The direction of the arrow.
      </docs-props-list-item>
      <docs-props-list-item name="title" type="string" defaultValue="Next | Previous">
        The primary label for the arrow, which defaults to a value based on the component's
        <code docs-code>type</code>.
      </docs-props-list-item>
      <docs-props-list-item name="linkClick" type="expression">
        The expression invoked when an arrow link is clicked
        <code docs-code>type</code>.
      </docs-props-list-item>
    </docs-props-list>
  `,
  imports: [
    HeaderComponent,
    PdkTypographyDirective,
    PdkLinkDirective,
    ExampleComponent,
    PdkArrowLinksComponent,
    ArrowLinkComponent_1,
    CodeComponent,
    PropsListComponent,
    PropsListItemComponent
  ]
})
export class ArrowLinkComponent {
  html = markup;
}
