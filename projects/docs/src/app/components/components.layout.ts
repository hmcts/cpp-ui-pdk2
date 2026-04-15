import { Component } from '@angular/core';
import { navSections } from './components.navigation';
import { SidebarLayoutComponent } from '../common/sidebar-layout/sidebar-layout.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'docs-components-layout',
  template: `
    <docs-sidebar-layout [navSections]="navSections">
      <router-outlet></router-outlet>
    </docs-sidebar-layout>
  `,
  imports: [SidebarLayoutComponent, RouterOutlet]
})
export class LayoutComponent {
  navSections = navSections;
}
