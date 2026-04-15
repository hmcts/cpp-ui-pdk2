import { Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { generateId } from '../util/index';

import { PdkVisuallyHiddenDirective } from '../core/accessibility';

@Component({
  selector: 'button[pdk-filter-button]',
  template: `
    <ng-content></ng-content>
    @if (description) {
    <span [attr.id]="id" pdk-visually-hidden>{{ description }}</span>
    }
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style="height: 20px; width: 20px;"
      viewBox="0 -50 320 512"
      fill="#1d70b8"
    >
      <path
        d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
      />
    </svg>
  `,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./filter-button.scss'],
  imports: [PdkVisuallyHiddenDirective]
})
export class PdkFilterButtonComponent {
  @Input() description?: string;
  @HostBinding('attr.aria-describedby')
  get ariaDescribedBy(): string | null {
    return this.description ? this.id : null;
  }
  @HostBinding('class.pdk-filter-button') className = true;

  id = generateId('pdk-filter-button');
}
