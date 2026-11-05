import { Routes } from '@angular/router';
import { ERROR_PAGES_ROUTES } from '../error-pages/error-pages.routes';
import { SYSTEM_ANNOUNCEMENT_PAGE_ROUTES } from '../layout/system-announcements/system-announcements-route';

/**
 * Our error and system announcement pages already have a complete title, ending in their own
 * "| Common platform", so the tab shows them exactly as they are, with no suffix added.
 */
const COMPLETE_TITLE_ROUTES: Routes = [...ERROR_PAGES_ROUTES, ...SYSTEM_ANNOUNCEMENT_PAGE_ROUTES];

export const COMPLETE_PAGE_TITLES: string[] = COMPLETE_TITLE_ROUTES.map(
  (route) => route.data?.['title']
);
