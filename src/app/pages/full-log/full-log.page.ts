import { Component, OnInit,ViewChild  } from '@angular/core';
import { DatabaseService, Log } from 'src/app/services/database.service';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
@Component({
  selector: 'app-full-log',
  templateUrl: './full-log.page.html',
  styleUrls: ['./full-log.page.scss'],
})
export class FullLogPage implements OnInit {

  constructor(private databaseService: DatabaseService) { }
  wasteLogs:  Log[] = [];
  displayedColumns: string[] = ['wastename', 'wastetype', 'wasteamount'];
  dataSource = new MatTableDataSource<Log>([]);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  //debug string
  debug = "";
  debug2 = "";
  debug3 ="heer";
  debugCount = 0;
  //
  
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.databaseService.getDataBaseState().subscribe(rdy => {
      if (rdy) {
        this.databaseService.getbevWasteLogs().subscribe(logs => {
          this.dataSource.data = logs;
          
        })
      }
    })
  }

  // ionViewDidEnter(){
  //   console.log("Ion view entered");
  //   this.databaseService.getDataBaseState().subscribe(rdy => {
  //     if(rdy){
  //       this.loadWasteLogs();
  //       console.log("ready");
  //     }
  //   });
  //   console.log("Ion view entered");
  // }
  loadWasteLogs() {
    this.databaseService.loadWasteLogs().then(res => {
      this.debug = this.databaseService.setupString;
    }).catch(() => {
      this.debug = "failed to load";
    });
  }
  DelWasteLogs() {
    this.databaseService.deleteTemp();
  }
}
