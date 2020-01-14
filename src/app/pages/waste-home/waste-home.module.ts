import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WasteHomePageRoutingModule } from './waste-home-routing.module';

import { WasteHomePage } from './waste-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WasteHomePageRoutingModule
  ],
  declarations: [WasteHomePage]
})
export class WasteHomePageModule {}
