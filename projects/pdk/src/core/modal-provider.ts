import { Provider } from '@angular/core';
import { ModalService } from './modal';
import { Overlay } from '@angular/cdk/overlay';

export const provideModalServices = (): Provider[] => {
  return [Overlay, ModalService];
};
