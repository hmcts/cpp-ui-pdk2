import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  EventEmitter,
  forwardRef,
  HostBinding,
  Inject,
  Input,
  OnChanges,
  Output,
  QueryList,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { coerceBooleanProperty, generateId } from '../util/index';
import { PdkVisuallyHiddenDirective } from '../core/accessibility';
import { PdkTypographyDirective } from '../core/typography';

@Component({
  selector: 'pdk-accordion-item',
  template: `
    <div class="govuk-accordion__section" [class.govuk-accordion__section--expanded]="open">
      <div class="govuk-accordion__section-header">
        <h2 class="govuk-accordion__section-heading">
          <button
            type="button"
            [attr.id]="id + '-heading'"
            class="govuk-accordion__section-button"
            [attr.aria-controls]="id + '-content'"
            [attr.aria-describedby]="summary ? id + '-summary' : null"
            [attr.aria-expanded]="open"
            (click)="toggle()"
          >
            <span class="govuk-accordion__section-heading-text">
              <span class="govuk-accordion__section-heading-text-focus">
                {{ title }}
              </span>
            </span>

            <span class="govuk-accordion__section-toggle" data-nosnippet>
              <span class="govuk-accordion__section-toggle-focus">
                <span
                  class="govuk-accordion-nav__chevron"
                  [class.govuk-accordion-nav__chevron--down]="!open"
                  aria-hidden="true"
                ></span>
                <span class="govuk-accordion__section-toggle-text">
                  {{ open ? collapseLabel : expandLabel }}
                </span>
              </span>
            </span>
          </button>
        </h2>
        @if(summary) {
        <div
          [attr.id]="id + '-summary'"
          class="govuk-accordion__section-summary"
          pdk-typography="body"
        >
          {{ summary }}
        </div>
        }
      </div>
      <div
        [attr.aria-labelledby]="id + '-heading'"
        [attr.id]="id + '-content'"
        class="govuk-accordion__section-content"
        [attr.hidden]="open ? null : 'until-found'"
      >
        <ng-content></ng-content>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PdkTypographyDirective]
})
export class PdkAccordionItemComponent {
  @Input() title: string;
  @Input() summary?: string;
  @Input() collapseLabel = 'Hide';
  @Input() expandLabel = 'Show';

  id = generateId('govuk-accordion');
  open = false;

  constructor(
    @Inject(forwardRef(() => PdkAccordionComponent)) private accordion: PdkAccordionComponent,
    private cdr: ChangeDetectorRef
  ) {}

  markForCheck() {
    this.cdr.markForCheck();
  }

  toggle() {
    this.open = !this.open;
    this.accordion.updateAndNotifyOpenChange();
  }
}

@Component({
  selector: 'pdk-accordion',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="govuk-accordion">
      @if (controls) {
      <div class="govuk-accordion__controls">
        <button
          type="button"
          class="govuk-accordion__show-all"
          [attr.aria-expanded]="allItemsExpanded"
          (click)="toggleOpenedStatusForAllItems()"
        >
          <span
            class="govuk-accordion-nav__chevron"
            [class.govuk-accordion-nav__chevron--down]="!allItemsExpanded"
          ></span>
          <span class="govuk-accordion__show-all-text">
            {{ allItemsExpanded ? 'Close' : 'Open' }} all<span pdk-visually-hidden> sections</span>
          </span>
        </button>
      </div>
      }
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./accordion.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [PdkVisuallyHiddenDirective]
})
export class PdkAccordionComponent implements AfterContentInit, OnChanges {
  @ContentChildren(PdkAccordionItemComponent) items: QueryList<PdkAccordionItemComponent>;

  @Input()
  set controls(on: boolean) {
    this._controls = coerceBooleanProperty(on);
  }
  get controls() {
    return this._controls;
  }
  @Input() open: number[] = [];
  @Output() openChange = new EventEmitter<number[]>();

  private _controls = true;

  get allItemsExpanded(): boolean {
    return this.items.toArray().every((item) => item.open);
  }

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterContentInit() {
    this.markItemsForCheck();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes['open'].isFirstChange()) {
      this.markItemsForCheck();
      this.openChange.emit(this.open);
    }
  }

  updateAndNotifyOpenChange() {
    this.open = this.items.reduce(
      (items, item, index) => items.concat(item.open ? [index] : []),
      []
    );
    this.cdr.markForCheck();
    this.openChange.emit(this.open);
  }

  markItemsForCheck() {
    this.items.forEach((item, idx) => {
      item.open = (this.open || []).includes(idx);
      item.markForCheck();
    });
  }

  toggleOpenedStatusForAllItems() {
    const allItemsExpanded = this.allItemsExpanded;
    this.items.forEach((item) => {
      item.open = !allItemsExpanded;
      item.markForCheck();
    });
    this.updateAndNotifyOpenChange();
  }
}
