import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  linkedSignal,
  OnInit,
  output,
  signal,
  ViewEncapsulation
} from '@angular/core';
import { timeDiff } from '../date-input/date-input.validators';
import { isSameDay, isWeekend } from './date-picker.util';
import { PdkDatePickerNavigationComponent } from './date-picker-navigation.component';
import { PdkDatePickerGridComponent } from './date-picker-grid.component';
import { PdkDatePickerYearGridComponent } from './date-picker-year-grid.component';
import { PdkVisuallyHiddenDirective } from '../core';

@Component({
  selector: 'pdk-date-picker',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <pdk-date-picker-navigation
      [prevDisabled]="prevDisabled"
      [nextDisabled]="nextDisabled"
      [inYearView]="showYearView"
      [visibleDate]="visibleDate()"
      (prevMonth)="handlePrevMonth()"
      (nextMonth)="handleNextMonth()"
      (toggleYear)="toggleYearView()"
    >
    </pdk-date-picker-navigation>
    <div
      role="application"
      [attr.aria-label]="ariaLabel()"
      aria-roledescription="datepicker"
      tabindex="-1"
    >
      <span
        role="status"
        aria-live="polite"
        id="datePickerToggleAnnouncement"
        aria-atomic="true"
        pdk-visually-hidden
      >
        {{ toggleAnnouncement() }}
      </span>
      @if (showYearView) {
      <pdk-date-picker-year-grid
        [currentYear]="currentYear()"
        [isYearDisabled]="getDisabledForYear"
        (select)="handleYearSelect($event)"
      >
      </pdk-date-picker-year-grid>
      } @else {
      <pdk-date-picker-grid
        [focusedDate]="focusedDate"
        [isDateDisabled]="getDisabledForDate"
        [isDateHighlighted]="getHighlightedForDate"
        [isDateSelected]="getSelectedForDate"
        [visibleDate]="visibleDate()"
        (focusedDateChange)="handleFocusedDateChange($event)"
        (select)="handleSelect($event)"
      >
      </pdk-date-picker-grid>
      }
    </div>
  `,
  styleUrls: ['./date-picker.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [
    PdkDatePickerNavigationComponent,
    PdkDatePickerGridComponent,
    PdkDatePickerYearGridComponent,
    PdkVisuallyHiddenDirective
  ]
})
export class PdkDatePickerComponent implements OnInit {
  readonly ariaLabel = input<string>();
  readonly futureDate = input<boolean>(false);
  readonly isDateDisabled = input<(date: Date) => boolean>();
  readonly isYearDisabled = input<(year: number) => boolean>();
  readonly isDateHighlighted = input<(date: Date, hoveredDate: Date) => boolean>();
  readonly isDateSelected = input<(date: Date, selectedDate?: string) => boolean>();
  readonly minDate = input<string | null>();
  readonly maxDate = input<string | null>();
  readonly pastDate = input<boolean>(false);
  readonly value = input<string | null>();
  readonly disableWeekend = input<boolean>(false);
  readonly blur = output<void>();
  readonly change = output<string>();
  readonly toggleAnnouncement = signal<string>(null);
  visibleDate = linkedSignal(() => {
    const value = this.value();
    if (value) {
      return new Date(value);
    }

    if (this.minimumDate) {
      return this.minimumDate;
    }
    return this.today;
  });

  currentYear = computed(() => {
    const visibleDate = this.visibleDate();
    return visibleDate ? visibleDate.getFullYear() : this.today.getFullYear();
  });

  today = new Date();
  focusedDate: Date | null;
  showYearView = false;

  get minimumDate(): Date | null {
    const minDate = this.minDate();
    if (minDate) {
      return new Date(minDate);
    }
    if (this.futureDate()) {
      return new Date();
    }
    return null;
  }

  get maximumDate(): Date | null {
    const maxDate = this.maxDate();
    if (maxDate) {
      return new Date(maxDate);
    }
    if (this.pastDate()) {
      return new Date();
    }
    return null;
  }

  get prevDisabled(): boolean {
    if (this.minimumDate) {
      const prev = new Date(this.visibleDate());
      prev.setDate(0);

      return timeDiff(prev, this.minimumDate) > 0;
    }
    return false;
  }

  get nextDisabled(): boolean {
    if (this.maximumDate) {
      const next = new Date(this.visibleDate());
      next.setMonth(next.getMonth() + 2);
      next.setDate(0);

      const max = new Date(this.maximumDate);
      max.setMonth(max.getMonth() + 1);
      max.setDate(0);

      return timeDiff(next, max) < 0;
    }
    return false;
  }

  ngOnInit(): void {
    this.prepareToggleAnnouncement();
  }

  getDisabledForDate = (date: Date): boolean => {
    if (this.disableWeekend() && isWeekend(date)) {
      return true;
    }
    const isDateDisabled = this.isDateDisabled();
    if (!isDateDisabled || !isDateDisabled(date)) {
      return (
        (Boolean(this.minimumDate) && timeDiff(date, this.minimumDate) > 0) ||
        (Boolean(this.maximumDate) && timeDiff(date, this.maximumDate) < 0)
      );
    }
    return true;
  };

  getHighlightedForDate = (date: Date, hoveredDate: Date): boolean => {
    const isDateHighlighted = this.isDateHighlighted();
    if (isDateHighlighted) {
      return isDateHighlighted(date, hoveredDate);
    }
    return isSameDay(date, hoveredDate);
  };

  getSelectedForDate = (date: Date): boolean => {
    const isDateSelected = this.isDateSelected();
    const value = this.value();
    if (isDateSelected) {
      return isDateSelected(date, value);
    }
    return value ? isSameDay(date, value) : false;
  };

  handlePrevMonth() {
    const prev = new Date(this.visibleDate());
    prev.setMonth(prev.getMonth() - 1, 1);
    this.focusedDate = null;
    this.visibleDate.set(prev);
  }

  handleNextMonth() {
    const next = new Date(this.visibleDate());
    next.setMonth(next.getMonth() + 1, 1);
    this.focusedDate = null;
    this.visibleDate.set(next);
  }

  handleFocusedDateChange(date: Date | null) {
    if (date) {
      const minDate = this.minDate();
      const maxDate = this.maxDate();
      const valid =
        (!minDate || timeDiff(minDate, date) >= 0) && (!maxDate || timeDiff(maxDate, date) <= 0);

      if (valid) {
        this.focusedDate = date;
        this.visibleDate.set(date);
      }
    } else {
      this.blur.emit();
    }
  }

  handleSelect(date: Date) {
    this.change.emit(`${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`);
  }

  toggleYearView() {
    this.showYearView = !this.showYearView;
    this.prepareToggleAnnouncement();
  }

  getDisabledForYear = (year: number): boolean => {
    const isYearDisabled = this.isYearDisabled();
    if (!isYearDisabled || !isYearDisabled(year)) {
      if (this.minimumDate && year < this.minimumDate.getFullYear()) {
        return true;
      }
      if (this.maximumDate && year > this.maximumDate.getFullYear()) {
        return true;
      }
      return false;
    }
    return true;
  };

  handleYearSelect(year: number) {
    const currentVisibleDate = this.visibleDate();
    const newVisibleDate = new Date(currentVisibleDate);
    const originalMonth = currentVisibleDate.getMonth();
    newVisibleDate.setFullYear(year);
    // We ensure we cater for leap year edge cases.
    // If current visible date is the 29th of Febraury of a leap year
    //  and the new year is not a leap year, It would change the month.
    // We set the date to the last day of the target month to ensure the date is valid.
    if (newVisibleDate.getMonth() !== originalMonth) {
      newVisibleDate.setDate(0);
    }

    if (this.minimumDate && newVisibleDate < this.minimumDate) {
      newVisibleDate.setMonth(this.minimumDate.getMonth());
      newVisibleDate.setDate(this.minimumDate.getDate());
    }

    if (this.maximumDate && newVisibleDate > this.maximumDate) {
      newVisibleDate.setMonth(this.maximumDate.getMonth());
      newVisibleDate.setDate(this.maximumDate.getDate());
    }

    this.visibleDate.set(newVisibleDate);
    this.focusedDate = null;
    this.toggleYearView();
  }

  private prepareToggleAnnouncement() {
    let selectedDateText = '';
    const value = this.value();
    const currentYear = this.currentYear();
    const valueDate = new Date(value);
    const visibleDate = this.visibleDate();
    if (
      !!value &&
      valueDate.getMonth === visibleDate.getMonth &&
      valueDate.getFullYear() === visibleDate.getFullYear()
    ) {
      selectedDateText = `${valueDate.toLocaleDateString()} selected.`;
    } else {
      selectedDateText = 'No date selected.';
    }
    if (this.showYearView) {
      this.toggleAnnouncement
        .set(`Year selection. ${currentYear} selected. Use the tab key to focus on selected
       year then use arrow keys to navigate years.`);
    } else {
      this.toggleAnnouncement.set(
        `Date selection. ${selectedDateText} Use the tab key to focus on the first enabled date then use arrow keys to navigate days.`
      );
    }
  }
}

function pad(num: number): string {
  const value = String(num);
  return value.length >= 2 ? value : new Array(2 - value.length + 1).join('0') + value;
}
