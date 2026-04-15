import { inject, Injectable, InjectionToken, Injector } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType } from '@angular/cdk/portal';

export const PDK_MODAL_REF = new InjectionToken('PDK_MODAL_REF');
export const PDK_MODAL_DATA_TOKEN = new InjectionToken('PDK_MODAL_DATA');

interface Config<D extends Record<string, unknown>> extends OverlayConfig {
  data?: D;
  disposeOnBackDropClick?: boolean;
}

const DEFAULT_CONFIG: OverlayConfig = {
  hasBackdrop: true,
  backdropClass: 'cdk-overlay-dark-backdrop',
  panelClass: 'pdk-modal__panel',
  width: 'auto',
  height: 'auto'
};

@Injectable({ providedIn: 'root' })
export class ModalService {
  readonly overlay = inject(Overlay);
  readonly injector = inject(Injector);
  constructor() {}

  open<D extends Record<string, unknown> = Record<string, unknown>>(
    Component: ComponentType<unknown>,
    { data, disposeOnBackDropClick = true, ...config }: Partial<Config<D>> = {}
  ): OverlayRef {
    const overlayConfig = this.getOverlayConfig({ ...DEFAULT_CONFIG, ...config });
    const overlayRef = this.overlay.create(overlayConfig);
    const injector = Injector.create({
      parent: this.injector,
      providers: [
        {
          provide: PDK_MODAL_REF,
          useValue: overlayRef
        },
        {
          provide: PDK_MODAL_DATA_TOKEN,
          useValue: data || {}
        }
      ]
    });
    const componentPortal = new ComponentPortal(Component, null, injector);

    // Attach ComponentPortal to PortalHost
    overlayRef.attach(componentPortal);
    if (disposeOnBackDropClick) {
      overlayRef.backdropClick().subscribe(() => overlayRef.dispose());
    }

    return overlayRef;
  }

  private getOverlayConfig(config: Partial<OverlayConfig>): OverlayConfig {
    const positionStrategy = this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically();

    const overlayConfig = new OverlayConfig({
      ...config,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy
    });

    return overlayConfig;
  }
}
