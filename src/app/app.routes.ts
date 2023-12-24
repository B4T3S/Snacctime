import { Routes } from '@angular/router';
import { IsLoggedInGuard } from './guards/is-logged-in.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/inbox',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.page').then( m => m.DashboardPage),
    canActivate: [IsLoggedInGuard]
  },


];
