import { Injectable } from '@angular/core';
import { ModalService } from '@cpp/pdk';
import { WarningModalComponent, WarningModalData } from '../warning-modal.component';

// WOFD: Application for a warrant for further detention
const WOFD_APPLICATION_CODES = ['PL84501', 'PL84502'];

@Injectable({
  providedIn: 'root'
})
export class WofdWarningService {
  constructor(private modalService: ModalService) {}

  isWofdApplication(applicationTypes: { code?: string }[]): boolean {
    if (!applicationTypes?.length) {
      return false;
    }

    return applicationTypes.some(
      (appType) => appType.code && WOFD_APPLICATION_CODES.includes(appType.code)
    );
  }

  showModal({ onProceed, onCancel }: { onProceed: () => void; onCancel?: () => void }) {
    const overlayRef = this.modalService.open<WarningModalData>(WarningModalComponent, {
      data: {
        title: 'Warning',
        messages: [
          'You are accessing an application for a Warrant of Further Detention.',
          'You should only access this application where you have the business need to do so.',
          'Access to this application is being recorded.'
        ],
        proceedButtonText: 'Proceed to application',
        cancelLinkText: 'Cancel',
        onProceed: () => {
          onProceed();
          overlayRef.dispose();
        },
        onCancel: () => {
          if (onCancel) {
            onCancel();
          }
          overlayRef.dispose();
        }
      },
      disposeOnBackDropClick: false
    });
  }
}
