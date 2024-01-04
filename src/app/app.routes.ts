import { Routes } from '@angular/router'
import { IsLoggedInGuard } from './guards/is-logged-in/is-logged-in.guard'

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.page').then((m) => m.DashboardPage),
    canActivate: [IsLoggedInGuard],
  },
  {
    path: 'items',
    loadComponent: () =>
      import('./pages/items/items.page').then((m) => m.ItemsPage),
    canActivate: [IsLoggedInGuard],
  },
]
