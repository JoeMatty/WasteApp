import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WasteHomePageRoutingModule } from './waste-home-routing.module';

import { WasteHomePage } from './waste-home.page';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WasteHomePageRoutingModule,
    FontAwesomeModule
  ],
  declarations: [WasteHomePage]
})
export class WasteHomePageModule {}
