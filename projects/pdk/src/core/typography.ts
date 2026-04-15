import { Directive, HostBinding, Input } from '@angular/core';

export type TypographyType =
  | 'heading-xlarge'
  | 'heading-large'
  | 'heading-medium'
  | 'heading-small'
  | 'caption-xlarge'
  | 'caption-large'
  | 'caption-medium'
  | 'body-large'
  | 'body-medium'
  | 'body-small'
  | 'body-xsmall'
  | 'body'
  | 'body-lead'
  | 'pdk-typography';

@Directive({ selector: '[pdk-typography]' })
export class PdkTypographyDirective {
  @Input('pdk-typography') type: TypographyType;

  // Headings

  @HostBinding('class.govuk-heading-xl')
  get headingXlarge(): boolean {
    return this.type === 'heading-xlarge';
  }

  @HostBinding('class.govuk-heading-l')
  get headingLarge(): boolean {
    return this.type === 'heading-large';
  }

  @HostBinding('class.govuk-heading-m')
  get headingMedium(): boolean {
    return this.type === 'heading-medium';
  }

  @HostBinding('class.govuk-heading-s')
  get headingSmall(): boolean {
    return this.type === 'heading-small';
  }

  // Captions

  @HostBinding('class.govuk-caption-xl')
  get captionXLarge(): boolean {
    return this.type === 'caption-xlarge';
  }

  @HostBinding('class.govuk-caption-l')
  get captionLarge(): boolean {
    return this.type === 'caption-large';
  }

  @HostBinding('class.govuk-caption-m')
  get captionMedium(): boolean {
    return this.type === 'caption-medium';
  }

  // Body

  @HostBinding('class.govuk-body-l')
  get bodyLarge(): boolean {
    return this.type === 'body-large' || this.type === 'body-lead';
  }

  @HostBinding('class.govuk-body-m')
  get bodyMedium(): boolean {
    return this.type === 'body-medium' || this.type === 'pdk-typography' || this.type === 'body';
  }

  @HostBinding('class.govuk-body-s')
  get bodySmall(): boolean {
    return this.type === 'body-small';
  }

  @HostBinding('class.govuk-body-xs')
  get bodyXsmall(): boolean {
    return this.type === 'body-xsmall';
  }
}
