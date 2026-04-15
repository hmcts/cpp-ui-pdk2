import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { getCalendarMonth } from './date-picker.util';
import { PdkPaddingDirective, PdkMarginDirective } from '../core/spacing';
import { PdkTypographyDirective } from '../core/typography';

@Component({
  selector: 'pdk-date-picker-navigation',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="date-picker-navigation"
      [class.date-picker-navigation_justify-between]="!inYearView"
      [class.date-picker-navigation_justify-center]="inYearView"
    >
      @if (!inYearView) {
      <div
        role="button"
        class="date-picker-navigation__arrow"
        [attr.aria-label]="prevLabel"
        [attr.aria-disabled]="prevDisabled"
        [class.date-picker-navigation_arrow--disabled]="prevDisabled"
        [attr.tabindex]="prevDisabled ? null : 0"
        (click)="handlePrev()"
        (keyup.enter)="handlePrev()"
      >
        <i class="date-picker-navigation__arrow-icon">
          <svg
            class="pdk-pager__link-icon"
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            width="20"
            viewBox="0 0 17 13"
          >
            <path
              d="m6.5938-0.0078125-6.7266 6.7266 6.7441 6.4062 1.377-1.449-4.1856-3.9768h12.896v-2h-12.984l4.2931-4.293-1.414-1.414z"
            ></path>
          </svg>
        </i>
      </div>
      }
      <div class="date-picker-navigation__month_and_year" pdk-padding-horizontal="2">
        <strong pdk-typography="body-small" pdk-margin-bottom="0"
          ><b
            >{{ calendarMonth }}
            <span
              class="date-picker-navigation__year"
              role="button"
              [attr.aria-label]="yearLabel"
              [attr.tabindex]="0"
              (click)="toggleYear.emit()"
              (keyup.enter)="toggleYear.emit()"
              >{{ calendarYear }}

              <span
                [class.date-picker-navigation__year_closed]="!inYearView"
                [class.date-picker-navigation__year_opened]="inYearView"
              ></span>
            </span> </b
        ></strong>
      </div>
      @if (!inYearView) {
      <div
        role="button"
        class="date-picker-navigation__arrow"
        [attr.aria-disabled]="nextDisabled"
        [class.date-picker-navigation_arrow--disabled]="nextDisabled"
        [attr.aria-label]="nextLabel"
        [attr.tabindex]="nextDisabled ? null : 0"
        (click)="handleNext()"
        (keyup.enter)="handleNext()"
      >
        <i class="date-picker-navigation__arrow-icon">
          <svg
            class="pdk-pager__link-icon"
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            width="20"
            viewBox="0 0 17 13"
          >
            <path
              d="m10.107-0.0078125-1.4136 1.414 4.2926 4.293h-12.986v2h12.896l-4.1855 3.9766 1.377 1.4492 6.7441-6.4062-6.7246-6.7266z"
            ></path>
          </svg>
        </i>
      </div>
      }
    </div>
  `,
  styleUrls: ['./date-picker-navigation.scss'],
  imports: [PdkPaddingDirective, PdkTypographyDirective, PdkMarginDirective]
})
export class PdkDatePickerNavigationComponent {
  @Input() visibleDate!: Date | string | number;
  @Input() nextDisabled = false;
  @Input() prevDisabled = false;
  @Input() inYearView = false;
  @Output() prevMonth = new EventEmitter<void>();
  @Output() nextMonth = new EventEmitter<void>();
  @Output() toggleYear = new EventEmitter<void>();

  get calendarMonth(): string {
    return getCalendarMonth(this.visibleDate);
  }

  get calendarYear(): number {
    return new Date(this.visibleDate).getFullYear();
  }

  get prevLabel() {
    return `Jump to previous month${this.prevDisabled ? ' (unavailable)' : ''}`;
  }

  get nextLabel() {
    return `Jump to next month${this.nextDisabled ? ' (unavailable)' : ''}`;
  }

  get yearLabel() {
    return `Select year. ${this.calendarYear} selected.`;
  }

  handleNext() {
    if (!this.nextDisabled) {
      this.nextMonth.emit();
    }
  }

  handlePrev() {
    if (!this.prevDisabled) {
      this.prevMonth.emit();
    }
  }
}
