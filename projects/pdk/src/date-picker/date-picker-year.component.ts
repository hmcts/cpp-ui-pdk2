import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  afterNextRender,
  afterRenderEffect,
  input,
  viewChild
} from '@angular/core';
import { ElementRef } from '@angular/core';
import { PdkFillColorDirective } from '../core/colour';

@Component({
  selector: 'pdk-date-picker-year',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      #yearEl
      class="date-picker-year-grid__year"
      [class.date-picker-year-grid__year--selected]="selected()"
      [class.date-picker-year-grid__year--disabled]="disabled()"
      [pdk-fill-colour]="highlighted ? 'light-grey' : null"
      role="button"
      [attr.aria-label]="ariaLabel"
      [attr.tabindex]="tabIndex()"
      (keydown)="handleKeydown($event)"
      (focus)="handleFocus($event)"
      (click)="handleSelect()"
    >
      {{ year }}
    </div>
  `,
  styles: [
    `
      .date-picker-year-grid__year {
        height: 40px;
        width: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: 17px;
        scroll-margin-top: 8px;
      }
      .date-picker-year-grid__year--disabled {
        color: #bbb;
        cursor: not-allowed;
      }
      .date-picker-year-grid__year--selected {
        background-color: #005ea5;
        color: #fff;
      }
    `
  ],
  imports: [PdkFillColorDirective]
})
export class PdkDatePickerYearComponent {
  @Input() ariaLabel: string;
  @Input() year: number;
  disabled = input<boolean>();
  focused = input<boolean>();
  @Input() highlighted?: boolean;
  selected = input<boolean>();
  tabIndex = input<number>();
  @Output() focus = new EventEmitter<FocusEvent>();
  @Output() select = new EventEmitter<number>();
  @Output() keydownPress = new EventEmitter<KeyboardEvent>();
  readonly yearRef = viewChild.required<ElementRef<HTMLDivElement>>('yearEl');

  constructor() {
    afterRenderEffect({
      write: () => {
        const yearRef = this.yearRef();
        const focused = this.focused();
        if (focused && yearRef && yearRef.nativeElement) {
          yearRef.nativeElement.focus();
        }
      }
    });
    afterNextRender({
      write: () => {
        const yearRef = this.yearRef();
        if (yearRef && this.selected()) {
          yearRef.nativeElement.scrollIntoView({ behavior: 'auto', block: 'center' });
        }
      }
    });
  }

  handleFocus(event: FocusEvent) {
    this.focus.emit(event);
  }

  handleSelect() {
    if (this.disabled()) {
      this.focus.emit(null);
      return;
    }
    this.select.emit(this.year);
  }

  handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.handleSelect();
    } else {
      this.keydownPress.emit(event);
    }
  }
}
