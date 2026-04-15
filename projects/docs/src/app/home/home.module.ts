import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';

const PAGES = [HomeComponent];

@NgModule({
  imports: [CommonModule, RouterModule, ...PAGES],
  exports: [PAGES]
})
export class DocsHomeModule {}
