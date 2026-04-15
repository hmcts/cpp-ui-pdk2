import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ApplicationErrorHandlerService } from './application-error-handling.service';
import { ENV_CONFIG } from './error-handler.interfaces';

describe('Application Error handling service', () => {
  let prepareExternalUrl: jest.Mock;
  let baseHandleError: jest.SpyInstance;
  let service: ApplicationErrorHandlerService;
  const { location } = window;
  const setHrefSpy = jest.fn((href) => href);

  beforeAll(() => {
    delete window.location;
    window.location = {} as globalThis.Location & string;
    Object.defineProperty(window.location, 'href', {
      set: setHrefSpy
    });
  });

  beforeEach(() => {
    prepareExternalUrl = jest.fn((url) => `/baseHref${url}`);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        ApplicationErrorHandlerService,
        {
          provide: Router,
          useValue: {
            routerState: {
              snapshot: {
                url: '/test.com'
              }
            }
          }
        },
        {
          provide: Location,
          useValue: {
            prepareExternalUrl
          }
        },
        {
          provide: ENV_CONFIG,
          useValue: {
            production: true
          }
        }
      ]
    });
    service = TestBed.inject(ApplicationErrorHandlerService);
  });

  beforeEach(() => {
    baseHandleError = jest
      .spyOn(ErrorHandler.prototype, 'handleError')
      .mockImplementation(() => {});
  });

  it('should set location href when a 401 error is thrown and not caught', () => {
    const error = new HttpErrorResponse({ status: 401 });

    service.handleError(error);

    expect(setHrefSpy).toHaveBeenCalledWith(`/baseHref/test.com`);

    expect(baseHandleError).not.toHaveBeenCalledWith(error);
  });

  it('should navigate to sign out page when network error is thrown and chunks not loaded', () => {
    const error = new Error('Uncaught (in promise): ChunkLoadError: Loading chunk 11 failed.');

    service.handleError(error);

    expect(setHrefSpy).toHaveBeenCalledWith(`/baseHref/test.com`);

    expect(baseHandleError).not.toHaveBeenCalledWith(error);
  });

  it('should only call base handle error for any other error type', () => {
    const error = new HttpErrorResponse({ status: 404 });

    setHrefSpy.mockReset();

    service.handleError(error);

    expect(setHrefSpy).not.toHaveBeenCalled();

    expect(baseHandleError).toHaveBeenCalledWith(error);
  });

  afterAll(() => {
    window.location = location as string & globalThis.Location;
  });
});
