import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

export type ArrowLinkDirection = 'forward' | 'backward';

@Component({
  selector: 'pdk-arrow-link',
  styleUrls: ['./arrow-link.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      [class.govuk-pagination__prev]="type === 'backward'"
      [class.govuk-pagination__next]="type === 'forward'"
      [class.pdk-arrow-link--forward]="type === 'forward'"
    >
      <a
        class="govuk-link govuk-pagination__link pdk-arrow-link"
        href="javascript:void(0)"
        [attr.rel]="rel"
        (click)="linkClick.emit()"
      >
        @if (type === 'backward') {
        <svg
          class="govuk-pagination__icon govuk-pagination__icon--prev pdk-arrow-link--icon"
          xmlns="http://www.w3.org/2000/svg"
          height="13"
          width="15"
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 15 13"
        >
          <path
            d="m6.5938-0.0078125-6.7266 6.7266 6.7441 6.4062 1.377-1.449-4.1856-3.9768h12.896v-2h-12.984l4.2931-4.293-1.414-1.414z"
          ></path>
        </svg>
        } @if (type === 'forward') {
        <svg
          class="govuk-pagination__icon govuk-pagination__icon--next pdk-arrow-link--icon"
          xmlns="http://www.w3.org/2000/svg"
          height="13"
          width="15"
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 15 13"
        >
          <path
            d="m8.107-0.0078125-1.4136 1.414 4.2926 4.293h-12.986v2h12.896l-4.1855 3.9766 1.377 1.4492 6.7441-6.4062-6.7246-6.7266z"
          ></path>
        </svg>
        }
        <span class="govuk-pagination__link-title">{{ title || rel }}</span>
        <span class="govuk-pagination__link-label pdk-arrow-link__subtitle"
          ><ng-content></ng-content
        ></span>
      </a>
    </div>
  `
})
export class PdkArrowLinkComponent {
  @Input() title: string;
  @Input() type: ArrowLinkDirection = 'forward';
  @Output() linkClick = new EventEmitter<void>();
  get rel() {
    return this.type === 'forward' ? 'Next' : 'Previous';
  }
}

@Component({
  selector: 'pdk-arrow-navigation',
  template: `
    <nav class="govuk-pagination govuk-pagination--block"><ng-content></ng-content></nav>
  `
})
export class PdkArrowLinksComponent {}
