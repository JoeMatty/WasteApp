import { Component, OnInit,ViewChild  } from '@angular/core';
import { DatabaseService, Log } from 'src/app/services/database.service';
import { MatPaginator, MatTableDataSource, MatSort,MatButton } from '@angular/material';
import { LogModalPage } from '../log-modal/log-modal.page'
import { ModalController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-full-log',
  templateUrl: './full-log.page.html',
  styleUrls: ['./full-log.page.scss'],
})
export class FullLogPage implements OnInit {

  constructor(private databaseService: DatabaseService, private modalCtrl: ModalController, private loadingController:LoadingController) { }
  wasteLogs:  Log[] = [];
  displayedColumns: string[] = ['wastename', 'wastetype', 'date','actions'];
  dataSource = new MatTableDataSource<Log>([]);
  testData: Log[] = [{
    id : 1,
    wastename: "Coca Cola",
    wasteamount: 1,
    wastetype: "Bottle",
    wastematerial: "PET",
    wasrecycled: true,
    necessary: "a",
    wasteNotes: "Was bought on the weekend at the beach",
    logdate: new Date("2013-12-09T17:22:00.000Z")
  },
  {
    id : 2,
    wastename: "Shop Bag",
    wasteamount: 1,
    wastetype: "Bag",
    wastematerial: "HDPE",
    wasrecycled: false,
    necessary: "m",
    wasteNotes: "Needed a bag, will be reused",
    logdate: new Date("2017-12-09T12:22:00.000Z")
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
    //
  
    this.databaseService.getDataBaseState().subscribe(rdy => {
      this.databaseState = rdy;
      if (rdy) {
        this.databaseService.getbevWasteLogs().subscribe(logs => {
          this.dataSource.data = logs;
          
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
  DelWasteLogs() {
    this.databaseService.deleteTemp();
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
}
