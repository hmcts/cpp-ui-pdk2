import { Component } from '@angular/core';
import { PdkCore } from '@cpp/pdk';
import { ExampleComponent } from '../../common/example/example.component';
import { PropsListComponent, PropsListItemComponent } from '../../common/props-list/props-list';

const html = `
<h1 pdk-typography="heading-xlarge">Heading (extra large)</h1>
<h2 pdk-typography="heading-large">Heading (large)</h1>
<h3 pdk-typography="heading-medium">Heading (medium)</h1>
<h4 pdk-typography="heading-small">Heading (small)</h1>
<span pdk-typography="caption-xlarge">Caption (extra large)</span>
<span pdk-typography="caption-xlarge">Caption (large)</span>
<span pdk-typography="caption-xlarge">Caption (medium)</span>
<span pdk-typography="body-large">Body (large)</span>
<span pdk-typography="body-medium">Body (medium)</span>
<span pdk-typography="body-small">Body (small)</span>
<span pdk-typography="body-body">Body</span>
<span pdk-typography="body-xsmall">Body (extra small)</span>
<span pdk-typography="body-lead">Body (lead)</span>
<a pdk-link href="#">Link</a>
`;

@Component({
  selector: 'docs-typography',
  template: `
    <span pdk-typography="caption-xlarge">Styles</span>
    <h1 pdk-typography="heading-xlarge">Typography</h1>
    <p pdk-typography="body-medium">
      The usage guidelines and related research for this component can be found
      <a pdk-link href="https://design-system.service.gov.uk/styles/typography">here</a>.
    </p>

    <!-- Example -->

    <h2 pdk-typography="heading-large">Example</h2>

    <docs-example [html]="html">
      <h1 pdk-typography="heading-xlarge">Heading (extra large)</h1>
      <h2 pdk-typography="heading-large">Heading (large)</h2>
      <h3 pdk-typography="heading-medium">Heading (medium)</h3>
      <h4 pdk-typography="heading-small">Heading (small)</h4>
      <span pdk-typography="caption-xlarge">Caption (extra large)</span>
      <span pdk-typography="caption-xlarge">Caption (large)</span>
      <span pdk-typography="caption-xlarge" style="display: block" pdk-margin-bottom="4"
        >Caption (medium)</span
      >
      <span pdk-typography="body-lead" style="display: block">Body (lead)</span>
      <span pdk-typography="body-medium" style="display: block">Body (medium)</span>
      <span pdk-typography="body-small" style="display: block">Body (small)</span>
      <span pdk-typography="body-xsmall" style="display: block">Body (extra small)</span>
      <span pdk-typography="body-body" style="display: block">Body</span> <br />
      <a pdk-link href="javascript:void(0)">Link</a>
    </docs-example>

    <!-- Api -->

    <h2 pdk-typography="heading-large">Api</h2>

    <h3 pdk-typography="heading-medium">pdk-typography</h3>
    <docs-props-list>
      <docs-props-list-item name="pdk-typgography" type="enum" defaultValue="body">
        The preset style to use, as per the example HTML above.
      </docs-props-list-item>
    </docs-props-list>

    <h3 pdk-typography="heading-medium">a[pdk-link]</h3>
    <docs-props-list>
      <docs-props-list-item name="muted" type="boolean" defaultValue="false">
        Styles the link with a muted effect.
      </docs-props-list-item>
      <docs-props-list-item name="outlined" type="boolean" defaultValue="false">
        Styles the focused effect of the link with an outline rather than block fill.
      </docs-props-list-item>
      <docs-props-list-item name="text" type="boolean" defaultValue="false">
        Force the link to inherit the text colour from its parent.
      </docs-props-list-item>
      <docs-props-list-item name="unvisited" type="boolean" defaultValue="false">
        Prevent the darker visited style from being applied after a user has visited the link
        destination.
      </docs-props-list-item>
    </docs-props-list>
  `,
  imports: [PdkCore, ExampleComponent, PropsListComponent, PropsListItemComponent]
})
export class TypographyComponent {
  html = html;
}
