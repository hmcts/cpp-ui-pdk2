import { Component } from '@angular/core';
import { navSections } from '../patterns.navigation';
import { PdkTypographyDirective, PdkLinkDirective, PdkMobileDirective } from '@cpp/pdk';
import { RouterLink } from '@angular/router';
import { MobileSidebarComponent } from '../../common/sidebar-mobile/sidebar-mobile';

@Component({
  selector: 'docs-patterns-overview',
  template: `
    <h1 pdk-typography="heading-xlarge">Patterns</h1>
    <p pdk-typography="body">
      Patterns are best practice design solutions for specific user-focused tasks and page types.
    </p>
    <p pdk-typography="body">
      All of the patterns in this section are supported by written guidance and contain coded
      examples where possible.
    </p>
    <p pdk-typography="body">
      Patterns often use one or more <a pdk-link routerLink="/components">components</a> and explain
      how to adapt them to the context.
    </p>
    <docs-mobile-sidebar pdk-mobile [navSections]="navSections"></docs-mobile-sidebar>
  `,
  imports: [
    PdkTypographyDirective,
    PdkLinkDirective,
    RouterLink,
    MobileSidebarComponent,
    PdkMobileDirective
  ]
})
export class OverviewComponent {
  navSections = navSections;
}
