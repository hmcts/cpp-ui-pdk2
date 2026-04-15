import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PdkMarginDirective, PdkTagComponent } from '@cpp/pdk';

export type HeaderOriginType = 'CPP' | 'GOV.UK' | 'GOV.UK | HMCTS' | 'GOV.UK | CPP';

@Component({
  selector: 'docs-example-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="docs-header">
      <pdk-tag class="docs-header__tag" pdk-margin-bottom="2" [title]="title">
        {{ origin }}
      </pdk-tag>
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./example-header.scss'],
  imports: [PdkMarginDirective, PdkTagComponent]
})
export class HeaderComponent {
  @Input() origin: HeaderOriginType;

  get title(): string {
    if (this.origin === 'GOV.UK') {
      return `This component originates from the GOV.UK Design System`;
    }
    return `This component is an original design from the Common Platform Programme`;
  }
}
