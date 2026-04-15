import { PdkTabComponent } from './tab.component';
import { PdkTabsContainerComponent } from './tabs-container.component';
import {
  PdkTabsLinkDirective,
  PdkTabsNavItemDirective,
  PdkTabsNavigationComponent
} from './tabs-navigation.component';
import { PdkTabHeadingComponent } from './tab-heading.component';
import { PdkTabsetComponent, TabChangeEvent } from './tabs.component';

export const PdkTabs = [
  PdkTabsLinkDirective,
  PdkTabsNavItemDirective,
  PdkTabsNavigationComponent,
  PdkTabsetComponent,
  PdkTabHeadingComponent,
  PdkTabComponent,
  PdkTabsContainerComponent
] as const;
export {
  TabChangeEvent,
  PdkTabsLinkDirective,
  PdkTabsNavItemDirective,
  PdkTabsNavigationComponent,
  PdkTabsetComponent,
  PdkTabHeadingComponent,
  PdkTabComponent,
  PdkTabsContainerComponent
};
