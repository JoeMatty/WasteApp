import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, Validators} from '@angular/forms';
import { DatabaseService } from 'src/app/services/database.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ToastController, PickerController,IonDatetime, NavController, IonSlides, PopoverController, IonItemSliding } from '@ionic/angular';
import { PickerOptions } from '@ionic/core';
import { ProductapiService } from 'src/app/services/productapi.service';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { WasteHomePage } from '../waste-home/waste-home.page';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { isThisISOWeek } from 'date-fns';
import { AddPopComponent } from '../../popover/add-pop/add-pop.component';
import { ReadKeyExpr } from '@angular/compiler';
@Component({
  selector: 'app-add-manual',
  templateUrl: './add-manual.page.html',
  styleUrls: ['./add-manual.page.scss'],
  providers: [Keyboard]
})
export class AddManualPage implements OnInit {

  @ViewChild('slides', { static: true }) slider: IonSlides;  
  @ViewChild('itemslide', {static: true}) itemslider: IonItemSliding;
  plasticOptions = [
    {text: 'Plastic 1 - PET', value: '1'},
    {text: 'Plastic 2 - HDPE', value: '2'},
    {text: 'Plastic 3 - PVC', value: '3'},
    {text: 'Plastic 4 - LDPE', value: '4'},
    {text: 'Plastic 5 - PP', value: '5'},
    {text: 'Plastic 6 - PS', value: '6'},
    {text: 'Plastic 7 - OTHER', value: '7'}
  ]
  glassOptions = [
    {text: 'Mixed Glass 70 - GL', value: '70'},
    {text: 'Clear Glass 71 - GL', value: '71'},
    {text: 'Green Glass 72 - GL', value: '72'},
    {text: 'Dark Sort Glass 73 - GL', value: '73'}
  ]
  metalOptions = [
    {text: 'Steel 40 - FE', value: '40'},
    {text: 'Aluminium 41 - ALU', value: '41'}
  ]
  paperOptions = [
    {text: 'Cardboard PAP - 20', value: '20'},
    {text: 'Paperboard (Magazine) - PAP', value: '21'},
    {text: 'Paper - PAP', value: '22'}
  ]
  otherOptions = [
    {text: 'Other', value: ''}
  ]
  segment = 0;  
  selectEnable = true;
  result = null;
  newAmount: number = 0;
  wasteType: string = "";
  wasteAmount: string = "";
  dateInit: Date = new Date;
  category = 0;
  pageTitle: string = "Log Some Waste";
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

  constructor(private formBuilder: FormBuilder, private router: Router,
     private databaseService: DatabaseService, private barcodeScanner: BarcodeScanner, private toastController: ToastController,
     private productService: ProductapiService, private pickerCtrl: PickerController, public navCtrl: NavController,
     private popCtrl: PopoverController, private keyboard: Keyboard) { 
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
        wastename: "Green Glass Bottle",
        wasteType: "Glass",
        wasteMaterial: "72"
      },
      {
        wastename: "Brown Glass Bottle",
        wasteType: "Glass",
        wasteMaterial: "70"
      },
      {
        wastename: "Clear Glass Bottle",
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
        wastename: "Plastic Bottle",
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
    this.category = 0;
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
          this.quickAdd.get('wasteNotes').setValue("Barcode: " + product.product.barcodeid);
          this.category = 2;
          alert("Item has been found. \n Information has been autofilled into the log page.");
        }
        else{
          alert("The product was not found on the system - "+ barcodeData.text);
        }
      })
     }).catch(err => {
         alert('Error'+ err);
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
    if (this.keyboard.isVisible == true){
      ev = null;
    }
    const popover = await this.popCtrl.create({
      component: AddPopComponent,
      componentProps: {
          "item": item
      },
      event: ev,
      
      translucent: true
    });
    popover.onDidDismiss().then((dataReturned) => {
      let response = dataReturned['data'].confirmed;
      if(dataReturned !== null){
          let item = dataReturned['data'].item;
          let wasRecycled = dataReturned['data'].wasRecycled;
          let amount = dataReturned['data'].amount
          console.log("clicked confirm: "+ JSON.stringify(dataReturned['data']));
          this.SubmitQuickAdd(item.wastename,item.wasteType, item.wasteMaterial,amount,wasRecycled)
      }
    })
    return await popover.present();
  }
  SubmitQuickAdd(wastename: string,wasteType:string,wasteMaterial:string,amount: number,recycled:boolean){
    console.log("In the function");
    let logDate = new Date();
    this.databaseService.addWasteLog(wastename,amount,wasteType,wasteMaterial,recycled,"0","Quick Added",logDate)
    .then(() => {
      
      this.presentToast();
      this.navCtrl.navigateRoot('/tabs/Waste-Home');
      this.databaseService.loadWasteLogs();

  });
  }

  async segmentChanged(event) {
    await this.slider.slideTo(event.detail.value);

  }
  async slideChanged() {  
    this.category = await this.slider.getActiveIndex();  
    switch(this.category){
      case 1:  
     }
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
        this.navCtrl.navigateRoot('/tabs/Waste-Home');
        this.databaseService.loadWasteLogs();
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
            {text: 'Plastic', value: 'Plastic'},
            {text: 'Mixed Paper / Cardboard', value: 'mixedpaper'},
            {text: 'Glass', value: 'Glass'},
            {text: 'Metals', value: 'Metals'},
            {text: 'Others', value: 'Others'}

          ]
        }
      ]
    };
    let picker = await this.pickerCtrl.create(opts);
    picker.present();
  
    picker.onDidDismiss().then(async data => {
      let col = await picker.getColumn('Type');
      this.quickAdd.get('wasteType').setValue(col.options[col.selectedIndex].value);
      this.selectEnable = false;
    })
  }
  async showPicker() {
    let wasteType =  this.quickAdd.get('wasteType').value.toLowerCase();
    let selection;
    
    switch (wasteType) {
      case "plastic": 
                selection = this.plasticOptions;
                break;
      case "paper":
                selection = this.paperOptions;
                break;
      case "glass":
                selection = this.glassOptions;
                break;
      case "metals":
                  selection = this.metalOptions;
                  break;
      case "others":
                  selection = this.otherOptions;
                  break;
    }
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
          options: selection
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
