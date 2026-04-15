import { ChangeDetectionStrategy, Component, Input, NgModule, HostBinding } from '@angular/core';

@Component({
  selector: 'pdk-document-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div style="display: flex; align-items: center; justify-content: center;">
      <i [style.height]="height" [style.width]="width">
        <svg width="100%" height="100%" viewBox="0 0 198 280">
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <rect fill="#FFFFFF" x="0" y="0" width="198" height="280"></rect>
            <g transform="translate(24.000000, 24.000000)" fill="#BFC1C3">
              <g transform="translate(0.000000, 202.000000)">
                <rect x="0" y="0" width="18" height="18"></rect>
                <rect x="36" y="0" width="96" height="18"></rect>
              </g>
              <g transform="translate(0.000000, 166.000000)">
                <rect x="0" y="0" width="18" height="18"></rect>
                <rect x="36" y="0" width="114" height="18"></rect>
              </g>
              <g transform="translate(0.000000, 130.000000)">
                <rect x="0" y="0" width="18" height="18"></rect>
                <rect x="36" y="0" width="78" height="18"></rect>
              </g>
              <g transform="translate(0.000000, 94.000000)">
                <rect x="0" y="0" width="18" height="18"></rect>
                <rect x="36" y="0" width="114" height="18"></rect>
              </g>
              <rect x="0" y="0" width="150" height="54"></rect>
            </g>
          </g>
        </svg>
      </i>
    </div>
  `
})
export class PdkDocumentIconComponent {
  @Input() size = 32;
  @HostBinding('style.display') display = 'inline-block';
  @HostBinding('style.vertical-align') vAlign = 'middle';

  get width(): string {
    return `${this.size}px`;
  }

  get height(): string {
    return `${this.size * 1.4}px`;
  }
}
