import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CppInstallationComponent } from './pages/cpp-installation';

import { CppLayoutComponent } from './pages/cpp-layout';
import { OverviewComponent } from './pages/overview';
import { LayoutComponent } from './patterns.layout';
import { FormsModule } from '@angular/forms';

const PAGES = [CppInstallationComponent, CppLayoutComponent, LayoutComponent, OverviewComponent];

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule, ...PAGES],
  exports: PAGES
})
export class DocsPatternsModule {}
