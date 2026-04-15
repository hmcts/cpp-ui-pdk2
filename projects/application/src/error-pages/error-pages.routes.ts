import { Routes } from '@angular/router';
import { SignedOutErrorPageComponent } from './signed-out-error-page/signed-out-error-page.component';

export const ERROR_ROUTE_PATHS = {
  unauthorised: 'unauthorised-access',
  technicalError: 'technical-error',
  downloadError: 'download-error',
  pageNotFound: 'page-not-found',
  signedOutError: 'signed-out-error',
  timedOutError: 'timed-out-error',
  serviceUnavailable: 'service-unavailable'
};

export const ERROR_PAGES_ROUTES: Routes = [
  {
    path: ERROR_ROUTE_PATHS.unauthorised,
    loadComponent: () =>
      import('./unauthorised-page/unauthorised-page.component').then(
        (c) => c.UnauthorisedPageComponent
      ),
    pathMatch: 'full',
    data: { title: 'Unauthorised access | Common platform' }
  },
  {
    path: ERROR_ROUTE_PATHS.technicalError,
    pathMatch: 'full',
    loadComponent: () =>
      import('./technical-error-page/technical-error-page.component').then(
        (c) => c.TechnicalErrorPageComponent
      ),
    data: { title: 'Technical error | Common platform' }
  },
  {
    path: ERROR_ROUTE_PATHS.downloadError,
    pathMatch: 'full',
    loadComponent: () =>
      import('./download-error-page/download-error-page.component').then(
        (c) => c.DownloadErrorPageComponent
      ),
    data: { title: 'Page download error | Common platform' }
  },
  {
    path: ERROR_ROUTE_PATHS.pageNotFound,
    pathMatch: 'full',
    loadComponent: () =>
      import('./not-found-page/not-found-page.component').then((c) => c.NotFoundPageComponent),
    data: { title: 'Page not found | Common platform' }
  },
  {
    path: ERROR_ROUTE_PATHS.signedOutError,
    pathMatch: 'full',
    loadComponent: () =>
      import('./signed-out-error-page/signed-out-error-page.component').then(
        (c) => c.SignedOutErrorPageComponent
      ),
    data: { title: 'Signed out | Common platform' }
  },
  {
    path: ERROR_ROUTE_PATHS.timedOutError,
    pathMatch: 'full',
    loadComponent: () =>
      import('./timed-out-page/timed-out-error-page.component').then(
        (c) => c.TimedOutErrorPageComponent
      ),
    data: { title: 'Timed out | Common platform' }
  },
  {
    path: ERROR_ROUTE_PATHS.serviceUnavailable,
    pathMatch: 'full',
    loadComponent: () =>
      import('./service-unavailable-page/service-unavailable-error-page.component').then(
        (c) => c.ServiceUnavailableErrorPageComponent
      ),
    data: { title: 'Service unavailable | Common platform' }
  },
  {
    path: '**',
    pathMatch: 'full',
    loadComponent: () =>
      import('./not-found-page/not-found-page.component').then((c) => c.NotFoundPageComponent),
    data: { title: 'Page not found | Common platform' }
  }
];
