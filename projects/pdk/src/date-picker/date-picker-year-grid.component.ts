import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  input,
  OnInit,
  output,
  Signal,
  signal
} from '@angular/core';
import { PdkDatePickerYearComponent } from './date-picker-year.component';

interface YearRow {
  key: number;
  year: number;
  tabIndex: number | undefined;
  focused: Signal<boolean>;
  selected: Signal<boolean>;
  disabled: boolean | undefined;
  ariaLabel: string;
  highlighted: Signal<boolean>;
}

@Component({
  selector: 'pdk-date-picker-year-grid',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="date-picker-year-grid__container" role="grid" tabindex="-1">
      <div class="date-picker-year-grid__grid">
        @for (yearRow of yearRows; track $index) {
        <div class="date-picker-year-grid__row">
          @for (yearItem of yearRow; track yearItem.key) {
          <div class="date-picker-year-grid__cell">
            <pdk-date-picker-year
              [ariaLabel]="yearItem.ariaLabel"
              [year]="yearItem.year"
              [focused]="yearItem.focused()"
              [disabled]="yearItem.disabled"
              [highlighted]="yearItem.highlighted()"
              [selected]="yearItem.selected()"
              [tabIndex]="yearItem.tabIndex"
              (focus)="focusedYear.set(yearItem.year)"
              (keydownPress)="handleKeydown($event)"
              (mouseenter)="handleMouseover(yearItem.year)"
              (select)="select.emit($event)"
            >
            </pdk-date-picker-year>
          </div>
          }
        </div>
        }
      </div>
    </div>
  `,
  styles: [
    `
      .date-picker-year-grid__container {
        max-height: 253px;
        box-sizing: border-box;
        overflow-y: auto;
        padding: 8px;
      }
      .date-picker-year-grid__grid {
        display: flex;
        flex-direction: column;
      }
      .date-picker-year-grid__row {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 12px;
      }
      .date-picker-year-grid__cell {
        display: flex;
      }
    `
  ],
  imports: [PdkDatePickerYearComponent]
})
export class PdkDatePickerYearGridComponent implements OnInit {
  readonly currentYear = input<number>();
  readonly isYearDisabled = input<(year: number) => boolean>(() => false);
  readonly select = output<number>();

  yearRows: YearRow[][] = [];
  readonly focusedYear = signal<number | null>(null);
  private readonly highlightedYear = signal<number | null>(null);
  private readonly MIN_YEAR = 1970;
  private readonly MAX_YEAR = 2099;
  private readonly COLUMNS = 4;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.initializeYearRows();
  }

  private initializeYearRows() {
    const rows: YearRow[][] = [];
    let currentRow: YearRow[] = [];

    for (let year = this.MIN_YEAR; year <= this.MAX_YEAR; year++) {
      currentRow.push({
        key: year,
        year,
        tabIndex: this.getTabIndexForYear(year),
        disabled: this.isYearDisabled()(year),
        ariaLabel: `Year ${year}`,
        focused: computed(() => this.focusedYear() === year),
        highlighted: computed(
          () => !this.isYearDisabled()(year) && this.highlightedYear() === year
        ),
        selected: computed(() => {
          const isYearDisabled = this.isYearDisabled();
          if (isYearDisabled(year)) {
            return false;
          }
          return this.currentYear() === year;
        })
      });

      if (currentRow.length === this.COLUMNS) {
        rows.push(currentRow);
        currentRow = [];
      }
    }
    if (currentRow.length > 0) {
      rows.push(currentRow);
    }

    this.yearRows = rows;
  }

  handleKeydown(event: KeyboardEvent) {
    if (this.focusedYear() !== undefined) {
      const amendFocusedYear = (yearsDiff: number) => {
        event.preventDefault();
        const nextFocusedYear = this.focusedYear() + yearsDiff;
        if (
          nextFocusedYear >= this.MIN_YEAR &&
          nextFocusedYear <= this.MAX_YEAR &&
          !this.isYearDisabled()(nextFocusedYear)
        ) {
          this.focusedYear.set(nextFocusedYear);
        }
      };

      switch (event.key) {
        case 'ArrowUp':
          amendFocusedYear(-this.COLUMNS);
          break;

        case 'ArrowDown':
          amendFocusedYear(this.COLUMNS);
          break;

        case 'ArrowLeft':
          amendFocusedYear(-1);
          break;

        case 'ArrowRight':
          event.preventDefault();
          amendFocusedYear(1);
          break;

        case 'Escape':
          this.focusedYear.set(null);
          break;
      }
    }
  }

  handleMouseover(year: number) {
    if (!this.highlightedYear() || year !== this.highlightedYear()) {
      this.highlightedYear.set(year);
    }
  }

  private getTabIndexForYear(year: number) {
    const isYearDisabled = this.isYearDisabled();
    const currentYear = this.currentYear();
    if (!isYearDisabled(year)) {
      if (year > currentYear && !isYearDisabled(year - 1)) {
        return -1;
      }
      if (year < currentYear && (!isYearDisabled(currentYear) || year != this.MIN_YEAR)) {
        return -1;
      }
      return 0;
    }
    return undefined;
  }
}
