import { Component } from '@angular/core';
import { HeaderComponent } from '../../common/example-header/example-header';
import {
  PdkTypographyDirective,
  PdkFoldableTextComponent as FoldableTextComponent_1
} from '@cpp/pdk';
import { ExampleComponent } from '../../common/example/example.component';
import {
  CodeComponent,
  PropsListComponent,
  PropsListItemComponent
} from '../../common/props-list/props-list';

const markup = `
<pdk-foldable-text>
  Sed porttitor lectus nibh. Donec sollicitudin molestie malesuada. Vestibulum ante ipsum
  primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor
  sit amet aliquam vel, ullamcorper sit amet ligula.
</pdk-foldable-text>
`;

@Component({
  selector: 'docs-foldable-text',
  template: `
    <docs-example-header origin="CPP">
      <span pdk-typography="caption-xlarge">Components</span>
      <h1 pdk-typography="heading-xlarge">Foldable text</h1>
    </docs-example-header>
    <p pdk-typography="body">
      Use this component to truncate passages of a text to a single line with an ellipsis, which can
      be expanded and collapsed.
    </p>

    <!-- Example -->

    <h2 pdk-typography="heading-large">Example</h2>

    <docs-example [html]="html">
      <pdk-foldable-text>
        Sed porttitor lectus nibh. Donec sollicitudin molestie malesuada. Vestibulum ante ipsum
        primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor
        sit amet aliquam vel, ullamcorper sit amet ligula.
      </pdk-foldable-text>
    </docs-example>

    <!-- Api -->

    <h2 pdk-typography="heading-large">Api</h2>
    <p pdk-typography="body">
      To use this component, add <code docs-code>PdkFoldableTextComponent</code> to your list of
      ngModule/ standalone component imports.
    </p>

    <h3 pdk-typography="heading-medium">pdk-foldable-text</h3>
    <docs-props-list>
      <docs-props-list-item name="ng-content" type="node">
        The content for the component.
      </docs-props-list-item>
      <docs-props-list-item name="ariaMoreLabel" type="string">
        An accessible label for when the text can be unfolded.
      </docs-props-list-item>
      <docs-props-list-item name="ariaLessLabel" type="string">
        An accessible label for when the text can be folded.
      </docs-props-list-item>
      <docs-props-list-item name="expanded" type="boolean" defaultValue="false">
        When <code docs-code>true</code> sets the text as unfolded.
      </docs-props-list-item>
      <docs-props-list-item name="expandedChange" type="expression">
        An expression executed when the folded state changes.
      </docs-props-list-item>
      <docs-props-list-item name="overflow" type="expression">
        An expression executed when the text either has overflowing or not.
      </docs-props-list-item>
    </docs-props-list>
  `,
  imports: [
    HeaderComponent,
    PdkTypographyDirective,
    ExampleComponent,
    FoldableTextComponent_1,
    CodeComponent,
    PropsListComponent,
    PropsListItemComponent
  ]
})
export class FoldableTextComponent {
  html = markup;
}
