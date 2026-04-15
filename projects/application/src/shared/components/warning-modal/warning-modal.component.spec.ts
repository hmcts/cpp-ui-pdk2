import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { WarningModalComponent, WarningModalData } from './warning-modal.component';
import { PDK_MODAL_REF, PDK_MODAL_DATA_TOKEN } from '@cpp/pdk';

describe('WarningModalComponent', () => {
  let component: WarningModalComponent;
  let fixture: ComponentFixture<WarningModalComponent>;
  let mockOverlayRef: { dispose: jest.Mock };
  let mockData: WarningModalData;

  beforeEach(async () => {
    mockOverlayRef = { dispose: jest.fn() };
    mockData = {
      title: 'Warning',
      messages: ['Message 1', 'Message 2'],
      proceedButtonText: 'Proceed',
      cancelLinkText: 'Cancel',
      onProceed: jest.fn(),
      onCancel: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [WarningModalComponent],
      providers: [
        { provide: PDK_MODAL_REF, useValue: mockOverlayRef },
        { provide: PDK_MODAL_DATA_TOKEN, useValue: mockData }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .overrideComponent(WarningModalComponent, {
        set: {
          imports: [],
          schemas: [NO_ERRORS_SCHEMA]
        }
      })
      .compileComponents();

    fixture = TestBed.createComponent(WarningModalComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct selector', () => {
    const componentDef = (WarningModalComponent as any).ɵcmp;
    expect(componentDef.selectors[0][0]).toBe('cpp-application-warning-modal');
  });

  it('should inject the overlay ref', () => {
    expect(component.overlayRef).toBe(mockOverlayRef);
  });

  it('should inject the modal data', () => {
    expect(component.data).toBe(mockData);
  });

  describe('proceed()', () => {
    it('should call onProceed callback', () => {
      component.proceed();
      expect(mockData.onProceed).toHaveBeenCalled();
    });

    it('should dispose the overlay', () => {
      component.proceed();
      expect(mockOverlayRef.dispose).toHaveBeenCalled();
    });
  });

  describe('cancel()', () => {
    it('should call onCancel callback if provided', () => {
      component.cancel();
      expect(mockData.onCancel).toHaveBeenCalled();
    });

    it('should dispose the overlay', () => {
      component.cancel();
      expect(mockOverlayRef.dispose).toHaveBeenCalled();
    });

    it('should not throw when onCancel is not provided', () => {
      mockData.onCancel = undefined;
      expect(() => component.cancel()).not.toThrow();
      expect(mockOverlayRef.dispose).toHaveBeenCalled();
    });
  });
});
