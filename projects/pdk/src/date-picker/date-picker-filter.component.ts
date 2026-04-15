import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output
} from '@angular/core';
import { PdkInteractionContainerComponent } from '../core/interaction';
import { PdkFilterButtonComponent } from '../button/filter-button';

import { PdkDatePickerComponent } from './date-picker.component';

@Component({
  selector: 'pdk-date-picker-filter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <pdk-interaction-container (blur)="didOpenPicker = false">
      <div style="position: relative;">
        <button
          pdk-filter-button
          [attr.ariaDescribedBy]="ariaDescribedBy"
          (click)="didOpenPicker = !didOpenPicker"
        >
          <ng-content></ng-content>
        </button>
        @if (didOpenPicker) {
        <pdk-date-picker
          class="pdk-date-picker-filter__picker"
          [ariaLabel]="ariaLabel"
          [futureDate]="futureDate"
          [minDate]="minDate"
          [maxDate]="maxDate"
          [pastDate]="pastDate"
          [value]="value"
          (blur)="didOpenPicker = false"
          (change)="handleSelectDate($event)"
        >
        </pdk-date-picker>
        }
      </div>
    </pdk-interaction-container>
  `,
  styles: [
    `
      .pdk-date-picker-filter__picker {
        position: absolute;
        right: 0;
        top: 30px;
        z-index: 9999;
      }
    `
  ],
  imports: [PdkInteractionContainerComponent, PdkFilterButtonComponent, PdkDatePickerComponent]
})
export class PdkDatePickerFilterComponent {
  @Input() ariaLabel: string;
  @Input() ariaDescribedBy?: string;
  @Input() futureDate?: boolean;
  @Input() minDate?: string | null;
  @Input() maxDate?: string | null;
  @Input() pastDate?: boolean;
  @Input() value?: Date;
  @Output() change = new EventEmitter<string>();

  @HostBinding('style.display') display = 'inline-block';

  didOpenPicker = false;

  handleSelectDate(date: string) {
    this.change.emit(date);
    this.didOpenPicker = false;
  }
}
