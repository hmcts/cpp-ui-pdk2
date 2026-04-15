import { ChangeDetectionStrategy, Component, HostBinding, Input, NgModule } from '@angular/core';

@Component({
  selector: 'pdk-file-download-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div style="display: flex; align-items: center; justify-content: center;">
      <i [style.height]="size + 'px'" [style.width]="size + 'px'" [style.fill]="color">
        <svg width="100%" height="100%" viewBox="0 0 30 39">
          <g transform="translate(0, 39) scale(0.1, -0.1)">
            <path d="M0 220 l0 -170 125 0 125 0 0 170 0 170 -125 0 -125 0 0 -170z" />
            <path
              d="M270 185 l0 -155 -110 0 c-91 0 -110 -3 -110 -15 0 -13 21 -15 125 -15 l125 0 0 170 c0 144 -2 170 -15 170 -13 0 -15 -24 -15 -155z"
            />
          </g>
        </svg>
      </i>
    </div>
  `
})
export class PdkFileDownloadIconComponent {
  @HostBinding('style.display') display = 'inline-block';
  @HostBinding('style.vertical-align') vAlign = 'middle';
  @Input() color = 'black';
  @Input() size = 32;
}
