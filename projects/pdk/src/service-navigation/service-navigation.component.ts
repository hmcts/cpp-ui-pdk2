import {
  Component,
  Directive,
  HostBinding,
  Input,
  Optional,
  ViewEncapsulation
} from '@angular/core';
import { coerceBooleanProperty } from '../util';

@Component({
  selector: 'nav[pdk-service-nav]',
  template: `
    <div class="govuk-service-navigation" [class.pdk-service-nav-clear]="clear">
      <div class="govuk-service-navigation__container">
        <div class="govuk-service-navigation__wrapper">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./service-navigation.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PdkServiceNavigationComponent {
  @HostBinding('class.govuk-template--rebranded') nav = true;

  @Input()
  set clear(val: boolean) {
    this._clear = coerceBooleanProperty(val);
  }
  get clear() {
    return this._clear;
  }
  @HostBinding('attr.aria-label')
  @Input()
  ariaLabel = 'Menu';

  private _clear = false;
}

@Directive({ selector: 'ul[pdk-service-nav-list]' })
export class PdkServiceNavigationListDirective {
  @HostBinding('class.govuk-service-navigation__list')
  get className(): boolean {
    return Boolean(this.serviceNavigation);
  }

  constructor(@Optional() private serviceNavigation: PdkServiceNavigationComponent) {}
}

@Directive({ selector: 'li[pdk-service-nav-list-item]' })
export class PdkServiceNavigationListItemDirective {
  @HostBinding('class.pdk-service-nav-list-item') navItem = true;
  @HostBinding('class.govuk-service-navigation__item')
  get className(): boolean {
    return Boolean(this.serviceNavigation);
  }

  @Input()
  @HostBinding('class.govuk-service-navigation__item--active')
  selected = false;

  constructor(@Optional() private serviceNavigation: PdkServiceNavigationComponent) {}
}

@Directive({ selector: 'a[pdk-service-nav-list-link]' })
export class PdkServiceNavigationListLinkDirective {
  @HostBinding('class.govuk-service-navigation__link')
  get className(): boolean {
    return Boolean(this.serviceNavigation);
  }

  constructor(@Optional() private serviceNavigation: PdkServiceNavigationComponent) {}
}
