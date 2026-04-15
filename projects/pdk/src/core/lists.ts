import { Directive, HostBinding, Input } from '@angular/core';

export type ListType = 'number' | 'bullet';

@Directive({ selector: '[pdk-list]' })
export class PdkListDirective {
  @Input('pdk-list') type: ListType;

  @HostBinding('class.govuk-list') list = true;
  @HostBinding('class.govuk-list--bullet')
  get bullet(): boolean {
    return this.type === 'bullet';
  }

  @HostBinding('class.govuk-list--number')
  get number(): boolean {
    return this.type === 'number';
  }
}
