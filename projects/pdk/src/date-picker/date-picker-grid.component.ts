import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { getCalendarMonth, getDaysInMonth, isSameDay } from './date-picker.util';
import { PdkTypographyDirective } from '../core/typography';
import { PdkTextColorDirective } from '../core/colour';
import { PdkVisuallyHiddenDirective } from '../core/accessibility';

import { PdkDatePickerDayComponent } from './date-picker-day.component';

interface DayRow {
  key: string;
  date: Date | null;
}

type WeekRow = DayRow[];

@Component({
  selector: 'pdk-date-picker-grid',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <table role="presentation" tabindex="-1">
      <thead>
        <tr>
          <th aria-label="Monday">
            <span pdk-typography="body-small" pdk-text-colour="dark-grey">
              Mo<span pdk-visually-hidden>nday</span>
            </span>
          </th>
          <th>
            <span pdk-typography="body-small" pdk-text-colour="dark-grey">
              Tu<span pdk-visually-hidden>esday</span>
            </span>
          </th>
          <th>
            <span pdk-typography="body-small" pdk-text-colour="dark-grey">
              We<span pdk-visually-hidden>dnesday</span>
            </span>
          </th>
          <th>
            <span pdk-typography="body-small" pdk-text-colour="dark-grey">
              Th<span pdk-visually-hidden>ursday</span>
            </span>
          </th>
          <th>
            <span pdk-typography="body-small" pdk-text-colour="dark-grey"
              >Fr<span pdk-visually-hidden>iday</span></span
            >
          </th>
          <th>
            <span pdk-typography="body-small" pdk-text-colour="dark-grey">
              Sa<span pdk-visually-hidden>turday</span>
            </span>
          </th>
          <th aria-label="Sunday">
            <span pdk-typography="body-small" pdk-text-colour="dark-grey">
              Su<span pdk-visually-hidden>nday</span>
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        @for (weekRow of weekRows; track trackWeekBy($index)) {
        <tr>
          @for (day of weekRow; track trackDateBy($index, day)) {
          <td>
            @if (day.date) {
            <pdk-date-picker-day
              [ariaLabel]="getAriaLabelForDate(day.date)"
              [date]="day.date"
              [disabled]="getDisabledForDate(day.date)"
              [focused]="getFocusedForDate(day.date)"
              [highlighted]="getHighlightedForDate(day.date)"
              [selected]="getSelectedForDate(day.date)"
              [tabIndex]="getTabIndexForDate(day.date)"
              (focus)="focusedDateChange.emit(day.date)"
              (keydown)="handleKeydown($event)"
              (mouseenter)="handleMouseover(day.date)"
              (mouseleave)="handleMouseout(day.date)"
              (select)="select.emit($event)"
            >
            </pdk-date-picker-day>
            }
          </td>
          }
        </tr>
        }
      </tbody>
    </table>
  `,
  imports: [
    PdkTypographyDirective,
    PdkTextColorDirective,
    PdkVisuallyHiddenDirective,
    PdkDatePickerDayComponent
  ]
})
export class PdkDatePickerGridComponent {
  @Input() focusedDate?: Date;
  @Input() isDateDisabled!: (date: Date) => boolean;
  @Input() isDateHighlighted!: (date: Date, hoveredDate: Date) => boolean;
  @Input() isDateSelected!: (date: Date) => boolean;
  /**
   * The date for which a the grid with construct the calendar month. This date
   * can exist anywhere in a month.
   */
  @Input()
  set visibleDate(visibleDate: Date) {
    // Determine the index of the first day in the month for the provided date
    // (i.e. 0 - 6 for Sun - Sat), and the number of days in the month, to give
    // us the boundaries for constructing our grid. For example, if the first
    // day in the month is Tuesday (index of 2), and the month has 30 days, we
    // will have 32 cells in the grid, where the cells with index of 0 and 1
    // will be displayed as blank offsets.
    const startOfMonth = new Date(new Date(visibleDate).setDate(1));
    const indexOfFirstDay = startOfMonth.getDay();
    const daysInMonth = getDaysInMonth(startOfMonth);
    // Our grid is a collection of rows, where each `weekRow` is an array of 7 days.
    const weekRows = [[]] as WeekRow[];

    // Begin iterating from a day index of -6, such that Sunday, with index 0,
    // is the last day in our `weekRow`
    for (let i = -6; i < indexOfFirstDay + daysInMonth; i++) {
      // Every Monday, we add a new row to our grid
      if (i % 7 === 1) {
        weekRows.push([]);
      }
      // push a day cell onto to the end of the current week row
      if (i >= indexOfFirstDay) {
        const date = new Date(startOfMonth);
        date.setDate(i - indexOfFirstDay + 1);
        weekRows[weekRows.length - 1].push({ key: date.toISOString(), date });
      } else {
        // add an offset cell when the index has not yet reached the first day
        // in the month
        weekRows[weekRows.length - 1].push({ key: null, date: null });
      }
    }
    this.weekRows = weekRows;
    this._visibleDate = visibleDate;
  }
  get visibleDate() {
    return this._visibleDate;
  }
  @Output() focusedDateChange = new EventEmitter<Date | null>();
  @Output() select = new EventEmitter<Date>();

  weekRows: WeekRow[] = [];

  private highlightedDate: Date | null = null;
  private highlightDateTimer: ReturnType<typeof setTimeout>;
  private _visibleDate: Date;

  constructor(private cdr: ChangeDetectorRef) {}

  getAriaLabelForDate(date: Date) {
    const month = getCalendarMonth(date);

    return `${date.getDate()} ${month} ${date.getFullYear()}`;
  }

  getDisabledForDate(date: Date) {
    return this.isDateDisabled(date);
  }

  getHighlightedForDate(date: Date) {
    if (this.highlightedDate && !this.getDisabledForDate(date)) {
      return this.isDateHighlighted(date, this.highlightedDate);
    }
    return false;
  }

  getFocusedForDate(date: Date) {
    if (this.focusedDate) {
      return isSameDay(date, this.focusedDate);
    }
    return false;
  }

  getSelectedForDate(date: Date) {
    if (!this.getDisabledForDate(date)) {
      return this.isDateSelected(date);
    }
    return false;
  }

  getTabIndexForDate(date: Date) {
    if (!this.getDisabledForDate(date)) {
      const day = date.getDate();

      if (day > 1) {
        const prev = new Date(new Date(date).setDate(day - 1));
        if (!this.getDisabledForDate(prev)) {
          return -1;
        }
      }
      return 0;
    }
    return -1;
  }

  handleKeydown(event: KeyboardEvent) {
    if (this.focusedDate) {
      const amendFocusedDate = (daysDiff: number) => {
        event.preventDefault();
        const nextFocusedDate = new Date(this.focusedDate);
        nextFocusedDate.setDate(nextFocusedDate.getDate() + daysDiff);
        if (!this.getDisabledForDate(nextFocusedDate)) {
          this.focusedDateChange.emit(nextFocusedDate);
        }
      };

      switch (event.key) {
        case 'ArrowUp':
          amendFocusedDate(-7);
          break;

        case 'ArrowDown':
          amendFocusedDate(7);
          break;

        case 'ArrowLeft':
          amendFocusedDate(-1);
          break;

        case 'ArrowRight':
          amendFocusedDate(1);
          break;

        case 'Escape':
          this.focusedDateChange.emit(null);
          break;
      }
    }
  }

  handleMouseout(date: Date) {
    if (this.highlightDateTimer) {
      clearTimeout(this.highlightDateTimer);
    }

    this.highlightDateTimer = setTimeout(() => {
      if (this.highlightedDate && isSameDay(date, this.highlightedDate)) {
        this.highlightedDate = null;
        this.highlightDateTimer = null;
        this.cdr.markForCheck();
      }
    }, 50);
  }

  handleMouseover(date: Date) {
    if (!this.highlightedDate || !isSameDay(date, this.highlightedDate)) {
      this.highlightedDate = date;
    }
  }

  trackWeekBy(index: number) {
    return index;
  }

  trackDateBy(index: number, { key }: DayRow) {
    return index;
  }
}
