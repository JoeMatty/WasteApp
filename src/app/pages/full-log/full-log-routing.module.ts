import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullLogPage } from './full-log.page';

const routes: Routes = [
  {
    path: '',
    component: FullLogPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FullLogPageRoutingModule {}
