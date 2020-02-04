import { Component, OnInit,ViewChild  } from '@angular/core';
import { DatabaseService, Log } from 'src/app/services/database.service';
import { MatPaginator, MatTableDataSource, MatSort, MatCheckbox } from '@angular/material';
import { LogModalPage } from '../log-modal/log-modal.page'
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-full-log',
  templateUrl: './full-log.page.html',
  styleUrls: ['./full-log.page.scss'],
})
export class FullLogPage implements OnInit {

  constructor(private databaseService: DatabaseService, private modalCtrl: ModalController) { }
  wasteLogs:  Log[] = [];
  displayedColumns: string[] = ['wastename', 'wastetype', 'wasteamount','material'];
  dataSource = new MatTableDataSource<Log>([]);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  //debug string
  debug = "";
  databaseState;
  //
  
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

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
  loadWasteLogs() {
    this.databaseService.loadWasteLogs().then(res => {
      
    }).catch(() => {
      this.debug = "failed to load";
    });
  }
  DelWasteLogs() {
    this.databaseService.deleteTemp();
  }
}
