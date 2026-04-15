import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { NavSection } from '../common.interfaces';
import { PdkMobileDirective } from '@cpp/pdk';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'docs-sidebar-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="docs-sidebar-layout">
      <div class="docs-sidebar-layout__sidebar" pdk-mobile="false">
        <docs-sidebar [navSections]="navSections"></docs-sidebar>
      </div>
      <div class="docs-sidebar-layout__content"><ng-content></ng-content></div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./sidebar-layout.scss'],
  imports: [PdkMobileDirective, SidebarComponent]
})
export class SidebarLayoutComponent {
  @Input() navSections: NavSection[] = [];
}
