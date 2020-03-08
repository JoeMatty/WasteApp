import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BarcodeModalPage } from './barcode-modal.page';

const routes: Routes = [
  {
    path: '',
    component: BarcodeModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BarcodeModalPageRoutingModule {}
