import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

/*
wastename -
wasteamount -
wastetype -
wasteDescription  //description of product e.g coca cola and reasons for buying e.g. super duper thr.. optional field.
was-recycled bool
wasnecessary  
*/
export interface Log {
  id : number,
  wastename: string,
  wasteamount: number,
  wastetype: string,
  wastematerial: string,
  wasrecycled: boolean,
  necessary: string,
  wasteNotes: string,
  logdate: Date
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
        return this.db.executeSql('CREATE TABLE IF NOT EXISTS log(id INTEGER PRIMARY KEY AUTOINCREMENT, waste_name VARHCHAR(32),waste_amount SMALLINT, waste_type VARHCHAR(15), ' +
        'waste_material VARCHAR(15) ,was_recycled BOOLEAN, is_necessary VARCHAR(1), waste_notes VARHCHAR(100), log_date VARHCHAR(24) )',[])
          .then(data => {
              this.databaseReady.next(true);
             
          return data;
          }).catch(() => {
            
        })
    });
  }
  addWasteLog(wastename,wasteamount,wastetype,waste_material,was_recycled,is_necessary,waste_notes,log_date:Date){
    
    // let data = [wastename,wastetype,wasteamount]

    return this.db.executeSql('INSERT into log (waste_name, waste_amount, waste_type, waste_material, was_recycled, is_necessary, waste_notes,log_date) VALUES (?,?,?,?,?,?,?,?)', 
      [wastename,wasteamount,wastetype,waste_material,was_recycled,is_necessary,waste_notes,log_date.toISOString()]).then((data) =>{
        this.loadWasteLogs();
        
      }).catch((err) =>{
        this.resultString = "log add failed: " + err;
    })
  }
  getWasteLog(id: Number){
    return this.db.executeSql('SELECT * FROM log WHERE id = ?', [id]).then(data =>{
      let result: Log;

      result.id = data.rows.item(0).id;
      result.wastename = data.rows.item(0).waste_name;
      result.wasteamount = data.rows.item(0).waste_amount;
      result.wastetype = data.rows.item(0).waste_type; 
      result.wastematerial = data.rows.item(0).waste_material;
      result.wasrecycled = data.rows.item(0).was_recycled;
      result.necessary = data.rows.item(0).is_necessary;
      result.wasteNotes = data.rows.item(0).waste_notes;    
      result.logdate = new Date(data.rows.item(0).log_date);
          
      return result;
      
    })
   
  }
  loadWasteLogs(){
    return this.db.executeSql('SELECT * FROM log', []).then(data =>{
      let result: Log[];
      
      if (data.rows.length > 0){
        
          for (let i =0; i < data.rows.length; i++){
                   
              result[i].id = data.rows.item(i).id;
              result[i].wastename = data.rows.item(i).waste_name;
              result[i].wasteamount = data.rows.item(i).waste_amount;
              result[i].wastetype = data.rows.item(i).waste_type; 
              result[i].wastematerial = data.rows.item(i).waste_material;
              result[i].wasrecycled = data.rows.item(i).was_recycled;
              result[i].necessary = data.rows.item(i).is_necessary;
              result[i].wasteNotes = data.rows.item(i).waste_notes;    
              result[i].logdate = new Date(data.rows.item(i).log_date);      
              
          }
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

