import { Component, Input } from '@angular/core';

@Component({
  selector: 'docs-example-tab',
  template: `
    <section
      [attr.id]="id"
      [attr.aria-hidden]="!selected"
      [class.docs-example-tabs__panel--hidden]="!selected"
      class="docs-example-tabs__panel"
      role="tabpanel"
    >
      <ng-content></ng-content>
    </section>
  `
})
export class ExampleTabComponent {
  @Input() title: string;
  @Input() selected = false;
  @Input() id: string;

  get tabIndex(): string {
    return this.selected ? '0' : '-1';
  }
}
