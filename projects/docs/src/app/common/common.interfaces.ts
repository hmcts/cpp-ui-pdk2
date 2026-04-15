export interface NavItem {
  title: string;
  routerLink: string | string[];
}

export interface NavSection {
  heading?: string;
  navItems: NavItem[];
}
