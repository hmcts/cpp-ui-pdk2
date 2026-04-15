import { Component } from '@angular/core';
import { HeaderComponent } from '../../common/example-header/example-header';
import {
  PdkTypographyDirective,
  PdkLinkDirective,
  PdkPhaseBannerComponent as PhaseBannerComponent_1
} from '@cpp/pdk';
import {
  CodeComponent,
  PropsListComponent,
  PropsListItemComponent
} from '../../common/props-list/props-list';
import { ExampleComponent } from '../../common/example/example.component';

const markup = `
<pdk-phase-banner type="Alpha">
  This is a new service – your <a pdk-link href="#">feedback</a> will
  help us to improve it.
</pdk-phase-banner>
`;

@Component({
  selector: 'docs-phase-banner',
  template: `
    <docs-example-header origin="GOV.UK">
      <span pdk-typography="caption-xlarge">Components</span>
      <h1 pdk-typography="heading-xlarge">Phase Banner</h1>
    </docs-example-header>

    <p pdk-typography="body">
      Use the phase banner component to show users your service is still being worked on. The usage
      guidelines and related research for this component can be found
      <a pdk-link href="https://design-system.service.gov.uk/components/phase-banner">here</a>.
    </p>

    <!-- Example -->

    <h2 pdk-typography="heading-large">Example</h2>
    <p pdk-typography="body">
      To use this component, add <code docs-code>PdkPhaseBannerComponent</code> to your list of
      ngModule/ standalone component imports.
    </p>

    <docs-example [html]="html">
      <pdk-phase-banner type="Alpha">
        This is a new service – your <a pdk-link href="javascript:void(0)">feedback</a> will help us
        to improve it.
      </pdk-phase-banner>
    </docs-example>

    <!-- Api -->

    <h2 pdk-typography="heading-large">Api</h2>

    <h3 pdk-typography="heading-medium">pdk-phase-banner</h3>
    <docs-props-list>
      <docs-props-list-item name="ng-content" type="node">
        The content for the component.
      </docs-props-list-item>
      <docs-props-list-item name="type" type="string">
        The phase tag for the banner. For example, Alpha or Beta.
      </docs-props-list-item>
    </docs-props-list>
  `,
  imports: [
    HeaderComponent,
    PdkTypographyDirective,
    PdkLinkDirective,
    CodeComponent,
    ExampleComponent,
    PhaseBannerComponent_1,
    PropsListComponent,
    PropsListItemComponent
  ]
})
export class PhaseBannerComponent {
  html = markup;
}
