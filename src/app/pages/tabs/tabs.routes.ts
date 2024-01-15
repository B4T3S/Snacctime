import { Routes } from '@angular/router'
import { TabsPage } from './tabs.page'

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'orders',
        loadComponent: () =>
          import('./orders/orders.page').then(m => m.OrdersPage),
      },
      {
        path: 'articles',
        loadComponent: () =>
          import('./articles/articles.page').then(m => m.ArticlesPage),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./settings/settings.page').then(m => m.SettingsPage),
      },
      {
        path: '',
        redirectTo: '/tabs/orders',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/orders',
    pathMatch: 'full',
  },
]
