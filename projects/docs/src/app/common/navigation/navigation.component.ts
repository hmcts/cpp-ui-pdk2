import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { NavItem } from '../common.interfaces';
import { PdkContainerStyleDirective } from '@cpp/pdk';

import { RouterLinkActive, RouterLink } from '@angular/router';

@Component({
  selector: 'docs-navigation',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="docs-navigation" aria-label="Main navigation">
      <pdk-container>
        <ul class="docs-navigation__list">
          @for (navItem of navItems; track navItem.title) {
          <li routerLinkActive="docs-navigation--current-page">
            <a [routerLink]="navItem.routerLink"> {{ navItem.title }} </a>
          </li>
          }
        </ul>
      </pdk-container>
    </nav>
  `,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./navigation.scss'],
  imports: [PdkContainerStyleDirective, RouterLinkActive, RouterLink]
})
export class NavigationComponent {
  @Input() navItems: NavItem[] = [];
}
