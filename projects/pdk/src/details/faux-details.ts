import { Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'button[pdk-faux-details]',
  template: ` <span class="pdk-faux-details__text"> <ng-content></ng-content> </span> `,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./faux-details.scss']
})
export class PdkFauxDetailsComponent {
  @HostBinding('attr.aria-controls') @Input() targetId: string;
  @HostBinding('attr.aria-expanded')
  get ariaExpanded() {
    return this.expanded;
  }
  @HostBinding('class.pdk-faux-details') details = true;
  @HostBinding('class.pdk-faux-details--open')
  get open() {
    return this.expanded;
  }
  @Input() expanded = false;
}
