import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'Waste-Home',
        children: [
          {
            path: '',
            loadChildren: () => import('../waste-home/waste-home.module').then( m => m.WasteHomePageModule)
          }
        ]
      },
      {
        path: 'Settings',
        children: [
          {
            path: '',
            loadChildren: () => import('../settings/settings.module').then( m => m.SettingsPageModule)
          }
        ]
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/Waste-Home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRouterModule {}
