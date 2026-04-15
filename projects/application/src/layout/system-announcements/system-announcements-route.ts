import { Routes } from '@angular/router';
import { SystemAnnouncementsPageComponent } from './system-announcements-page.component';

const routes: Routes = [
  {
    path: 'notifications',
    component: SystemAnnouncementsPageComponent,
    data: { title: 'System Announcements | Common platform' }
  }
];

export const SYSTEM_ANNOUNCEMENT_ROUTES: Routes = [
  {
    path: 'system-announcements',
    loadChildren: () => routes
  }
];
