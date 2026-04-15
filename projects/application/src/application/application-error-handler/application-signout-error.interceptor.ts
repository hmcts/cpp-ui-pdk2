import { Location } from '@angular/common';
import {
  HttpErrorResponse,
  HttpHandler,
  HttpHandlerFn,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorRouteState } from '../../error-pages/error-route-state.interface';
import { EnvironmentConfig, ENV_CONFIG } from './error-handler.interfaces';

@Injectable({ providedIn: 'root' })
export class ApplicationSignoutErrorInterceptor implements HttpInterceptor {
  errorRouteState = {} as ErrorRouteState;
  constructor(
    private router: Router,
    private location: Location,
    @Inject(ENV_CONFIG) private environment: EnvironmentConfig
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && this.environment.production) {
          const redirectUrl = this.router.routerState.snapshot.url;
          this.errorRouteState.redirectUrl = this.location.prepareExternalUrl(redirectUrl);
          this.errorRouteState.errorPath = '/signed-out-error';
          this.router.navigate([this.errorRouteState.errorPath], { state: this.errorRouteState });
        }
        return throwError(() => error);
      })
    );
  }
}
