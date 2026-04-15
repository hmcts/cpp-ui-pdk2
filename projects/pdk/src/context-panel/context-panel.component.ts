import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

export type ContextPanelType =
  | 'success'
  | 'confirmation'
  | 'active'
  | 'pending'
  | 'notice'
  | 'invalid'
  | 'important'
  | 'de-registered';

export type ContextPanelIconType = 'tick' | 'warn';

@Component({
  selector: 'pdk-context-panel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="pdk-context-panel pdk-context-panel--{{ type || 'success' }}" role="alert">
      @if (icon) {
      <i
        class="pdk-context-panel__icon pdk-context-panel__icon--{{ icon }}"
        role="presentation"
        aria-hidden="true"
      >
      </i>
      }
      <div class="pdk-context-panel__message">
        <div>
          <h3 class="govuk-heading-m">{{ title }}</h3>
          <p class="govuk-body-l"><ng-content></ng-content></p>
        </div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./context-panel.scss']
})
export class PdkContextPanelComponent {
  @Input() icon: ContextPanelIconType;
  @Input() type: ContextPanelType = 'success';
  @Input() title: string;
}
