import { Injectable, ErrorHandler, Inject, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { EnvironmentConfig, ENV_CONFIG } from './error-handler.interfaces';

@Injectable()
export class ApplicationErrorHandlerService extends ErrorHandler {
  // we use the injector for DI because the Errorhandlers are created before all injected Services.
  readonly router = inject(Router);

  constructor(
    private location: Location,
    @Inject(ENV_CONFIG) private environment: EnvironmentConfig
  ) {
    super();
  }

  handleError(error: Error) {
    const lazyLoadingError = /Loading chunk [\d]+ failed/;
    const { production } = this.environment;
    const userIsSignedOut =
      (error instanceof HttpErrorResponse && error.status === 401) ||
      lazyLoadingError.test(error.message);

    if (this.router && this.router.routerState && userIsSignedOut && production) {
      const redirectUrl = this.router.routerState.snapshot.url;

      // Preference would have been to display signout page but for  lazy loading errors, the router is broken.
      // we force a hard redirect to trigger idam gateway. In this instance login screen is shown directly
      window.location.href = this.location.prepareExternalUrl(redirectUrl);
    } else {
      super.handleError(error);
    }
  }
}
