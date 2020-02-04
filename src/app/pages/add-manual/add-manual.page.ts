import { Component, OnInit } from '@angular/core';
import { AddWasteService } from './../../services/add-waste.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators} from '@angular/forms';
import { DatabaseService } from 'src/app/services/database.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ToastController, PickerController } from '@ionic/angular';
import { PickerOptions } from '@ionic/core';
import { ProductapiService } from 'src/app/services/productapi.service';

@Component({
  selector: 'app-add-manual',
  templateUrl: './add-manual.page.html',
  styleUrls: ['./add-manual.page.scss']
})
export class AddManualPage implements OnInit {
  result = null;
  newAmount: number = 0;
  wasteType: string = "";
  wasteAmount: string = "";
  testString: string = "empt";
  testString2: string = "-";

  quickAdd = this.formBuilder.group({
    'wasteName': ['', Validators.required],
    'wasteAmount': ['1', Validators.required],
    'wasteType': ['', Validators.required],
    'wasteMaterial': [],
    'wasRecycled' : [],
    'necessary' : [],
    'wasteNotes' : ['', Validators.maxLength(100)]
  });

  constructor(private formBuilder: FormBuilder, private router: Router, private addWasteService: AddWasteService,
     private databaseService: DatabaseService, private barcodeScanner: BarcodeScanner, private toastController: ToastController,
     private productService: ProductapiService, private pickerCtrl: PickerController) { 
  }

  ngOnInit() {
  }
  ionViewDidEnter(){
    this.testString2 += "-" + this.databaseService.setupString;
  }
  manualBarcode(){
      this.productService.searchData(5010459005018).subscribe(result => {
        
        this.result = result;
      });
      
      alert(JSON.stringify(this.result));

  }
  scanBarcode(){
    this.barcodeScanner.scan().then(barcodeData => {
      alert('Barcode data :'+ barcodeData.text);
      this.result = this.productService.searchData(+barcodeData.text)
      console.log(this.result);
      alert('Barcode data :'+ this.result);
     }).catch(err => {
         console.log('Error', err);
     });
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Item has been added.',
      duration: 2000,
      color: "success"
    });
    toast.present();
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
    let wasteMaterial = this.quickAdd.get('wasteMaterial').value;
    let wasRecycled = this.quickAdd.get('wasRecycled').value;
    let necessary = this.quickAdd.get('necessary').value;
    let wasteNotes = this.quickAdd.get('wasteNotes').value;

    console.log("Add-man: sending log" + this.newAmount );  
    this.presentToast();
    this.testString2 += "-" + this.databaseService.setupString;
    this.databaseService.addWasteLog(wastename,wasteamount,wastetype,wasteMaterial,wasRecycled,necessary,wasteNotes)
      .then(() => {
        this.testString = this.databaseService.resultString;
        console.log("finished" + this.newAmount );  

    });
    
  }

  async showPicker() {
    let opts: PickerOptions = {
      cssClass:'wastePicker',
      buttons: [
        {
        text: 'Cancel',
        role: 'cancel'
        },
        {
          text: 'Done',
          role: 'done',
          cssClass: 'special-done'
        }
      ],
      columns: [
        {
          name: 'Material',
          options: [
            {text: 'P 1: PET', value: 'PETE'},
            {text: 'P 2: HDPE', value: 'HDPE'},
            {text: 'P 3: PVC', value: 'PVC'},
            {text: 'P 4: LDPE', value: 'LDPE'},
            {text: 'P 5: PP', value: 'PP'},
            {text: 'P 6: PS', value: 'PS'},
            {text: 'P 7: OTHER', value: 'OTHER'}
          ]
        }
      ]
    };
    let picker = await this.pickerCtrl.create(opts);
    picker.present();
    picker.onDidDismiss().then(async data => {
      let col = await picker.getColumn('Material');
      this.quickAdd.get('wasteMaterial').setValue(col.options[col.selectedIndex].value);
    })
  }
}

// Pages include waste summary page, product information page, settings page.
