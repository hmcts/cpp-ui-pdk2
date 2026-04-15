import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { PdkInteractionContainerComponent } from '../core/interaction';
import { PdkDatePickerIconComponent } from './date-picker-icon.component';

import { PdkDatePickerComponent } from './date-picker.component';

@Component({
  selector: 'pdk-date-picker-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <pdk-interaction-container (blur)="didOpenPicker = false">
      <div
        aria-label="Toggle date picker"
        [attr.aria-expanded]="!!didOpenPicker"
        role="button"
        class="pdk-date-picker__toggle"
        [class.pdk-date-picker__toggle__disabled]="disabled"
        (keydown.enter)="toggleDatePicker()"
        (click)="toggleDatePicker()"
        tabindex="0"
      >
        <pdk-date-picker-icon style="margin-top: -4px"></pdk-date-picker-icon>
      </div>
      @if (didOpenPicker) {
      <pdk-date-picker
        class="pdk-date-picker--overlay"
        [ariaLabel]="ariaLabel"
        [futureDate]="futureDate"
        [minDate]="minDate"
        [maxDate]="maxDate"
        [pastDate]="pastDate"
        [disableWeekend]="disableWeekend"
        [value]="value"
        (blur)="didOpenPicker = false"
        (change)="handleSelectDate($event)"
      >
      </pdk-date-picker>
      }
    </pdk-interaction-container>
  `,
  styleUrls: ['./date-picker-toggle.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [PdkInteractionContainerComponent, PdkDatePickerIconComponent, PdkDatePickerComponent]
})
export class PdkDatePickerToggleComponent {
  @Input() ariaLabel: string;
  @Input() futureDate?: boolean;
  @Input() minDate?: string | null;
  @Input() maxDate?: string | null;
  @Input() pastDate?: boolean;
  @Input() value?: Date;
  @Input() disabled = false;
  @Input() disableWeekend = false;
  @Output() change = new EventEmitter<string>();

  didOpenPicker = false;

  handleSelectDate(date: string) {
    this.change.emit(date);
    this.didOpenPicker = false;
  }

  toggleDatePicker() {
    if (!this.disabled) {
      this.didOpenPicker = !this.didOpenPicker;
    }
  }
}
