import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ExampleTabsComponent } from '../example-tabs/example-tabs.component';
import { ExampleTabComponent } from '../example-tabs/example-tab.component';
import { PrismComponent } from '../prism/prism.component';

@Component({
  selector: 'docs-example',
  template: `
    <div class="docs-example"><ng-content></ng-content></div>
    <docs-example-tabs>
      <docs-example-tab title="HTML">
        <docs-prism language="markup" [code]="html"></docs-prism>
      </docs-example-tab>
      @if (typescript) {
      <docs-example-tab title="Typescript">
        <docs-prism language="typescript" [code]="typescript"></docs-prism>
      </docs-example-tab>
      }
    </docs-example-tabs>
  `,
  styleUrls: ['./example.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [ExampleTabsComponent, ExampleTabComponent, PrismComponent]
})
export class ExampleComponent {
  @Input() html: string;
  @Input() typescript: string;
}
