import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  Input,
  ViewEncapsulation
} from '@angular/core';
import { coerceBooleanProperty } from '../util';

@Component({
  selector: 'pdk-action-details',
  template: `
    <div class="pdk-action-details pdk-action-details--completed">
      <div class="pdk-action-details__header">
        <span class="pdk-action-details__title">
          <ng-content select="pdk-action-title"></ng-content>
        </span>
        <span class="pdk-action-details__options">
          @if(highlighted) {
          <span
            class="pdk-action-details__status"
            [class.pdk-action-details__status--highlighted]="highlighted"
          >
            @if(highlightedLabel) {
            <span>{{ highlightedLabel }}</span>
            }
          </span>
          }
          <span class="pdk-action-details__action">
            <ng-content select="pdk-action-options"></ng-content>
          </span>
        </span>
      </div>
      <div class="pdk-action-details__content">
        <ng-content select="pdk-action-body"></ng-content>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./action-details.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PdkActionDetailsComponent {
  @Input()
  highlightedLabel = 'Saved';

  @Input()
  get highlighted() {
    return this._highlighted;
  }
  set highlighted(on: boolean) {
    this._highlighted = coerceBooleanProperty(on);
  }

  _highlighted = false;
}

@Directive({ selector: 'pdk-action-body, pdk-action-title, pdk-action-options' })
export class PdkActionDetailsSelectorsDirective {}
