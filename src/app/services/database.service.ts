import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface Log {
  id : number,
  wastename: string,
  wastetype: string,
  wasteamount: number
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private db: SQLiteObject;
  private databaseReady: BehaviorSubject<boolean>; //This varaible true when the db is open and readyt for commands

  bevWasteLogs = new BehaviorSubject([]);

  resultString = "empty"
  setupString = "empty"
  tableStyle = "bootstrap"
  
  constructor(private http: HttpClient, private sqlite: SQLite, private plt: Platform,private httpClient: HttpClient) { 
    this.databaseReady = new BehaviorSubject(false);
    //Open or create the database on entry to this page


    this.plt.ready().then(() => {
        this.openOrCreate();
    })
  }

  getDataBaseState(){
    return this.databaseReady.asObservable();
  }
  openOrCreate(){
    //Creates the database if not existed yet then opens the database

    return this.sqlite.create({
      name: 'wasteLog.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
        this.db = db;
        return this.db.executeSql('CREATE TABLE IF NOT EXISTS log(id INTEGER PRIMARY KEY AUTOINCREMENT, waste_name VARHCHAR(32),waste_type VARHCHAR(15), waste_amount SMALLINT)',[])
          .then(data => {
              this.databaseReady.next(true);
                this.setupString = "Setup Complete"
          return data;
          }).catch(() => {
          this.setupString = "failed to setup"
        })
    });
  }
  addWasteLog(wastename,wastetype,wasteamount){
    
    // let data = [wastename,wastetype,wasteamount]

    return this.db.executeSql('INSERT into log (waste_name, waste_type, waste_amount) VALUES (?,?,?)', [wastename,wastetype,wasteamount]).then((data) =>{
      this.loadWasteLogs();
      this.resultString = "log added"
    }).catch((err) =>{
      this.resultString = "log add failed: " + err;
    })
  }
  loadWasteLogs(){
    return this.db.executeSql('SELECT * FROM log', []).then(data =>{
      let result = [];
      console.log("Preparing to get Waste logs");
      if (data.rows.length > 0){
        this.setupString = "";
          for (let i =0; i < data.rows.length; i++){
            this.setupString += "loop " + i; 
            result.push({ 
              id: data.rows.item(i).id,
              wastename: data.rows.item(i).waste_name, 
              wastetype: data.rows.item(i).waste_type, 
              wasteamount: data.rows.item(i).waste_amount 
            });        
          }
          this.resultString = "success";
      }
      this.bevWasteLogs.next(result);
    })
   
  }
  getbevWasteLogs(): Observable<Log[]> {
    return this.bevWasteLogs.asObservable();
  }
  deleteTemp() {
    return this.db.executeSql('DELETE * FROM logs', []).then(_ => {
      this.loadWasteLogs();
    });
  }
}

