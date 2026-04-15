import { Component, Input, ViewEncapsulation } from '@angular/core';
import { PdkColor } from '@cpp/pdk/core/colour';
import { PdkMarginDirective, PdkTypographyDirective, PdkTextColorDirective } from '@cpp/pdk';
import { SwatchComponent } from './swatch.component';

@Component({
  selector: 'docs-swatch-row',
  template: `
    <div class="docs-swatch-row" pdk-margin-bottom="2">
      <div class="docs-swatch-row__colour" pdk-margin-right="4">
        <docs-swatch [color]="color"></docs-swatch>
      </div>
      <span pdk-typography="body" pdk-margin-bottom="0" pdk-text-colour="black">{{ color }}</span>
    </div>
  `,
  styleUrls: ['./swatch-row.scss'],
  imports: [PdkMarginDirective, SwatchComponent, PdkTypographyDirective, PdkTextColorDirective]
})
export class SwatchRowComponent {
  @Input() color: PdkColor;
}
