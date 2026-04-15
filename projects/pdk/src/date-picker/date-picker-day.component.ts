import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  ViewChild,
  ElementRef,
  Output
} from '@angular/core';
import { PdkFillColorDirective } from '../core/colour';

@Component({
  selector: 'pdk-date-picker-day',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      #day
      class="date-picker-grid__day"
      [class.date-picker-grid__day--disabled]="disabled"
      [class.date-picker-grid__day--selected]="selected"
      [pdk-fill-colour]="highlighted ? 'light-grey' : null"
      role="button"
      [attr.aria-disabled]="disabled"
      [attr.aria-label]="ariaLabel"
      [attr.tabindex]="disabled ? null : tabIndex"
      (keydown.enter)="handleSelect()"
      (focus)="handleFocus($event)"
      (click)="handleSelect()"
    >
      {{ date.getDate() }}
    </div>
  `,
  styles: [
    `
      .date-picker-grid__day {
        height: 40px;
        width: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: 17px;
      }
      .date-picker-grid__day--disabled {
        color: #bbb;
        cursor: auto;
      }
      .date-picker-grid__day--selected {
        background-color: #005ea5;
        color: white;
      }
    `
  ],
  imports: [PdkFillColorDirective]
})
export class PdkDatePickerDayComponent implements AfterViewChecked {
  @Input() ariaLabel: string;
  @Input() disabled = false;
  @Input() date: Date;
  @Input() focused: boolean;
  @Input() highlighted?: boolean;
  @Input() selected?: boolean;
  @Input() tabIndex = -1;
  @Output() focus = new EventEmitter<FocusEvent>();
  @Output() select = new EventEmitter<Date>();
  @ViewChild('day') dayRef: ElementRef<HTMLButtonElement>;

  ngAfterViewChecked() {
    if (this.focused && this.dayRef.nativeElement) {
      this.dayRef.nativeElement.focus();
    }
  }

  getAriaLabel() {
    return this.disabled ? `${this.ariaLabel} (Unavailable)` : this.ariaLabel;
  }

  handleFocus(event: FocusEvent) {
    this.focus.emit(event);
  }

  handleSelect() {
    if (this.disabled) {
      this.focus.emit(null);
    } else {
      this.select.emit(this.date);
    }
  }
}
