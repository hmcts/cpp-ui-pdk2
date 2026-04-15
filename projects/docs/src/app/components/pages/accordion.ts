import { Component } from '@angular/core';
import { HeaderComponent } from '../../common/example-header/example-header';
import {
  PdkTypographyDirective,
  PdkLinkDirective,
  PdkAccordionComponent as AccordionComponent_1,
  PdkAccordionItemComponent
} from '@cpp/pdk';
import { ExampleComponent } from '../../common/example/example.component';
import {
  CodeComponent,
  PropsListComponent,
  PropsListItemComponent
} from '../../common/props-list/props-list';

const markup = `
<pdk-accordion>
  <pdk-accordion-item title="Writing well for the web">
    This is the content for 'Writing well for the web'.
  </pdk-accordion-item>
  <pdk-accordion-item title="Writing well for specialists">
    This is the content for 'Writing well for specialists'.
  </pdk-accordion-item>
  <pdk-accordion-item title="Know your audience">
    This is the content for 'Know your audience'.
  </pdk-accordion-item>
  <pdk-accordion-item title="How people read">
    This is the content for 'Know your audience'.
  </pdk-accordion-item>
</pdk-accordion>
`;

@Component({
  selector: 'docs-accordion',
  template: `
    <docs-example-header origin="GOV.UK">
      <span pdk-typography="caption-xlarge">Components</span>
      <h1 pdk-typography="heading-xlarge">Accordion</h1>
    </docs-example-header>
    <p pdk-typography="body">
      The accordion component lets users show and hide sections of related content on a page. The
      usage guidelines and related research for this component can be found
      <a pdk-link href="https://design-system.service.gov.uk/components/accordion/">here</a>.
    </p>

    <!-- Example -->

    <h2 pdk-typography="heading-large">Example</h2>

    <docs-example [html]="html">
      <pdk-accordion [open]="open">
        <pdk-accordion-item title="Writing well for the web">
          This is the content for 'Writing well for the web'.
        </pdk-accordion-item>
        <pdk-accordion-item title="Writing well for specialists">
          This is the content for 'Writing well for specialists'.
        </pdk-accordion-item>
        <pdk-accordion-item title="Know your audience" summary="Summary for knowing your audience">
          This is the content for 'Know your audience'.
        </pdk-accordion-item>
        <pdk-accordion-item title="How people read" summary="Summary describing how people read">
          This is the content for 'How people read'.
        </pdk-accordion-item>
      </pdk-accordion>
    </docs-example>

    <!-- Api -->

    <h2 pdk-typography="heading-large">Api</h2>
    <p pdk-typography="body">
      The accordion is a <strong>semi-controlled</strong> standalone component, in that the opened
      state of each section is maintained by the component itself, but this state can be overriden
      through an external input.
    </p>
    <p pdk-typography="body">
      To use this component, add <code docs-code>PdkAccordion</code> to your list of ngModule or
      standalone component imports.
    </p>

    <h3 pdk-typography="heading-medium">pdk-accordion</h3>
    <docs-props-list>
      <docs-props-list-item name="controls" type="boolean" defaultValue="true">
        When <code docs-code>true</code> displays the accordion controls for collectively opening
        and closing its items.
      </docs-props-list-item>
      <docs-props-list-item name="open" type="array: number" defaultValue="[]">
        The indexes of those <code docs-code>pdk-accordion-item</code> children to open.
      </docs-props-list-item>
      <docs-props-list-item name="openChange" type="expression">
        An expression invoked with a new <code docs-code>open</code> value when an accordion item is
        toggled.
      </docs-props-list-item>
    </docs-props-list>

    <h3 pdk-typography="heading-medium">pdk-accordion-item</h3>
    <docs-props-list>
      <docs-props-list-item name="ng-content" type="node">
        The collapsable content for the component.
      </docs-props-list-item>

      <docs-props-list-item name="summary" type="string">
        The summary used for helping users understand what is in the content section.
      </docs-props-list-item>

      <docs-props-list-item name="title" type="string">
        The title used for the accordion item's toggle button.
      </docs-props-list-item>

      <docs-props-list-item name="collapseLabel" type="string" defaultValue="Hide">
        The text to show when the accordion item is expanded.
      </docs-props-list-item>
      <docs-props-list-item name="expandLabel" type="string" defaultValue="Show">
        The text to show when the accordion item is collapsed.
      </docs-props-list-item>
    </docs-props-list>
  `,
  imports: [
    HeaderComponent,
    PdkTypographyDirective,
    PdkLinkDirective,
    ExampleComponent,
    AccordionComponent_1,
    PdkAccordionItemComponent,
    CodeComponent,
    PropsListComponent,
    PropsListItemComponent
  ]
})
export class AccordionComponent {
  open = [0, 2];
  html = markup;
}
