import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'pdk-skip-link',
  template: `
    <a class="govuk-skip-link" href="javascript:void(0)" (click)="scrollToTarget()">
      Skip to main content
    </a>
  `,
  styleUrls: ['./skip-link.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PdkSkipLinkComponent {
  @Input() target;

  scrollToTarget() {
    const elem = document.getElementById(this.target);

    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
      elem.focus();
    }
  }
}
