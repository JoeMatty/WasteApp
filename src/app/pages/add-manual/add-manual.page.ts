import { Component, OnInit } from '@angular/core';
import { AddWasteService } from './../../services/add-waste.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { DatabaseService } from 'src/app/services/database.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-manual',
  templateUrl: './add-manual.page.html',
  styleUrls: ['./add-manual.page.scss']
})
export class AddManualPage implements OnInit {
  
  wasteLog = {
    'waste-name': '',
    'waste-type': '',
    'waste-amount': ''
  }

  newAmount: number = 0;
  wasteType: string = "";
  wasteAmount: string = "";

  quickAdd = this.formBuilder.group({
    'wasteName': ['', Validators.required],
    'wasteType': ['', Validators.required],
    'wasteAmount': ['0', Validators.required],
  });

  constructor(private formBuilder: FormBuilder, private router: Router, private addWasteService: AddWasteService,
     private databaseService: DatabaseService, private modalCtrl: ModalController) { 

    
  }

  ngOnInit() {
  }
  ionViewDidEnter(){
  }

  handleWasteAmount(amount){
    this.addWasteService.addWasteTotal(1).then(() => {
      this.router.navigateByUrl('/tabs/Waste-Home');
    });
  }
  processForm(){
    this.wasteLog["waste-amount"] = this.quickAdd.get('wasteAmount').value;
    this.wasteLog["waste-type"] = this.quickAdd.get('wasteType').value;
    this.wasteLog["waste-name"] = this.quickAdd.get('wasteName').value;
    console.log("added log" + this.newAmount );  
    
    this.databaseService.addWasteLog(this.wasteLog).then(() => {
      this.modalCtrl.dismiss({reload: true});
      console.log("added log" + this.newAmount );  
    });
    
  }
  dismiss(){
    this.modalCtrl.dismiss();
  }
}

// Pages include waste summary page, product information page, settings page.
