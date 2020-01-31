import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule)},
  {
    path: 'Add-manual',
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/add-manual/add-manual.module').then( m => m.AddManualPageModule)
      }
    ]
  },  {
    path: 'full-log',
    loadChildren: () => import('./pages/full-log/full-log.module').then( m => m.FullLogPageModule)
  }



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
