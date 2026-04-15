import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

export type PaddingUnit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type MarginUnit = PaddingUnit | -1 | -2 | -3 | -4 | -5 | -6 | -7 | -8 | -9;
export type SpacingUnit = MarginUnit | PaddingUnit;

@Directive({
  selector:
    '[pdk-margin], [pdk-margin-top], [pdk-margin-right], [pdk-margin-bottom], [pdk-margin-left], [pdk-margin-vertical], [pdk-margin-horizontal]'
})
export class PdkMarginDirective {
  @Input('pdk-margin') set margin(unit: MarginUnit) {
    if (unit !== undefined) {
      if (unit >= 0) {
        this.renderer.addClass(this.element.nativeElement, `govuk-\!-margin-${unit}`);
      } else {
        this.renderer.addClass(
          this.element.nativeElement,
          `pdk-\!-negative-margin-${Math.abs(unit)}`
        );
      }
    }
  }

  @Input('pdk-margin-vertical') set vertical(unit: MarginUnit) {
    this.setOverride('top', unit);
    this.setOverride('bottom', unit);
  }

  @Input('pdk-margin-horizontal') set horizontal(unit: MarginUnit) {
    this.setOverride('left', unit);
    this.setOverride('right', unit);
  }

  @Input('pdk-margin-top') set top(unit: MarginUnit) {
    this.setOverride('top', unit);
  }

  @Input('pdk-margin-right') set right(unit: MarginUnit) {
    this.setOverride('right', unit);
  }

  @Input('pdk-margin-bottom') set bottom(unit: MarginUnit) {
    this.setOverride('bottom', unit);
  }

  @Input('pdk-margin-left') set left(unit: MarginUnit) {
    this.setOverride('left', unit);
  }

  constructor(private element: ElementRef, private renderer: Renderer2) {}

  private setOverride(direction: string, unit: MarginUnit) {
    const element = this.element.nativeElement;

    if (unit >= 0) {
      this.renderer.addClass(element, `govuk-\!-margin-${direction}-${unit}`);
    } else {
      this.renderer.addClass(element, `pdk-\!-negative-margin-${direction}-${Math.abs(unit)}`);
    }
  }
}

@Directive({
  selector:
    '[pdk-padding], [pdk-padding-top], [pdk-padding-right], [pdk-padding-bottom], [pdk-padding-left], [pdk-padding-vertical], [pdk-padding-horizontal]'
})
export class PdkPaddingDirective {
  @Input('pdk-padding') set margin(unit: PaddingUnit) {
    this.renderer.addClass(this.element.nativeElement, `govuk-\!-padding-${unit}`);
  }

  @Input('pdk-padding-vertical') set vertical(unit: PaddingUnit) {
    this.setOverride('top', unit);
    this.setOverride('bottom', unit);
  }

  @Input('pdk-padding-horizontal') set horizontal(unit: PaddingUnit) {
    this.setOverride('left', unit);
    this.setOverride('right', unit);
  }

  @Input('pdk-padding-top') set top(unit: PaddingUnit) {
    this.setOverride('top', unit);
  }

  @Input('pdk-padding-right') set right(unit: PaddingUnit) {
    this.setOverride('right', unit);
  }

  @Input('pdk-padding-bottom') set bottom(unit: PaddingUnit) {
    this.setOverride('bottom', unit);
  }

  @Input('pdk-padding-left') set left(unit: PaddingUnit) {
    this.setOverride('left', unit);
  }

  constructor(private element: ElementRef, private renderer: Renderer2) {}

  private setOverride(direction: string, unit: PaddingUnit) {
    const element = this.element.nativeElement;

    this.renderer.addClass(element, `govuk-\!-padding-${direction}-${unit}`);
  }
}
