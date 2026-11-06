import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { provideRouter, Route, TitleStrategy, withRouterConfig } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { ERROR_PAGES_ROUTES, ERROR_ROUTE_PATHS } from '../../error-pages/error-pages.routes';
import {
  SYSTEM_ANNOUNCEMENT_PAGE_ROUTES,
  SYSTEM_ANNOUNCEMENT_ROUTES
} from '../../layout/system-announcements/system-announcements-route';
import { PageTitleService } from '../service';
import { PageTitleStrategy } from '../strategy';

@Component({ template: '' })
class DummyComponent {}

// The real routes and titles, with a dummy component so the pages themselves aren't rendered
const withDummyComponent = (route: Route): Route => ({
  ...route,
  loadComponent: undefined,
  component: DummyComponent
});

describe('PageTitleStrategy', () => {
  let title: jest.Mocked<Title>;
  let harness: RouterTestingHarness;

  beforeEach(async () => {
    title = { setTitle: jest.fn(), getTitle: jest.fn() } as any;

    TestBed.configureTestingModule({
      providers: [
        { provide: Title, useValue: title },
        { provide: TitleStrategy, useClass: PageTitleStrategy },
        provideRouter(
          [
            { path: 'static', component: DummyComponent, data: { title: 'My hearing list' } },
            { path: 'resolved', component: DummyComponent, title: () => 'Resolved page' },
            {
              path: 'case/:caseId',
              component: DummyComponent,
              data: { title: 'Case details' },
              children: [
                { path: '', component: DummyComponent },
                {
                  path: 'materials',
                  component: DummyComponent,
                  data: { title: 'Case materials' }
                },
                { path: 'notes', component: DummyComponent }
              ]
            },
            { path: 'untitled', component: DummyComponent },
            {
              path: SYSTEM_ANNOUNCEMENT_ROUTES[0].path,
              children: SYSTEM_ANNOUNCEMENT_PAGE_ROUTES.map(withDummyComponent)
            },
            ...ERROR_PAGES_ROUTES.map(withDummyComponent)
          ],
          withRouterConfig({ paramsInheritanceStrategy: 'always' })
        )
      ]
    });

    harness = await RouterTestingHarness.create();
  });

  it('should use data.title of the deepest activated route', async () => {
    await harness.navigateByUrl('/case/123/materials');

    expect(title.setTitle).toHaveBeenLastCalledWith('Case materials – Common Platform – HMCTS');
  });

  it('should inherit data.title through an empty path child', async () => {
    await harness.navigateByUrl('/case/123');

    expect(title.setTitle).toHaveBeenLastCalledWith('Case details – Common Platform – HMCTS');
  });

  it('should inherit data.title from the parent route', async () => {
    await harness.navigateByUrl('/case/123/notes');

    expect(title.setTitle).toHaveBeenLastCalledWith('Case details – Common Platform – HMCTS');
  });

  it('should prefer a resolved route title', async () => {
    await harness.navigateByUrl('/resolved');

    expect(title.setTitle).toHaveBeenLastCalledWith('Resolved page – Common Platform – HMCTS');
  });

  it('should fall back to the suffix when no route declares a title', async () => {
    await harness.navigateByUrl('/untitled');

    expect(title.setTitle).toHaveBeenLastCalledWith('Common Platform – HMCTS');
  });

  it.each([
    [ERROR_ROUTE_PATHS.unauthorised, 'Unauthorised access | Common platform'],
    [ERROR_ROUTE_PATHS.technicalError, 'Technical error | Common platform'],
    [ERROR_ROUTE_PATHS.downloadError, 'Page download error | Common platform'],
    [ERROR_ROUTE_PATHS.pageNotFound, 'Page not found | Common platform'],
    [ERROR_ROUTE_PATHS.signedOutError, 'Signed out | Common platform'],
    [ERROR_ROUTE_PATHS.timedOutError, 'Timed out | Common platform'],
    [ERROR_ROUTE_PATHS.serviceUnavailable, 'Service unavailable | Common platform'],
    ['no-such-page', 'Page not found | Common platform'],
    ['system-announcements/notifications', 'System Announcements | Common platform']
  ])('should leave the title of /%s as it is', async (url, expected) => {
    await harness.navigateByUrl(`/${url}`);

    expect(title.setTitle).toHaveBeenLastCalledWith(expected);
  });

  it('should add the suffix again after leaving an error page', async () => {
    await harness.navigateByUrl(`/${ERROR_ROUTE_PATHS.technicalError}`);
    await harness.navigateByUrl('/static');

    expect(title.setTitle).toHaveBeenLastCalledWith('My hearing list – Common Platform – HMCTS');
  });

  it('should combine with the information on later navigations', async () => {
    TestBed.inject(PageTitleService).setInformation('Foo');

    await harness.navigateByUrl('/static');

    expect(title.setTitle).toHaveBeenLastCalledWith(
      'Foo – My hearing list – Common Platform – HMCTS'
    );
  });
});
