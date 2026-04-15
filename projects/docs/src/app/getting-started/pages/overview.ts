import { Component } from '@angular/core';
import { navSections } from '../getting-started.navigation';
import { PdkTypographyDirective, PdkLinkDirective, PdkMobileDirective } from '@cpp/pdk';
import { MobileSidebarComponent } from '../../common/sidebar-mobile/sidebar-mobile';

@Component({
  selector: 'docs-getting-started-overview',
  template: `
    <h1 pdk-typography="heading-xlarge">Getting started</h1>
    <p pdk-typography="body-medium">
      The Platform Development Kit is built upon the
      <a pdk-link href="https://design-system.service.gov.uk">GOV.UK Design System</a>, providing
      angular components that implement the correct construction and expose this through a
      lightweight api to developers.
    </p>
    <p pdk-typography="body-medium">
      The examples in the Platform Development Kit come with code to make it easy for you to use
      them in your project.
    </p>
    <docs-mobile-sidebar pdk-mobile [navSections]="navSections"></docs-mobile-sidebar>
  `,
  imports: [PdkTypographyDirective, PdkLinkDirective, MobileSidebarComponent, PdkMobileDirective]
})
export class OverviewComponent {
  navSections = navSections;
}
