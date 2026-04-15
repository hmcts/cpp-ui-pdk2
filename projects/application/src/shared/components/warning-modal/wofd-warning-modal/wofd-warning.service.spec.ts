import { TestBed } from '@angular/core/testing';
import { ModalService } from '@cpp/pdk';
import { WofdWarningService } from './wofd-warning.service';
import { WarningModalComponent } from '../warning-modal.component';
import { expect } from '@jest/globals';

describe('WofdWarningService', () => {
  let service: WofdWarningService;
  let modalService: jest.Mocked<ModalService>;

  beforeEach(() => {
    const mockModalService = {
      open: jest.fn()
    };

    TestBed.configureTestingModule({
      providers: [WofdWarningService, { provide: ModalService, useValue: mockModalService }]
    });

    service = TestBed.inject(WofdWarningService);
    modalService = TestBed.inject(ModalService) as jest.Mocked<ModalService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('isWofdApplication', () => {
    it('should return true for application code PL84501', () => {
      expect(service.isWofdApplication([{ code: 'PL84501' }])).toBe(true);
    });

    it('should return true for application code PL84502', () => {
      expect(service.isWofdApplication([{ code: 'PL84502' }])).toBe(true);
    });

    it('should return false for non-WOFD application codes', () => {
      expect(service.isWofdApplication([{ code: 'OTHER_CODE' }])).toBe(false);
    });

    it('should return false for empty array', () => {
      expect(service.isWofdApplication([])).toBe(false);
    });

    it('should return false for null/undefined', () => {
      expect(service.isWofdApplication(null as any)).toBe(false);
      expect(service.isWofdApplication(undefined as any)).toBe(false);
    });

    it('should return false when code is undefined', () => {
      expect(service.isWofdApplication([{}])).toBe(false);
    });

    it('should return true when at least one application type matches', () => {
      expect(service.isWofdApplication([{ code: 'OTHER_CODE' }, { code: 'PL84501' }])).toBe(true);
    });
  });

  describe('showModal', () => {
    it('should call ModalService.open with WarningModalComponent', () => {
      const onProceed = jest.fn();
      const disposeSpy = jest.fn();
      modalService.open.mockReturnValue({ dispose: disposeSpy } as any);

      service.showModal({ onProceed });

      expect(modalService.open).toHaveBeenCalledWith(
        WarningModalComponent,
        expect.objectContaining({
          disposeOnBackDropClick: false,
          data: expect.objectContaining({
            title: 'Warning',
            messages: expect.arrayContaining([
              'You are accessing an application for a Warrant of Further Detention.'
            ]),
            proceedButtonText: 'Proceed to application',
            cancelLinkText: 'Cancel'
          })
        })
      );
    });

    it('should call onProceed and dispose overlay when proceed action is triggered', () => {
      const onProceed = jest.fn();
      const disposeSpy = jest.fn();
      modalService.open.mockReturnValue({ dispose: disposeSpy } as any);

      service.showModal({ onProceed });

      const config = modalService.open.mock.calls[0][1] as any;
      config.data.onProceed();

      expect(onProceed).toHaveBeenCalled();
      expect(disposeSpy).toHaveBeenCalled();
    });

    it('should call onCancel and dispose overlay when cancel action is triggered', () => {
      const onProceed = jest.fn();
      const onCancel = jest.fn();
      const disposeSpy = jest.fn();
      modalService.open.mockReturnValue({ dispose: disposeSpy } as any);

      service.showModal({ onProceed, onCancel });

      const config = modalService.open.mock.calls[0][1] as any;
      config.data.onCancel();

      expect(onCancel).toHaveBeenCalled();
      expect(disposeSpy).toHaveBeenCalled();
    });

    it('should handle cancel without onCancel callback', () => {
      const onProceed = jest.fn();
      const disposeSpy = jest.fn();
      modalService.open.mockReturnValue({ dispose: disposeSpy } as any);

      service.showModal({ onProceed });

      const config = modalService.open.mock.calls[0][1] as any;
      config.data.onCancel();

      expect(disposeSpy).toHaveBeenCalled();
    });
  });
});
