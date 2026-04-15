import { Component } from '@angular/core';
import { navSections } from '../styles.navigation';
import { PdkCore } from '@cpp/pdk';
import { RouterLink } from '@angular/router';
import { MobileSidebarComponent } from '../../common/sidebar-mobile/sidebar-mobile';

@Component({
  selector: 'docs-styles-overview',
  template: `
    <h1 pdk-typography="heading-xlarge">Styles</h1>
    <p pdk-typography="body">Make your service look and feel like GOV.UK.</p>
    <p pdk-typography="body-medium">
      The components and directives available in this domain are used primarily in support of
      typography and layout, and for repeat behaviours shared by other
      <a pdk-link routerLink="/components">components</a>.
    </p>
    <docs-mobile-sidebar pdk-mobile [navSections]="navSections"></docs-mobile-sidebar>
  `,
  imports: [RouterLink, MobileSidebarComponent, PdkCore]
})
export class OverviewComponent {
  navSections = navSections;
}
