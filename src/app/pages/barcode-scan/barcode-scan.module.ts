import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BarcodeScanPageRoutingModule } from './barcode-scan-routing.module';

import { BarcodeScanPage } from './barcode-scan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BarcodeScanPageRoutingModule
  ],
  declarations: [BarcodeScanPage]
})
export class BarcodeScanPageModule {}
