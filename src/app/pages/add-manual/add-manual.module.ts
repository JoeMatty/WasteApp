import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AddManualPageRoutingModule } from './add-manual-routing.module';
import { AddManualPage } from './add-manual.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddManualPageRoutingModule
  ],
  declarations: [AddManualPage]
})
export class AddManualPageModule {}
