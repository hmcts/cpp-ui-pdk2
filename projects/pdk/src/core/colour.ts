import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { stripClassesByPrefix } from '../util/index';

export type PdkColorTint = 0 | 25 | 50;
export type PdkColor =
  | 'red'
  | 'yellow'
  | 'green'
  | 'blue'
  | 'dark-blue'
  | 'light-blue'
  | 'purple'
  | 'black'
  | 'dark-grey'
  | 'mid-grey'
  | 'light-grey'
  | 'white'
  | 'light-purple'
  | 'bright-purple'
  | 'pink'
  | 'light-pink'
  | 'orange'
  | 'brown'
  | 'light-green'
  | 'turquoise';

type DeprecatedColor = 'bright-red' | 'grey-1' | 'grey-2' | 'grey-3' | 'grey-4';

const warnAboutDeprecatedColor = (color: DeprecatedColor) => {
  console.warn(
    `The colour '${color}' is deprecated and will be removed in a future release. Falling back to closest approximate replacement.`
  );
};

const getColor = (color: PdkColor | DeprecatedColor): PdkColor => {
  switch (color) {
    case 'grey-1':
      warnAboutDeprecatedColor(color);
      return 'dark-grey';

    case 'grey-2':
      warnAboutDeprecatedColor(color);
      return 'mid-grey';

    case 'grey-3':
    case 'grey-4':
      warnAboutDeprecatedColor(color);
      return 'light-grey';

    case 'bright-red':
      warnAboutDeprecatedColor(color);
      return 'red';

    default:
      return color;
  }
};

@Directive({ selector: '[pdk-fill-colour], [pdk-fill-hover-colour]' })
export class PdkFillColorDirective {
  @Input('pdk-fill-colour') set type(color: PdkColor | DeprecatedColor) {
    this.color = getColor(color);
    this.updateClassName();
  }

  @Input('tint')
  set tint(colorTint: PdkColorTint) {
    this.colorTint = colorTint;
    this.updateClassName();
  }

  @Input('pdk-fill-hover-colour')
  set hover(color: PdkColor) {
    this.hoverColor = color;
    this.updateClassName();
  }

  private color: PdkColor;
  private colorTint: PdkColorTint = 0;
  private hoverColor: PdkColor;

  private updateClassName() {
    const element = this.element.nativeElement;

    stripClassesByPrefix(element.classList, 'pdk-!-fill-color');
    if (this.color) {
      this.renderer.addClass(
        element,
        `pdk-!-fill-color-${this.color}${this.colorTint ? `-tint-${this.colorTint}` : ''}`
      );
    }

    if (this.hoverColor) {
      this.renderer.addClass(element, `pdk-!-fill-color-hover-${this.hoverColor}`);
    }
  }

  constructor(private element: ElementRef, private renderer: Renderer2) {}
}

@Directive({ selector: '[pdk-text-colour], [pdk-text-hover-colour]' })
export class PdkTextColorDirective {
  @Input('pdk-text-colour') set type(color: PdkColor | DeprecatedColor) {
    this.color = getColor(color);
    this.updateClassName();
  }

  @Input('tint')
  set tint(colorTint: PdkColorTint) {
    this.colorTint = colorTint;
    this.updateClassName();
  }

  @Input('pdk-text-hover-colour')
  set hover(color: PdkColor) {
    this.hoverColor = color;
    this.updateClassName();
  }

  private color: PdkColor;
  private colorTint: PdkColorTint = 0;
  private hoverColor: PdkColor;

  private updateClassName() {
    const element = this.element.nativeElement;

    stripClassesByPrefix(element.classList, 'pdk-!-text-color');
    if (this.color) {
      this.renderer.addClass(
        element,
        `pdk-!-text-color-${this.color}${this.colorTint ? `-tint-${this.colorTint}` : ''}`
      );
    }

    if (this.hoverColor) {
      this.renderer.addClass(element, `pdk-!-text-color-hover-${this.hoverColor}`);
    }
  }

  constructor(private element: ElementRef, private renderer: Renderer2) {}
}

@Directive({ selector: '[pdk-border-colour]' })
export class PdkBorderColorDirective {
  @Input('pdk-border-colour') set type(color: PdkColor | DeprecatedColor) {
    this.color = getColor(color);
    this.updateClassName();
  }

  @Input('tint')
  set tint(colorTint: PdkColorTint) {
    this.colorTint = colorTint;
    this.updateClassName();
  }

  private color: PdkColor;
  private colorTint: PdkColorTint = 0;

  private updateClassName() {
    const element = this.element.nativeElement;

    stripClassesByPrefix(element.classList, 'pdk-!-border-color');

    this.renderer.addClass(
      element,
      `pdk-!-border-color-${this.color}${this.colorTint ? `-tint-${this.colorTint}` : ''}`
    );
  }

  constructor(private element: ElementRef, private renderer: Renderer2) {}
}
