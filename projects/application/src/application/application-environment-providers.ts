import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  EnvironmentProviders,
  ErrorHandler,
  makeEnvironmentProviders,
  Provider
} from '@angular/core';
import { ApplicationErrorHandlerService } from './application-error-handler/application-error-handling.service';
import { ApplicationSignoutErrorInterceptor } from './application-error-handler/application-signout-error.interceptor';
import {
  EnvironmentConfig,
  ENV_CONFIG
} from './application-error-handler/error-handler.interfaces';
import { ADDRESS_LOOKUP_CONFIG } from '../shared/components/address-lookup/ordnance-survey-places.config';
import { provideCppCookieServices } from '@cpp/core';

/**Provides services and interceptors on the cpp application top level
 * This should only be provided once - preferrably when consumer app is bootstrapped
 * or the top parent route
 * @param overrideProviders - providers that override the defaults, e.g. ADDRESS_LOOKUP_CONFIG
 */
export const provideCPPApplicationEnvironment = (
  environment: EnvironmentConfig,
  overrideProviders: Provider[] = []
): EnvironmentProviders => {
  return makeEnvironmentProviders([
    {
      provide: ENV_CONFIG,
      useValue: environment
    },
    {
      provide: ErrorHandler,
      useClass: ApplicationErrorHandlerService
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApplicationSignoutErrorInterceptor,
      multi: true
    },
    {
      provide: ADDRESS_LOOKUP_CONFIG,
      useValue: {
        baseUrl: 'https://api.os.uk/search/places/v1',
        apiKey: 'TB2jKU6zEtmRBdq6c6kTgVX6muD71UsD',
        dataset: 'DPA'
      }
    },
    provideCppCookieServices(),
    ...overrideProviders
  ]);
};
