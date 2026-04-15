import { Component } from '@angular/core';
import { navSections } from '../components.navigation';
import { PdkTypographyDirective, PdkMobileDirective } from '@cpp/pdk';
import { MobileSidebarComponent } from '../../common/sidebar-mobile/sidebar-mobile';

@Component({
  selector: 'docs-components-overview',
  template: `
    <h1 pdk-typography="heading-xlarge">Components</h1>
    <p pdk-typography="body-medium">
      Components are reusable parts of the user interface that have been made to support a variety
      of applications.
    </p>
    <p pdk-typography="body-medium">
      Individual components can be used in multiple different patterns and contexts. For example,
      the text input component can be used to ask for an email address, a National Insurance number
      or someone’s name.
    </p>
    <docs-mobile-sidebar pdk-mobile [navSections]="navSections"></docs-mobile-sidebar>
  `,
  imports: [PdkTypographyDirective, MobileSidebarComponent, PdkMobileDirective]
})
export class OverviewComponent {
  navSections = navSections;
}
