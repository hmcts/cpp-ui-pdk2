import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { EnvironmentProviders, ErrorHandler, makeEnvironmentProviders } from '@angular/core';
import { ApplicationErrorHandlerService } from './application-error-handler/application-error-handling.service';
import { ApplicationSignoutErrorInterceptor } from './application-error-handler/application-signout-error.interceptor';
import {
  EnvironmentConfig,
  ENV_CONFIG
} from './application-error-handler/error-handler.interfaces';
import { provideCppCookieServices } from '@cpp/core';

/**Provides services and interceptors on the cpp application top level
 * This should only be provided once - preferrably when consumer app is bootstrapped
 * or the top parent route
 */
export const provideCPPApplicationEnvironment = (
  environment: EnvironmentConfig
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
    provideCppCookieServices()
  ]);
};
