import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'pdk-activity-indicator',
  template: `
    <div class="pdk-activity-indicator">
      <div class="pdk-activity-indicator__loader" role="status">
        <div class="pdk-activity-indicator__spinner"></div>
        <b class="pdk_activity-indicator__title">Page loading</b>
        <p style="margin-top: 4px">This may take a moment, please wait.</p>
      </div>
    </div>
    <div class="pdk-activity-indicator__backdrop"></div>
  `,
  styleUrls: ['./activity-indicator.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PdkActivityIndicatorComponent {}
