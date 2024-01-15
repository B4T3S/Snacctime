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
      import('../../src/app/pages/login/login.page').then(m => m.LoginPage),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register.page').then(m => m.RegisterPage),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.page').then(m => m.DashboardPage),
    canActivate: [IsLoggedInGuard],
  },
  {
    path: 'items',
    loadComponent: () =>
      import('./pages/items/items.page').then(m => m.ItemsPage),
    canActivate: [IsLoggedInGuard],
  },
  {
    path: 'order/:id',
    loadComponent: () =>
      import('./pages/order/order.page').then(m => m.OrderPage),
    canActivate: [IsLoggedInGuard],
  },
]
