import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { generateId } from '../util/index';

@Component({
  selector: 'pdk-collapsable',
  template: `
    <div class="pdk-collapsable">
      <div class="pdk-collapsable__header">
        <button
          class="pdk-collapsable__button"
          type="button"
          (click)="toggleCollapsed()"
          [attr.aria-label]="ariaLabel"
          [attr.aria-controls]="collapseIds"
          [attr.aria-expanded]="!collapsed"
        >
          <div
            class="pdk-collapsable__toggle"
            [class.pdk-collapsable__toggle--expanded]="!collapsed"
          >
            @if (!collapsed) {
            <svg
              role="presentation"
              focusable="false"
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="17"
              viewBox="0 0 13 17"
            >
              <path fill="white" d="M6.5 0L0 6.5 1.4 8l4-4v12.7h2V4l4.3 4L13 6.4z"></path>
            </svg>
            } @if (collapsed) {
            <svg
              role="presentation"
              focusable="false"
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="17"
              viewBox="0 0 13 17"
            >
              <path fill="white" d="M6.5 0L0 6.5 1.4 8l4-4v12.7h2V4l4.3 4L13 6.4z"></path>
            </svg>
            }
          </div>
          <span class="pdk-collapsable__button-text">
            {{ collapsed ? collapsedLabel || 'Show' : expandedLabel || 'Hide' }}
          </span>
        </button>
      </div>
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./collapsable.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PdkCollapsableComponent {
  @Input() ariaLabel: string;
  @Input() collapsedLabel: string;
  @Input() expandedLabel: string;
  @Input()
  get collapsed(): boolean {
    return this._collapsed;
  }
  set collapsed(collapsed: boolean) {
    this._collapsed = collapsed;
    this._collapses.forEach((child) => (child.collapsed = collapsed));
    this.changeDetectorRef.markForCheck();
  }
  @Output() collapseChange: EventEmitter<boolean> = new EventEmitter();

  private _collapses: PdkCollapseComponent[] = [];
  private _collapsed: boolean;

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  get collapseIds(): string {
    return this._collapses.map((collapse) => collapse.id).join(' ');
  }

  toggleCollapsed() {
    this.collapsed = !this.collapsed;
    this.collapseChange.emit(this.collapsed);
  }

  add(collapse: PdkCollapseComponent) {
    this._collapses.push(collapse);
  }

  remove(collapse: PdkCollapseComponent) {
    const idx = this._collapses.indexOf(collapse);

    this._collapses.splice(idx, 1);
  }
}

@Component({
  selector: 'pdk-collapse, [pdk-collapse]',
  template: ` <ng-content></ng-content> `
})
export class PdkCollapseComponent implements OnDestroy {
  @HostBinding('hidden') @Input() collapsed = false;
  @HostBinding('attr.id') id = generateId('pdk-collapse');

  constructor(private collapsable: PdkCollapsableComponent) {
    this.collapsable.add(this);
  }

  ngOnDestroy() {
    this.collapsable.remove(this);
  }
}
