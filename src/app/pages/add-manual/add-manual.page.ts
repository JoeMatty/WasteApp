import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddWasteService } from './../../services/add-waste.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators} from '@angular/forms';
import { DatabaseService } from 'src/app/services/database.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ToastController, PickerController,IonDatetime, NavController, IonSlides, PopoverController, IonItemSliding } from '@ionic/angular';
import { PickerOptions } from '@ionic/core';
import { ProductapiService } from 'src/app/services/productapi.service';
import { WasteHomePage } from '../waste-home/waste-home.page';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { isThisISOWeek } from 'date-fns';
import { AddPopComponent } from '../../popover/add-pop/add-pop.component';
@Component({
  selector: 'app-add-manual',
  templateUrl: './add-manual.page.html',
  styleUrls: ['./add-manual.page.scss']
})
export class AddManualPage implements OnInit {

  @ViewChild('slides', { static: true }) slider: IonSlides;  
  @ViewChild('itemslide', {static: true}) itemslider: IonItemSliding;
  segment = 0;  
  result = null;
  newAmount: number = 0;
  wasteType: string = "";
  wasteAmount: string = "";
  dateInit: Date = new Date;
  category = 0;
  testString: string = "empt";
  testString2: string = "-";
  displayDefaultWaste:any[];
  defaultWaste:any[]; 
  quickAdd = this.formBuilder.group({
    'wasteName': ['', Validators.required],
    'wasteAmount': ['1', Validators.required],
    'wasteType': ['', Validators.required],
    'wasteMaterial': [],
    'wasRecycled' : [true],
    'necessary' : [],
    'logDate': [],
    'logTime': [],
    'wasteNotes' : ['', Validators.maxLength(100)]
  });

  constructor(private formBuilder: FormBuilder, private router: Router, private addWasteService: AddWasteService,
     private databaseService: DatabaseService, private barcodeScanner: BarcodeScanner, private toastController: ToastController,
     private productService: ProductapiService, private pickerCtrl: PickerController, public navCtrl: NavController,
     private popCtrl: PopoverController) { 
  }

