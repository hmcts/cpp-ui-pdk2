import { Route } from '@angular/router';
import { LayoutComponent } from './getting-started.layout';
import { OverviewComponent } from './pages/overview';
import { InstallationComponent } from './pages/installation';

export const gettingStartedRoutes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: OverviewComponent,
        data: {
          title: 'Getting started overview'
        }
      },
      {
        path: 'installation',
        component: InstallationComponent,
        data: {
          title: 'Installation'
        }
      }
    ]
  }
];
