import { Directive, HostBinding, Input } from '@angular/core';
import { coerceBooleanProperty } from '../util/index';

@Directive({ selector: '[pdk-link]' })
export class PdkLinkDirective {
  @HostBinding('class.govuk-link') link = true;

  @HostBinding('style.background-color')
  @Input()
  get outlined(): string | null {
    return this._outlined ? 'inherit' : null;
  }
  set outlined(on: string | null) {
    this._outlined = coerceBooleanProperty(on);
  }

  @HostBinding('class.govuk-link--muted')
  @Input()
  get muted() {
    return this._muted;
  }
  set muted(on: boolean) {
    this._muted = coerceBooleanProperty(on);
  }

  @HostBinding('class.govuk-link--text-colour')
  @Input()
  get text() {
    return this._textColor;
  }
  set text(on: boolean) {
    this._textColor = coerceBooleanProperty(on);
  }

  @HostBinding('class.govuk-link--no-visited-state')
  @Input()
  get unvisited() {
    return this._unvisited;
  }
  set unvisited(on: boolean) {
    this._unvisited = coerceBooleanProperty(on);
  }

  @HostBinding('class.govuk-link--no-underline')
  @Input()
  get noUnderline() {
    return this._noUnderline;
  }
  set noUnderline(on: boolean) {
    this._noUnderline = coerceBooleanProperty(on);
  }

  private _muted = false;
  private _outlined = false;
  private _textColor = false;
  private _unvisited = false;
  private _noUnderline = false;
}
