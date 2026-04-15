import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LayoutComponent } from './getting-started.layout';
import { InstallationComponent } from './pages/installation';
import { OverviewComponent } from './pages/overview';

const PAGES = [InstallationComponent, LayoutComponent, OverviewComponent];

@NgModule({
  imports: [CommonModule, RouterModule, ...PAGES],
  exports: PAGES
})
export class DocsGettingStartedModule {}
