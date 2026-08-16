import { InjectionToken } from '@angular/core';

export interface OsPlacesConfig {
  baseUrl: string;
  apiKey?: string;
  dataset: 'DPA' | 'LPI' | 'DPA,LPI';
}

export const ADDRESS_LOOKUP_CONFIG = new InjectionToken<OsPlacesConfig>('ADDRESS_LOOKUP_CONFIG');
