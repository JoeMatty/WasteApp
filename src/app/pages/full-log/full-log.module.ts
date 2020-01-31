import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { IonicModule } from '@ionic/angular';
import { FullLogPageRoutingModule } from './full-log-routing.module';
import { FullLogPage } from './full-log.page';
import { MaterialModule } from '../../material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FullLogPageRoutingModule,
    MaterialModule
  ],
  declarations: [FullLogPage]
})
export class FullLogPageModule {}
