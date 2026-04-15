import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  QueryList
} from '@angular/core';
import { PdkTabComponent } from './tab.component';
import { PdkTabsContainerComponent } from './tabs-container.component';
import { NgTemplateOutlet } from '@angular/common';

export interface TabChangeEvent {
  index: number;
  source: PdkTabComponent;
}

@Component({
  selector: 'pdk-tabs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <pdk-tabs-container [vertical]="vertical">
      <ul class="govuk-tabs__list" role="tablist" (keydown)="changeTab($event)">
        @for (tab of tabs; track tab.index) {
        <li
          class="govuk-tabs__list-item"
          [class.govuk-tabs__list-item--selected]="tab.selected"
          role="presentation"
        >
          <a
            class="govuk-tabs__tab"
            href="javascript:void(0);"
            (click)="selectedTabIndex = tab.index"
            role="tab"
            [attr.aria-controls]="'pdk-tab-section-' + (tab.id || tab.index)"
            [attr.aria-selected]="tab.selected ? 'true' : 'false'"
            [attr.tabindex]="tab.selected ? '0' : '-1'"
          >
            @if (tab.heading) {
            {{ tab.heading }}
            }
            <ng-container *ngTemplateOutlet="tab.headingTemplate"></ng-container>
          </a>
        </li>
        }
      </ul>
      <ng-content></ng-content>
    </pdk-tabs-container>
  `,
  imports: [PdkTabsContainerComponent, NgTemplateOutlet]
})
export class PdkTabsetComponent implements AfterContentInit {
  @Input() vertical = false;

  @ContentChildren(PdkTabComponent) tabs: QueryList<PdkTabComponent>;

  private _selectedTabIndex = 0;
  private _selectedTabId: string;

  @Input()
  get selectedTabIndex() {
    return this._selectedTabIndex;
  }

  set selectedTabIndex(value: number) {
    this._selectedTabIndex = value;
    this.showTab();
  }

  @Input()
  get selectedTabId(): string {
    return this._selectedTabId;
  }

  set selectedTabId(value: string) {
    this._selectedTabId = value;
    if (this.tabs) {
      this.selectedTabIndex = this.getSelectedTabById().index;
    }
  }

  @Output()
  selectedTabChange = new EventEmitter<PdkTabComponent>();

  constructor(private elementRef: ElementRef, private changeDetector: ChangeDetectorRef) {}

  changeTab(event: any) {
    switch (event.keyCode) {
      case 37:
      case 38:
        this.selectPreviousTab();
        break;
      case 39:
      case 40:
        this.selectNextTab();
        break;
      default:
    }
  }

  getSelectedTabById(): PdkTabComponent {
    return this.tabs.find((tab) => tab.id === this._selectedTabId) as PdkTabComponent;
  }

  getSelectedTabByIndex(): PdkTabComponent {
    return this.tabs.find((tab) => tab.index === this._selectedTabIndex) as PdkTabComponent;
  }

  selectNextTab() {
    const targetIndex =
      this._selectedTabIndex === this.tabs.length - 1 ? 0 : this._selectedTabIndex + 1;
    this.selectedTabIndex = targetIndex;
  }

  selectPreviousTab() {
    const targetIndex =
      this._selectedTabIndex === 0 ? this.tabs.length - 1 : this._selectedTabIndex - 1;
    this.selectedTabIndex = targetIndex;
  }

  selectTab(targetIndex: number) {
    this.selectedTabIndex = targetIndex;
  }

  showTab() {
    if (this.tabs) {
      this.tabs.forEach((t: PdkTabComponent) => {
        t.selected = t.index === this._selectedTabIndex;
      });
      this.selectedTabChange.emit(this.getSelectedTabByIndex());
      this.changeDetector.markForCheck();
    }
  }

  ngAfterContentInit() {
    this.tabs.forEach((tab: PdkTabComponent, index: number) => (tab.index = index));
    if (this._selectedTabId) {
      this.selectedTabIndex = this.getSelectedTabById().index;
    }
    this.showTab();
  }
}
