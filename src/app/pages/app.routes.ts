import { Routes } from '@angular/router'
import { IsLoggedInGuard } from '../guards/is-logged-in/is-logged-in.guard'

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then(m => m.LoginPage),
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then(m => m.routes),
    canActivate: [IsLoggedInGuard],
  },
]
