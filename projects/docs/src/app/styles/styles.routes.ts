import { Route } from '@angular/router';
import { StylesLayoutComponent } from './styles.layout';
import { AccessibilityComponent } from './pages/accessibility';
import { ColourComponent } from './pages/colour';
import { LayoutComponent } from './pages/layout';
import { OverviewComponent } from './pages/overview';
import { SpacingComponent } from './pages/spacing';
import { TypographyComponent } from './pages/typography';

export const stylesRoutes: Route[] = [
  {
    path: '',
    component: StylesLayoutComponent,
    children: [
      {
        path: '',
        component: OverviewComponent,
        data: {
          title: 'Styles overview'
        }
      },
      {
        path: 'accessibility',
        component: AccessibilityComponent,
        data: {
          title: 'Accessibility'
        }
      },
      {
        path: 'colour',
        component: ColourComponent,
        data: {
          title: 'Colour'
        }
      },
      {
        path: 'layout',
        component: LayoutComponent,
        data: {
          title: 'Layout'
        }
      },
      {
        path: 'spacing',
        component: SpacingComponent,
        data: {
          title: 'Spacing'
        }
      },
      {
        path: 'typography',
        component: TypographyComponent,
        data: {
          title: 'Typography'
        }
      }
    ]
  }
];
