import { COMPLETE_PAGE_TITLES } from '../complete-page-titles';

describe('COMPLETE_PAGE_TITLES', () => {
  it('should have the titles of the error and system announcement pages', () => {
    expect([...new Set(COMPLETE_PAGE_TITLES)].sort()).toEqual([
      'Page download error | Common platform',
      'Page not found | Common platform',
      'Service unavailable | Common platform',
      'Signed out | Common platform',
      'System Announcements | Common platform',
      'Technical error | Common platform',
      'Timed out | Common platform',
      'Unauthorised access | Common platform'
    ]);
  });

  it('should not have an empty title, so every route it is built from has one', () => {
    COMPLETE_PAGE_TITLES.forEach((title) => expect(title).toEqual(expect.any(String)));
    COMPLETE_PAGE_TITLES.forEach((title) => expect(title.trim()).not.toBe(''));
  });
});
