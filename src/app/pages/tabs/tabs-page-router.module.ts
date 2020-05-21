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
      path: 'Full-Log',
      children: [
        {
          path: '',
          loadChildren: () => import('../full-log/full-log.module').then( m => m.FullLogPageModule)
        }
      ]
    },
      {
        path: 'Map',
        children: [
          {
            path: '',
            loadChildren: () => import('../map/map.module').then( m => m.MapPageModule)
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
