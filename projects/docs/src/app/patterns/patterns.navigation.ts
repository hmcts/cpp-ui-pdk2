import { NavSection } from '../common/common.interfaces';

export const navSections: Array<NavSection> = [
  {
    heading: 'Common Platform',
    navItems: [
      {
        title: 'Installation',
        routerLink: '/patterns/cpp/installation'
      },
      {
        title: 'Application layout',
        routerLink: '/patterns/cpp/layout'
      }
    ]
  }
];
