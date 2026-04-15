import { Component } from '@angular/core';
import {
  PdkMastheadComponent,
  PdkGridComponent,
  PdkGridDirective,
  PdkTypographyDirective,
  PdkTextColorDirective,
  PdkMarginDirective,
  PdkSectionBreakDirective,
  PdkLinkDirective
} from '@cpp/pdk';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'docs-home',
  template: `
    <pdk-masthead>
      <pdk-grid container>
        <pdk-grid two-thirds>
          <h1 pdk-typography="heading-xlarge" pdk-text-colour="white" pdk-margin-bottom="6">
            Design your service using Angular
          </h1>
          <p pdk-typography="body-large" pdk-text-colour="white">
            Use this library to make your service consistent with CPP and GOV.UK. Learn from the
            research and experience of other service teams and avoid repeating work that’s already
            been done.
          </p>
        </pdk-grid>
      </pdk-grid>
    </pdk-masthead>
    <div pdk-section="xlarge">
      <pdk-grid container pdk-typography="body-medium">
        <pdk-grid one-third pdk-margin-bottom="8">
          <h2 pdk-typography="heading-large">Styles</h2>
          <p>
            Make your service look like GOV.UK with guides for applying layout, typography, colour
            and images.
          </p>
          <a pdk-link routerLink="/styles"><b>Browse styles</b></a>
        </pdk-grid>
        <pdk-grid one-third pdk-margin-bottom="8">
          <h2 pdk-typography="heading-large">Components</h2>
          <p>
            Save time with reusable, accessible components for forms, navigation, panels, tables and
            more.
          </p>
          <a pdk-link routerLink="/components"><b>Browse components</b></a>
        </pdk-grid>
        <pdk-grid one-third pdk-margin-bottom="8">
          <h2 pdk-typography="heading-large">Patterns</h2>
          <p>
            Help users complete common tasks like building forms and creating comprehensive layouts.
          </p>
          <a pdk-link routerLink="/components"><b>Browse patterns</b></a>
        </pdk-grid>
      </pdk-grid>
    </div>
  `,
  imports: [
    PdkMastheadComponent,
    PdkGridComponent,
    PdkGridDirective,
    PdkTypographyDirective,
    PdkTextColorDirective,
    PdkMarginDirective,
    PdkSectionBreakDirective,
    PdkLinkDirective,
    RouterLink
  ]
})
export class HomeComponent {}
