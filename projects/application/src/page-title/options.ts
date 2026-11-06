import { InjectionToken } from '@angular/core';

export interface CppPageTitleOptions {
  /** Added after the page title. Default 'Common Platform – HMCTS'. */
  suffix?: string;
}

export const CPP_PAGE_TITLE_OPTIONS = new InjectionToken<CppPageTitleOptions>(
  'CPP_PAGE_TITLE_OPTIONS'
);
