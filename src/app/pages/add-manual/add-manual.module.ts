import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AddManualPageRoutingModule } from './add-manual-routing.module';
import { AddManualPage } from './add-manual.page';
import { MatCheckboxModule } from '@angular/material';
import { MatInputModule } from '@angular/material';


@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    MatCheckboxModule,
    MatInputModule,
    AddManualPageRoutingModule,
  ],
  declarations: [AddManualPage]
})
export class AddManualPageModule {}
