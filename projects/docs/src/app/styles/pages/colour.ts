import { Component } from '@angular/core';
import { PdkTypographyDirective, PdkLinkDirective, PdkMarginDirective } from '@cpp/pdk';

import { SwatchRowComponent } from '../../common/swatch/swatch-row.component';
import {
  PropsListComponent,
  PropsListItemComponent,
  CodeComponent
} from '../../common/props-list/props-list';

@Component({
  selector: 'docs-colour',
  template: `
    <span pdk-typography="caption-xlarge">Styles</span>
    <h1 pdk-typography="heading-xlarge">Colour</h1>
    <p pdk-typography="body-medium">Always use the colour palette below.</p>

    <!-- Example -->

    <h2 pdk-typography="heading-large">Colour contrast</h2>
    <p pdk-typography="body-medium">
      You must make sure that the contrast ratio of text and interactive elements in your service
      meets
      <a
        pdk-link
        href="https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html"
        >level AA of the Web Content Accessibility Guidelines (WCAG 2.0)</a
      >.
    </p>

    <h2 pdk-typography="heading-large">Colour palette</h2>
    <p pdk-typography="body">If you need to use tints of this palette, use either 25% or 50%.</p>

    <div pdk-margin-bottom="6">
      @for (color of colors; let index = $index; track index) {
      <docs-swatch-row [color]="color"></docs-swatch-row>
      }
    </div>

    <h2 pdk-typography="heading-large">Api</h2>
    <h3 pdk-typography="heading-medium">[pdk-text-colour]</h3>
    <p pdk-typography="body">Applies the colour to text.</p>
    <docs-props-list [propWidth]="150">
      <docs-props-list-item name="pdk-text-colour" type="enum: colour">
        The name of the colour from the colour palette.
      </docs-props-list-item>
      <docs-props-list-item name="tint" type="enum: 0 | 25 | 50" defaultValue="0">
        The tint % by which to lighten the <code docs-code>pdk-text-colour</code>.
      </docs-props-list-item>
      <docs-props-list-item name="pdk-text-hover-colour" type="enum: colour">
        The name of the colour from the colour palette to be applied when text element is hovered.
      </docs-props-list-item>
    </docs-props-list>
    <h3 pdk-typography="heading-medium">[pdk-fill-colour]</h3>
    <p pdk-typography="body">Applies the colour as a background fill.</p>
    <docs-props-list [propWidth]="150">
      <docs-props-list-item name="pdk-fill-colour" type="enum: colour">
        The name of the colour from the colour palette.
      </docs-props-list-item>
      <docs-props-list-item name="tint" type="enum: 0 | 25 | 50" defaultValue="0">
        The tint % by which to lighten the <code docs-code>pdk-text-colour</code>.
      </docs-props-list-item>
      <docs-props-list-item name="pdk-fill-hover-colour" type="enum: colour">
        The name of the colour from the colour palette to be applied when element is hovered.
      </docs-props-list-item>
    </docs-props-list>
    <h3 pdk-typography="heading-medium">[pdk-border-colour]</h3>
    <p pdk-typography="body">Applies the colour to a border.</p>
    <docs-props-list [propWidth]="150">
      <docs-props-list-item name="pdk-border-colour" type="enum: colour">
        The name of the colour from the colour palette.
      </docs-props-list-item>
      <docs-props-list-item name="tint" type="enum: 0 | 25 | 50" defaultValue="0">
        The tint % by which to lighten the <code docs-code>pdk-text-colour</code>.
      </docs-props-list-item>
    </docs-props-list>
  `,
  imports: [
    PdkTypographyDirective,
    PdkLinkDirective,
    PdkMarginDirective,
    SwatchRowComponent,
    PropsListComponent,
    PropsListItemComponent,
    CodeComponent
  ]
})
export class ColourComponent {
  colors = [
    'red',
    'yellow',
    'green',
    'blue',
    'dark-blue',
    'light-blue',
    'purple',
    'black',
    'dark-grey',
    'mid-grey',
    'light-grey',
    'white',
    'light-purple',
    'bright-purple',
    'pink',
    'light-pink',
    'orange',
    'brown',
    'light-green',
    'turquoise'
  ];
}
