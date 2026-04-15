import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { OverlayRef } from '@angular/cdk/overlay';

import {
  PdkFocusTrapComponent,
  PdkPaddingDirective,
  PdkVisuallyHiddenDirective,
  PdkAlertComponent,
  PdkTypographyDirective,
  PdkMarginDirective,
  PdkButtonComponent,
  PdkButtonDirective,
  PdkLinkDirective,
  PDK_MODAL_REF,
  PDK_MODAL_DATA_TOKEN
} from '@cpp/pdk';

export interface WarningModalData {
  [key: string]: unknown;
  title: string;
  messages: string[];
  proceedButtonText: string;
  cancelLinkText: string;
  onProceed: () => void;
  onCancel?: () => void;
}

@Component({
  selector: 'cpp-application-warning-modal',
  template: `
    <div class="warning-modal-overlay" pdk-focus-trap role="alertdialog">
      <div class="warning-modal-dialog">
        <div class="warning-modal-content">
          <div pdk-padding="4">
            <h2 pdk-visually-hidden>{{ data.title }}</h2>
            <pdk-alert icon="true" type="warning" pdk-typography="body-medium">
              <span pdk-visually-hidden>Warning: </span>
              {{ data.title }}
            </pdk-alert>
            @for (message of data.messages; track message) {
            <p pdk-typography="body-medium" pdk-margin-top="2">
              {{ message }}
            </p>
            }
            <div class="button-holder" pdk-margin-top="4">
              <button
                pdk-button
                pdk-margin-bottom="0"
                type="button"
                data-test-id="warningProceedButton"
                (click)="proceed()"
              >
                {{ data.proceedButtonText }}
              </button>
              <a
                pdk-link
                pdk-margin-left="4"
                href="javascript:void(0);"
                data-test-id="warningCancelLink"
                (click)="cancel()"
              >
                {{ data.cancelLinkText }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .button-holder {
        display: flex;
        align-items: center;
      }
      .warning-modal-overlay {
        display: block;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1050;
      }
      .warning-modal-dialog {
        position: relative;
        margin: 1.75rem auto;
        max-width: 500px;
      }
      .warning-modal-content {
        background-color: #fff;
        border-radius: 4px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    PdkFocusTrapComponent,
    PdkPaddingDirective,
    PdkVisuallyHiddenDirective,
    PdkAlertComponent,
    PdkTypographyDirective,
    PdkMarginDirective,
    PdkButtonComponent,
    PdkButtonDirective,
    PdkLinkDirective
  ]
})
export class WarningModalComponent {
  readonly overlayRef = inject(PDK_MODAL_REF) as OverlayRef;
  readonly data = inject(PDK_MODAL_DATA_TOKEN) as WarningModalData;

  proceed() {
    this.data.onProceed();
    this.overlayRef.dispose();
  }

  cancel() {
    if (this.data.onCancel) {
      this.data.onCancel();
    }
    this.overlayRef.dispose();
  }
}
