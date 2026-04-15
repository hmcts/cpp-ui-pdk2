import { Component } from '@angular/core';

@Component({
  selector: 'docs-pane',
  template: `
    <div class="docs-pane">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./pane.scss']
})
export class PaneComponent {}
