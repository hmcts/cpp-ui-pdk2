import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AccessibilityComponent } from './pages/accessibility';
import { ColourComponent } from './pages/colour';
import { LayoutComponent } from './pages/layout';
import { OverviewComponent } from './pages/overview';
import { SpacingComponent } from './pages/spacing';
import { TypographyComponent } from './pages/typography';
import { StylesLayoutComponent } from './styles.layout';

const PAGES = [
  LayoutComponent,
  AccessibilityComponent,
  ColourComponent,
  OverviewComponent,
  SpacingComponent,
  StylesLayoutComponent,
  TypographyComponent
];

@NgModule({
  imports: [CommonModule, RouterModule, ...PAGES],
  exports: PAGES
})
export class DocsStylesModule {}
