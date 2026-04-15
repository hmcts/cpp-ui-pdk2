import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter,
  HostBinding
} from '@angular/core';

import { PdkMarginDirective } from '../core/spacing';
import { PdkLinkDirective } from '../core/links';
@Component({
  selector: 'pdk-pagination',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="pdk-pagination">
      <nav class="govuk-pagination" aria-label="Pagination">
        @if (currentPage > 1) {
        <div class="govuk-pagination__prev">
          <a
            class="govuk-link govuk-pagination__link"
            href="javascript:void(0)"
            aria-label="Go to previous page of results"
            rel="Previous"
            (click)="goToPage(currentPage - 1)"
          >
            <svg
              class="govuk-pagination__icon govuk-pagination__icon--prev"
              xmlns="http://www.w3.org/2000/svg"
              height="13"
              width="15"
              aria-hidden="true"
              focusable="false"
              viewBox="0 0 15 13"
            >
              <path
                d="m6.5938-0.0078125-6.7266 6.7266 6.7441 6.4062 1.377-1.449-4.1856-3.9768h12.896v-2h-12.984l4.2931-4.293-1.414-1.414z"
              ></path>
            </svg>
            <span class="govuk-pagination__link-title"> Prev </span>
          </a>
        </div>
        } @if (currentPage === 1) {
        <div class="pdk-pagination__arrow-placeholder"></div>
        }
        <div class="govuk-pagination__list" pdk-margin-horizontal="1">
          @for (page of pages; track page) {
          <div
            class="govuk-pagination__item"
            [class.govuk-pagination__item--current]="page === currentPage"
            pdk-margin-horizontal="1"
          >
            @if (page === currentPage) {
            <span
              tabindex="0"
              class="pdk-pagination__item__active"
              role="link"
              [attr.aria-label]="'Current page, page ' + page"
              >{{ page }}</span
            >
            } @if (page !== currentPage) {
            <a
              class="govuk-pagination__link"
              href="javascript:void(0)"
              [attr.aria-label]="'Go to page ' + page"
              pdk-link
              (click)="goToPage(page)"
            >
              {{ page }}
            </a>
            }
          </div>
          }
        </div>
        @if (currentPage < lastPage) {
        <div class="govuk-pagination__next">
          <a
            href="javascript:void(0)"
            class="govuk-link govuk-pagination__link"
            aria-label="Go to next page of results"
            rel="Next"
            (click)="goToPage(currentPage + 1)"
          >
            <span class="govuk-pagination__link-title"> Next </span>
            <svg
              class="govuk-pagination__icon govuk-pagination__icon--next"
              xmlns="http://www.w3.org/2000/svg"
              height="13"
              width="15"
              aria-hidden="true"
              focusable="false"
              viewBox="0 0 15 13"
            >
              <path
                d="m8.107-0.0078125-1.4136 1.414 4.2926 4.293h-12.986v2h12.896l-4.1855 3.9766 1.377 1.4492 6.7441-6.4062-6.7246-6.7266z"
              ></path>
            </svg>
          </a>
        </div>
        } @if (currentPage === lastPage) {
        <div class="pdk-pagination__arrow-placeholder"></div>
        }
      </nav>
    </div>
  `,
  styleUrls: ['./pagination.scss'],
  imports: [PdkMarginDirective, PdkLinkDirective]
})
export class PdkPaginationComponent {
  @Input() maxPages?: number;
  @Input() @HostBinding('attr.data-current-page') currentPage = 1;
  @Input() @HostBinding('attr.data-page-size') pageSize!: number;
  @Input() @HostBinding('attr.data-total-results') totalResults!: number;
  @Output() pageChange = new EventEmitter<number>();

  get lastPage(): number {
    return Math.ceil(this.totalResults / this.pageSize);
  }

  get pages(): number[] {
    let pageCount = this.maxPages || 9;
    let pages = [this.currentPage];
    let i = 1;

    while (pageCount > 1) {
      const prevPageCount = pageCount;
      const forward = this.currentPage + i;
      const backward = this.currentPage - i;

      if (backward > 0) {
        pages = [backward, ...pages];
        pageCount--;
      }
      if (forward <= this.lastPage) {
        pages = [...pages, forward];
        pageCount--;
      }
      if (prevPageCount === pageCount) {
        break;
      }
      i++;
    }
    return pages;
  }

  goToPage(page: number) {
    if (page > 0 && page <= this.lastPage) {
      this.pageChange.emit(page);
    }
  }
}
