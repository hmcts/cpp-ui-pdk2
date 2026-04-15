import { Route } from '@angular/router';
import { gettingStartedRoutes } from './getting-started/getting-started.routes';
import { componentsRoutes } from './components/components.routes';
import { HomeComponent } from './home/home.component';
import { patternsRoutes } from './patterns/patterns.routes';
import { stylesRoutes } from './styles/styles.routes';

export const routes: Route[] = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'getting-started',
    children: gettingStartedRoutes
  },
  {
    path: 'styles',
    children: stylesRoutes
  },
  {
    path: 'components',
    children: componentsRoutes
  },
  {
    path: 'patterns',
    children: patternsRoutes
  }
];
