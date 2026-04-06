import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./features/dashboard/dashboard-page.component').then((m) => m.DashboardPageComponent),
  },
  {
    path: 'tasks',
    loadComponent: () =>
      import('./features/tasks/tasks-page.component').then((m) => m.TasksPageComponent),
  },
  {
    path: 'calendar',
    loadComponent: () =>
      import('./features/calendar/calendar-page.component').then((m) => m.CalendarPageComponent),
  },
  {
    path: 'analytics',
    loadComponent: () =>
      import('./features/analytics/analytics-page.component').then((m) => m.AnalyticsPageComponent),
  },
  {
    path: 'users',
    loadComponent: () => import('./features/team/team-page.component').then((m) => m.TeamPageComponent),
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./features/settings/settings-page.component').then((m) => m.SettingsPageComponent),
  },
  { path: '**', redirectTo: '' },
];
