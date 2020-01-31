import { Component, OnInit } from '@angular/core';
import { AddWasteService } from './../../services/add-waste.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { DatabaseService } from 'src/app/services/database.service';
import { ModalController } from '@ionic/angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

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
  testString: string = "empt";
  testString2: string = "-";
  quickAdd = this.formBuilder.group({
    'wasteName': ['', Validators.required],
    'wasteType': ['', Validators.required],
    'wasteAmount': ['0', Validators.required],
  });

  constructor(private formBuilder: FormBuilder, private router: Router, private addWasteService: AddWasteService,
     private databaseService: DatabaseService, private barcodeScanner: BarcodeScanner) { 
  }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.testString2 += "-" + this.databaseService.setupString;
  }
  scanBarcode(){
    this.barcodeScanner.scan().then(barcodeData => {
      alert('Barcode data :'+ barcodeData.text);
     }).catch(err => {
         console.log('Error', err);
     });
  }

  handleWasteAmount(amount){
    this.addWasteService.addWasteTotal(1).then(() => {
      this.router.navigateByUrl('/tabs/Waste-Home');
    });
  }
  processForm(){
    let wastename = this.quickAdd.get('wasteName').value;
    let wastetype = this.quickAdd.get('wasteType').value;
    let wasteamount = this.quickAdd.get('wasteAmount').value;
    
    console.log("Add-man: sending log" + this.newAmount );  

    this.testString2 += "-" + this.databaseService.setupString;
    this.databaseService.addWasteLog(wastename,wastetype,wasteamount).then(() => {

      this.testString = this.databaseService.resultString;
      console.log("finished" + this.newAmount );  

    });
    
  }
}

// Pages include waste summary page, product information page, settings page.
