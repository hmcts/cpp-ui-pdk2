import { Directive, Input, ViewEncapsulation, HostBinding, Component } from '@angular/core';
import { coerceBooleanProperty } from '../util/index';

@Component({
  selector: 'pdk-grid, [pdk-grid]',
  template: ` <ng-content></ng-content> `,
  styleUrls: ['./grid.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PdkGridComponent {}

@Directive({ selector: 'pdk-grid, [pdk-grid]' })
export class PdkGridDirective {
  @HostBinding('class.govuk-grid-row')
  @Input()
  get container(): boolean {
    return this._container;
  }
  set container(on: boolean) {
    this._container = coerceBooleanProperty(on);
  }

  @HostBinding('class.govuk-grid-column-full')
  @Input()
  get full(): boolean {
    return this._full;
  }
  set full(on: boolean) {
    this._full = coerceBooleanProperty(on);
  }

  @HostBinding('class.govuk-grid-column-one-half')
  @Input('one-half')
  get oneHalf(): boolean {
    return this._oneHalf;
  }
  set oneHalf(on: boolean) {
    this._oneHalf = coerceBooleanProperty(on);
  }

  @HostBinding('class.govuk-grid-column-one-third')
  @Input('one-third')
  get oneThird(): boolean {
    return this._oneThird;
  }
  set oneThird(on: boolean) {
    this._oneThird = coerceBooleanProperty(on);
  }

  @HostBinding('class.govuk-grid-column-two-thirds')
  @Input('two-thirds')
  get twoThirds(): boolean {
    return this._twoThirds;
  }
  set twoThirds(on: boolean) {
    this._twoThirds = coerceBooleanProperty(on);
  }

  @HostBinding('class.govuk-grid-column-one-quarter')
  @Input('one-quarter')
  get oneQuarter(): boolean {
    return this._oneQuarter;
  }
  set oneQuarter(on: boolean) {
    this._oneQuarter = coerceBooleanProperty(on);
  }

  @HostBinding('class.govuk-grid-column-three-quarters')
  @Input('three-quarters')
  get threeQuarters(): boolean {
    return this._threeQuarters;
  }
  set threeQuarters(on: boolean) {
    this._threeQuarters = coerceBooleanProperty(on);
  }

  @HostBinding('class.pdk-grid-column-offset-one-half')
  @Input('offset-one-half')
  get offsetOneHalf(): boolean {
    return this._offsetOneHalf;
  }
  set offsetOneHalf(on: boolean) {
    this._offsetOneHalf = coerceBooleanProperty(on);
  }

  @HostBinding('class.pdk-grid-column-offset-one-third')
  @Input('offset-one-third')
  get offsetOneThird(): boolean {
    return this._offsetOneThird;
  }
  set offsetOneThird(on: boolean) {
    this._offsetOneThird = coerceBooleanProperty(on);
  }

  @HostBinding('class.pdk-grid-column-offset-two-thirds')
  @Input('offset-two-thirds')
  get offsetTwoThirds(): boolean {
    return this._offsetTwoThirds;
  }
  set offsetTwoThirds(on: boolean) {
    this._offsetTwoThirds = coerceBooleanProperty(on);
  }

  @HostBinding('class.pdk-grid-column-offset-one-quarter')
  @Input('offset-one-quarter')
  get offsetOneQuarter(): boolean {
    return this._offsetOneQuarter;
  }
  set offsetOneQuarter(on: boolean) {
    this._offsetOneQuarter = coerceBooleanProperty(on);
  }

  @HostBinding('class.pdk-grid-column-offset-three-quarters')
  @Input('offset-three-quarters')
  get offsetThreeQuarters(): boolean {
    return this._offsetThreeQuarters;
  }
  set offsetThreeQuarters(on: boolean) {
    this._offsetThreeQuarters = coerceBooleanProperty(on);
  }

  private _container: boolean;
  private _full: boolean;
  private _oneHalf: boolean;
  private _oneThird: boolean;
  private _twoThirds: boolean;
  private _oneQuarter: boolean;
  private _threeQuarters: boolean;
  private _offsetOneHalf: boolean;
  private _offsetOneThird: boolean;
  private _offsetTwoThirds: boolean;
  private _offsetOneQuarter: boolean;
  private _offsetThreeQuarters: boolean;
}
