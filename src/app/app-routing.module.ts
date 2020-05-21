import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule)},

  {
    path: 'log-modal',
    loadChildren: () => import('./pages/log-modal/log-modal.module').then( m => m.LogModalPageModule)
  },
  {
    path: 'barcode-modal',
    loadChildren: () => import('./modals/barcode-modal/barcode-modal.module').then( m => m.BarcodeModalPageModule)
  },
  {
    path: 'barcode-scan',
    loadChildren: () => import('./pages/barcode-scan/barcode-scan.module').then( m => m.BarcodeScanPageModule)
  },
  {
    path: 'Add-Manual',
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/add-manual/add-manual.module').then( m => m.AddManualPageModule)
      }
    ]
  }



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
