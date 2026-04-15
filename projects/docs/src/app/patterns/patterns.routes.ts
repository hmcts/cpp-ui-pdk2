import { Route } from '@angular/router';
import { CppInstallationComponent } from './pages/cpp-installation';
import { CppLayoutComponent } from './pages/cpp-layout';
import { OverviewComponent } from './pages/overview';
import { LayoutComponent } from './patterns.layout';

export const patternsRoutes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: OverviewComponent,
        data: {
          title: 'Patterns overview'
        }
      },
      {
        path: 'cpp/installation',
        component: CppInstallationComponent,
        data: {
          title: 'Common Platform installation'
        }
      },
      {
        path: 'cpp/layout',
        component: CppLayoutComponent,
        data: {
          title: 'Common Platform layout'
        }
      }
    ]
  }
];
