import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { highlight, hooks, languages } from 'prismjs';
import 'prismjs/components/prism-typescript';
import { PdkTypographyDirective, PdkMarginDirective } from '@cpp/pdk';

@Component({
  selector: 'docs-prism',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div pdk-typography="body-small" pdk-margin-bottom="0">
      <pre class="language-{{ language }}"><code #code class="language-{{ language }}"></code></pre>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./prism.scss'],
  imports: [PdkTypographyDirective, PdkMarginDirective]
})
export class PrismComponent implements AfterViewInit {
  @ViewChild('code') codeRef: ElementRef<HTMLElement>;

  @Input() code = '';
  @Input() language = '';

  ngAfterViewInit() {
    // Prism tries to highlight the whole document on DOMContentLoad.
    // Unfortunately with webpack the only way of disabling it is by simply
    // forcing it to highlight no elements -> []
    hooks.add('before-highlightall', (env) => {
      env['elements'] = [];
    });

    this.codeRef.nativeElement.innerHTML = highlight(this.code.trim(), languages[this.language]);
  }
}