  ngOnInit() {
    this.defaultWaste;
    this.initialiseDefaultData()
  } 
  ionViewDidEnter(){
    //Finds the current Date/Time and sets it as the default value in the Log time form option

    this.quickAdd.get('logTime').setValue(this.dateInit.toISOString());
    this.quickAdd.get('logDate').setValue(this.dateInit.toISOString());
    
  }
  initialiseDefaultData(){
    this.defaultWaste = [
      {
        wastename: "Carton",
        wasteType: "MixedPaper",
        wasteMaterial: "21"
      },
      {
        wastename: "Green Bottle",
        wasteType: "Glass",
        wasteMaterial: "72"
      },
      {
        wastename: "Brown Bottle",
        wasteType: "Glass",
        wasteMaterial: "70"
      },
      {
        wastename: "Clear Bottle",
        wasteType: "Glass",
        wasteMaterial: "71"
      },
      {
        wastename: "Glass Jar",
        wasteType: "Glass",
        wasteMaterial: "71"
      },
      {
        wastename: "Drink Can",
        wasteType: "Metals",
        wasteMaterial: "41"
      },
      {
        wastename: "Carrier Bag",
        wasteType: "Plastic",
        wasteMaterial: "02"
      },
      {
        wastename: "Tin Can",
        wasteType: "Metals",
        wasteMaterial: "41"
      },
      {
        wastename: "Drink Bottle",
        wasteType: "Plastics",
        wasteMaterial: "02"
      },
      {
        wastename: "Shower Bottle",
        wasteType: "Plastics",
        wasteMaterial: "02"
      }
    ];
  }
  FilterDefaultData(ev:any){
    this.initialiseDefaultData();
    const val = ev.target.value;
    console.log("called " + val);
    if(val && val.trim() != ''){
      console.log("passed this");
      this.defaultWaste = this.defaultWaste.filter((item) => {
          return (item.wastename.toLowerCase().indexOf(val.toLowerCase())> -1 )
         // return (item.wastename.toLowerCase().indexof(val.toLowerCase())> -1)
      } )
      console.log("passed "+ JSON.stringify(this.defaultWaste));
    }
  }
  manualBarcode(){
      this.productService.searchData(5010459005018).subscribe(result => {
          let product: any = result
          if(product['found']){
            alert(JSON.stringify(product));
          }
          else{
            console.log(JSON.stringify(product));
          }
        
      });
      
      

  }
  scanBarcode(){
    this.barcodeScanner.scan().then(barcodeData => {
      //After scanning a barcode value it will check the database for a matching product
      this.result = this.productService.searchData(+barcodeData.text).subscribe(result => {
        let product: any = result;
        if(product['found'] == true){
          //if a matching product is found it will be displayed on the form

          
          this.quickAdd.get('wasteName').setValue(product.product.productName);
          this.quickAdd.get('wasteType').setValue(product.product.productType);
          this.quickAdd.get('wasteMaterial').setValue(product.product.material);
          this.quickAdd.get('wasteNotes').setValue(this.quickAdd.get('wasteNotes').value + "Barcode: " + product.product.barcodeid);

        }
        else{
          alert(JSON.stringify(product));
        }
      })
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
  async presentPopover(ev: any,item: any) {

    const popover = await this.popCtrl.create({
      component: AddPopComponent,
      componentProps: {
          "item": item
      },
      event: ev,
      
      translucent: true
    });
    popover.onDidDismiss().then((dataReturned) => {
      if(dataReturned !== null){
          console.log(dataReturned);
      }
    })
    return await popover.present();
  }
  handleWasteAmount(amount){
    this.addWasteService.addWasteTotal(1).then(() => {
      this.router.navigateByUrl('/tabs/Waste-Home');
    });
  }
  async segmentChanged(event) {
    await this.slider.slideTo(event.detail.value);

  }
  async slideChanged() {  
    this.category = await this.slider.getActiveIndex();  
  }  
  processForm(){
    let logDateTime= new Date;
    let tempTime = new Date(this.quickAdd.get('logTime').value);
    let tempDate = new Date(this.quickAdd.get('logDate').value);
   

    logDateTime.setFullYear(tempDate.getFullYear());
    logDateTime.setMonth(tempDate.getMonth());
    logDateTime.setDate(tempDate.getDate());    
    logDateTime.setHours(tempTime.getHours());
    logDateTime.setMinutes(tempTime.getMinutes());
    logDateTime.setSeconds(0);
    logDateTime.setUTCMilliseconds(0);


    let wastename = this.quickAdd.get('wasteName').value;
    let wastetype = this.quickAdd.get('wasteType').value;
    let wasteamount = this.quickAdd.get('wasteAmount').value;
    let wasteMaterial = this.quickAdd.get('wasteMaterial').value;
    let wasRecycled = this.quickAdd.get('wasRecycled').value;
    let necessary = "a";//this.quickAdd.get('necessary').value;
    let logTime =  logDateTime;
    let wasteNotes = this.quickAdd.get('wasteNotes').value;
    //delete
    console.log(wastename)
    this.databaseService.addWasteLog(wastename,wasteamount,wastetype,wasteMaterial,wasRecycled,necessary,wasteNotes,logDateTime)
      .then(() => {
        
        this.presentToast();
        this.navCtrl.navigateRoot('/tabs/Waste-Home')

    });
    
  }
  async showTimePicker() {
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
          name: 'Type',
          options: [
            {text: 'Plastic', value: 'plastic'},
            {text: 'Mixed Paper / Cardboard', value: 'paper'},
            {text: 'Glass', value: 'glass'},
            {text: 'Metals', value: 'metals'},
            {text: 'Others', value: 'others'}

          ]
        }
      ]
    };
    let picker = await this.pickerCtrl.create(opts);
    picker.present();
    picker.onDidDismiss().then(async data => {
      let col = await picker.getColumn('Type');
      this.quickAdd.get('wasteType').setValue(col.options[col.selectedIndex].value);
    })
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
            {text: 'Plastic 1: PET', value: 'PETE'},
            {text: 'Plastic 2: HDPE', value: 'HDPE'},
            {text: 'Plastic 3: PVC', value: 'PVC'},
            {text: 'Plastic 4: LDPE', value: 'LDPE'},
            {text: 'Plastic 5: PP', value: 'PP'},
            {text: 'Plastic 6: PS', value: 'PS'},
            {text: 'Plastic 7: OTHER', value: 'OTHER'},
            {text: 'Plastic 1: PET', value: 'PETE'},

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
