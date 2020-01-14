import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WasteHomePage } from './waste-home.page';

const routes: Routes = [
  {
    path: '',
    component: WasteHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WasteHomePageRoutingModule {}
