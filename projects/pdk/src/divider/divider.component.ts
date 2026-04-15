import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { coerceBooleanProperty } from '../util/index';

@Component({
  selector: 'pdk-divider',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <hr class="pdk-divider" [class.pdk-divider--dark]="dark" [class.pdk-divider--thick]="hero" />
  `,
  styleUrls: ['./divider.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PdkDividerComponent {
  @Input()
  get dark() {
    return this._dark;
  }
  set dark(on: boolean) {
    this._dark = coerceBooleanProperty(on);
  }

  @Input()
  get hero() {
    return this._hero;
  }
  set hero(on: boolean) {
    this._hero = coerceBooleanProperty(on);
  }

  private _dark: boolean;
  private _hero: boolean;
}
