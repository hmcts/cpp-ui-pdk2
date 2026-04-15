import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { PdkListDirective } from '../core/lists';
import { PdkMarginDirective, PdkPaddingDirective } from '../core/spacing';

import { PdkLinkDirective } from '../core/links';
import { PdkVisuallyHiddenDirective } from '../core/accessibility';

@Component({
  selector: 'pdk-pager',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="pdk-pager" role="navigation" aria-label="Pagination">
      <ul pdk-list class="pdk-pager__list" pdk-margin="0">
        @if (currentPage > 1) {
        <li>
          <a
            pdk-link
            class="pdk-pager__link"
            href="javascript:void(0)"
            rel="prev"
            (click)="pageChange.emit(currentPage - 1)"
          >
            <div class="pdk-pager__link-title">
              <svg xmlns="http://www.w3.org/2000/svg" height="13" width="17" viewBox="0 0 17 13">
                <path
                  d="m6.5938-0.0078125-6.7266 6.7266 6.7441 6.4062 1.377-1.449-4.1856-3.9768h12.896v-2h-12.984l4.2931-4.293-1.414-1.414z"
                ></path>
              </svg>
              <span class="pdk-pager__link-text">Previous page</span>
              <span pdk-visually-hidden>:</span>
            </div>
            <span class="pdk-pager__link-label">{{ currentPage - 1 }} of {{ totalPages }}</span>
          </a>
        </li>
        } @if (currentPage < totalPages) {
        <li>
          <a
            pdk-link
            href="javascript:void(0)"
            class="pdk-pager__link"
            rel="next"
            (click)="pageChange.emit(currentPage + 1)"
          >
            <div pdk-padding-top="2" class="pdk-pager__link-title">
              <svg xmlns="http://www.w3.org/2000/svg" height="13" width="17" viewBox="0 0 17 13">
                <path
                  d="m10.107-0.0078125-1.4136 1.414 4.2926 4.293h-12.986v2h12.896l-4.1855 3.9766 1.377 1.4492 6.7441-6.4062-6.7246-6.7266z"
                ></path>
              </svg>
              <span class="pdk-pager__link-text">Next page</span> <span pdk-visually-hidden>:</span>
            </div>
            <span class="pdk-pager__link-label">{{ currentPage + 1 }} of {{ totalPages }}</span>
          </a>
        </li>
        }
      </ul>
    </nav>
  `,
  styleUrls: ['./pager.scss'],
  imports: [
    PdkListDirective,
    PdkMarginDirective,
    PdkLinkDirective,
    PdkVisuallyHiddenDirective,
    PdkPaddingDirective
  ]
})
export class PdkPagerComponent {
  @Input() currentPage = 1;
  @Input() totalPages = 1;
  @Output() pageChange = new EventEmitter<number>();
}
