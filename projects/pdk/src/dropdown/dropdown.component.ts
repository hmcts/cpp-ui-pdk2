import { Component, Directive, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { generateId } from '../util';
import { PdkInteractionContainerComponent } from '../core/interaction';
import { PdkLinkDirective } from '../core/links';
import { PdkBorderColorDirective } from '../core/colour';

@Directive({ selector: 'pdk-dropdown-nav-item' })
export class PdkDropdownItemDirective {
  @HostBinding('attr.role') role = 'listitem';
  @HostBinding('class.pdk-dropdown__navigation-item') navItem = true;
}

@Component({
  selector: 'pdk-dropdown',
  template: `
    <pdk-interaction-container (blur)="toggled = false">
      <a
        [attr.aria-controls]="id + '-menu'"
        [attr.aria-expanded]="toggled ? true : null"
        class="pdk-dropdown__nav-submenu-toggle"
        [class.pdk-dropdown__nav-submenu-toggle--open]="toggled"
        [id]="id + '-toggle'"
        href="javascript:void(0)"
        pdk-link
        (click)="toggled = !toggled"
        >{{ name }}</a
      >
      <div
        [attr.aria-labelledby]="id + '-toggle'"
        class="pdk-dropdown__nav-submenu"
        [class.pdk-dropdown__nav-submenu--right]="menuAlignment === 'right'"
        [id]="id + '-menu'"
        pdk-border-colour="light-grey"
        role="list"
        [hidden]="!toggled"
        (click)="handleClickElement($event)"
      >
        <ng-content></ng-content>
      </div>
    </pdk-interaction-container>
  `,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./dropdown.scss'],
  imports: [PdkInteractionContainerComponent, PdkLinkDirective, PdkBorderColorDirective]
})
export class PdkDropdownComponent {
  @Input() name: string;
  @Input() menuAlignment: 'left' | 'right' = 'left';

  id = generateId('pdk-dropdown');
  toggled = false;

  handleClickElement(event: MouseEvent) {
    if ((event.target as Element).tagName === 'A') {
      this.toggled = false;
    }
  }
}
