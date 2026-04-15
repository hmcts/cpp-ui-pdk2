import { Directive, HostBinding, Input } from '@angular/core';

export type SectionType = 'xlarge' | 'large' | 'medium' | 'small';

@Directive({ selector: '[pdk-section]' })
export class PdkSectionBreakDirective {
  @Input('pdk-section') type: SectionType;

  @HostBinding('class.govuk-section-break') sectionBreak = true;

  @HostBinding('class.govuk-section-break--xl')
  get xlarge(): boolean {
    return this.type === 'xlarge';
  }

  @HostBinding('class.govuk-section-break--l')
  get large(): boolean {
    return this.type === 'large';
  }

  @HostBinding('class.govuk-section-break--m')
  get medium(): boolean {
    return this.type === 'medium' || !this.type;
  }

  @HostBinding('class.govuk-section-break--s')
  get small(): boolean {
    return this.type === 'small';
  }
}
