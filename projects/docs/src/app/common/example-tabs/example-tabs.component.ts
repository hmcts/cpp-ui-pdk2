import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  QueryList,
  ViewEncapsulation
} from '@angular/core';
import { ExampleTabComponent } from './example-tab.component';

import { PdkLinkDirective } from '@cpp/pdk';

@Component({
  selector: 'docs-example-tabs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="docs-example-tabs">
      <ul class="docs-example-tabs__list" role="tablist" (keydown)="changeTab($event)">
        @for (tab of tabs; track tab.id; let i = $index) {
        <li
          class="docs-example-tabs__list-item"
          [class.docs-example-tabs__list-item--selected]="tab.selected"
          role="presentation"
        >
          <a
            class="docs-example-tabs__tab"
            href="javascript:void(0);"
            (click)="selectTab(i)"
            role="tab"
            [attr.aria-controls]="i"
            [attr.aria-selected]="tab.selected.toString()"
            [attr.tabindex]="tab.tabIndex"
            pdk-link
            unvisited
          >
            {{ tab.title }}
          </a>
        </li>
        }
      </ul>
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./example-tabs.scss'],
  imports: [PdkLinkDirective]
})
export class ExampleTabsComponent {
  @ContentChildren(ExampleTabComponent) tabs: QueryList<ExampleTabComponent>;

  constructor(private cdr: ChangeDetectorRef) {}

  get selectedTabIndex(): number {
    let idx = -1;

    this.tabs.forEach((tab, i) => {
      if (tab.selected) {
        idx = i;
      }
    });
    return idx;
  }

  set selectedTabIndex(selectedTabIndex: number) {
    this.tabs.forEach((t: ExampleTabComponent, i) => {
      t.selected = i === selectedTabIndex;
    });
    this.cdr.markForCheck();
  }

  changeTab(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowLeft':
        this.selectPreviousTab();
        break;
      case 'ArrowDown':
      case 'ArrowRight':
        this.selectNextTab();
        break;
      default:
    }
  }

  selectNextTab() {
    const targetIndex =
      this.selectedTabIndex === this.tabs.length - 1 ? 0 : this.selectedTabIndex + 1;
    this.selectedTabIndex = targetIndex;
  }

  selectPreviousTab() {
    const targetIndex =
      this.selectedTabIndex === 0 ? this.tabs.length - 1 : this.selectedTabIndex - 1;
    this.selectedTabIndex = targetIndex;
  }

  selectTab(targetIndex: number) {
    this.selectedTabIndex = this.selectedTabIndex === targetIndex ? -1 : targetIndex;
  }
}
