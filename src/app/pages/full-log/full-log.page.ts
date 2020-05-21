import { Component, OnInit,ViewChild  } from '@angular/core';
import { DatabaseService, Log } from 'src/app/services/database.service';
import { MatPaginator, MatTableDataSource, MatSort,MatButton } from '@angular/material';
import { LogModalPage } from '../log-modal/log-modal.page'
import { ModalController, LoadingController, ToastController } from '@ionic/angular';
import { compareAsc, format } from 'date-fns'
@Component({
  selector: 'app-full-log',
  templateUrl: './full-log.page.html',
  styleUrls: ['./full-log.page.scss'],
})
export class FullLogPage implements OnInit {

  constructor(private databaseService: DatabaseService, private modalCtrl: ModalController, private loadingController:LoadingController,
              private toastController: ToastController) { }
              
  wasteLogs:  Log[] = [];
  displayedColumns: string[] = ['symbol','wastename', 'wastetype', 'formattedDate'];
  dataSource = new MatTableDataSource<any>([]);
  testData: any[] = [{
    id : 1,
    wastename: "Coca Cola",
    wasteamount: 1,
    wastetype: "Plastic",
    wastematerial: "PET",
    wasrecycled: false,
    necessary: "a",
    wasteNotes: "Was bought on the weekend at the beach",
    logdate: new Date("2013-12-09 17:22:00.000"),
    formattedDate: "09-12-2013"
  },
  {
    id : 2,
    wastename: "Shop Bag",
    wasteamount: 1,
    wastetype: "Plastic",
    wastematerial: "HDPE",
    wasrecycled: true,
    necessary: "m",
    wasteNotes: "Needed a bag, will be reused",
    logdate: new Date("2017-12-09T12:22:00.000Z"),
    formattedDate: "12-12-2013"
  },{
    id : 3,
    wastename: "Tin Can",
    wasteamount: 8,
    wastetype: "Metals",
    wastematerial: "41",
    wasrecycled: false,
    necessary: "a",
    wasteNotes: "Bought from supermarket in multipack",
    logdate: new Date("2013-12-09 17:22:00.000"),
    formattedDate: "01-01-2014"
  },
  {
    id : 4,
    wastename: "Magazine",
    wasteamount: 1,
    wastetype: "MixedPaper",
    wastematerial: "HDPE",
    wasrecycled: false,
    necessary: "m",
    wasteNotes: "Needed a bag, will be reused",
    logdate: new Date("2017-12-09T12:22:00.000Z"),
    formattedDate: "09-08-2013"
  },{
    id : 5,
    wastename: "Can of Beer",
    wasteamount: 1,
    wastetype: "Metals",
    wastematerial: "41",
    wasrecycled: true,
    necessary: "a",
    wasteNotes: "Bought for the birthday party",
    logdate: new Date("2013-12-09 17:22:00.000"),
    formattedDate: "21-02-2014"
  },
  {
    id : 6,
    wastename: "Carton",
    wasteamount: 1,
    wastetype: "mixedpaper",
    wastematerial: "HDPE",
    wasrecycled: true,
    necessary: "m",
    wasteNotes: "Needed a bag, will be reused",
    logdate: new Date("2017-12-09T12:22:00.000Z"),
    formattedDate: "23-08-2013"
  }]

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  //debug string
  debug = "";
  databaseState;
  //
  
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    //DEBUG DELETE
    this.dataSource.data = this.testData;
    this.dataSource.sortingDataAccessor = (item, property) => {
      console.log("item: " + JSON.stringify(item) + "property :" + property)
      switch (property) {
        case  "formattedDate": return item.logdate;
        default: console.log("default"); return item[property];
      }
    };
    
    //
  
    this.databaseService.getDataBaseState().subscribe(rdy => {
      this.databaseState = rdy;
      if (rdy) {
        this.databaseService.getbevWasteLogs().subscribe(logs => {
          let displayLogs = [];
          displayLogs = logs;
          for(let log of displayLogs){
           
              log.wasrecycled = Boolean(String(log.wasrecycled) == "true");
              log.formattedDate = format(log.logdate,'dd-MM-yyyy')
          }
          this.dataSource.data = displayLogs;
          
        })
      }
    })
  }

  ionViewDidEnter(){
    
    if(this.databaseState){
         this.loadWasteLogs();
         
    }


  }
  doRefresh(event) {  
 
    setTimeout(() => {  
      //this.loadWasteLogs();  
      event.target.complete();  
    }, 500);  
  }  
  
  loadWasteLogs() {
    
    this.databaseService.loadWasteLogs().then(res => {
      
    }).catch(() => {
      this.debug = "failed to load";
    });
  }
  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: "bubbles",
      duration: 5000,
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    this.loadWasteLogs();
    return await loading.present();
  }
  async openModal(log) {
    
    const modal = await this.modalCtrl.create({
      component: LogModalPage,
      componentProps: {log}
    });
    await modal.present();
    this.loadWasteLogs();
    return await modal.onDidDismiss;
  }
}
