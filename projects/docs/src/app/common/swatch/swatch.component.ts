import { Component, Input } from '@angular/core';
import { PdkColor } from '@cpp/pdk/core/colour';
import { PdkFillColorDirective } from '@cpp/pdk';

@Component({
  selector: 'docs-swatch',
  template: ` <div class="docs-swatch" [pdk-fill-colour]="color" [tint]="0"></div> `,
  styleUrls: ['./swatch.scss'],
  imports: [PdkFillColorDirective]
})
export class SwatchComponent {
  @Input() color: PdkColor;
}
