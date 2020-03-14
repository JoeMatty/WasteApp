import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { Platform, NavController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {  format } from 'date-fns'

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
  bevTimeLogs = new BehaviorSubject([]);

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
        'waste_material VARCHAR(15) ,was_recycled BOOLEAN, is_necessary VARCHAR(1), waste_notes VARHCHAR(100), log_date VARHCHAR(27) )',[])
          .then(data => {
              this.databaseReady.next(true);
             
          return data;
          }).catch(() => {
            
        })
    });
  }
  addWasteLog(wastename,wasteamount,wastetype,waste_material,was_recycled,is_necessary,waste_notes,log_date:Date){
    
    // let data = [wastename,wastetype,wasteamount]
    let formattedDate = format(log_date, "yyyy-MM-dd HH:mm:ss.SSS")
    
    return this.db.executeSql('INSERT into log (waste_name, waste_amount, waste_type, waste_material, was_recycled, is_necessary, waste_notes,log_date) VALUES (?,?,?,?,?,?,?,?)', 
      [wastename,wasteamount,wastetype,waste_material,was_recycled,is_necessary,waste_notes,formattedDate]).then((data) =>{
        this.loadWasteLogs();
        
      }).catch((err) =>{
        alert("failed to add");
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
  getTodayLog(date: Date){

    let inDate = format(date, 'yyyy-MM-dd');
   
    return this.db.executeSql('SELECT * FROM log WHERE date(log_date) = date(?)', [inDate]).then(data =>{
      let result= [];
      
      if (data.rows.length > 0){
        
        try{
          for (let i = data.rows.length; i >= 0; i--){
            let log =    
              {
              id: data.rows.item(i).id,
              wastename : data.rows.item(i).waste_name,
              wasteamount : data.rows.item(i).waste_amount,
              wastetype : data.rows.item(i).waste_type,
              wastematerial : data.rows.item(i).waste_material,
              wasrecycled : <Boolean>data.rows.item(i).was_recycled,
              necessary : data.rows.item(i).is_necessary,
              wasteNotes : data.rows.item(i).waste_notes, 
              logdate : new Date(data.rows.item(i).log_date)
              }    
              
              result.push(log);
          }
        }catch(err){
          alert("err found : " + err); 
        }
      }else{
        alert("no results ");
      }
      this.bevTimeLogs.next(result);
    })
   
  }
  deleteWasteLog(log: Log){
    let serverLog: Log
    
    // this.getWasteLog(log.id).then(data => {
    //   serverLog = data;
    // })
    // if(serverLog.id == log.id && serverLog.wastename == log.wastename){
      return this.db.executeSql('DELETE FROM log WHERE id = ?',[log.id]).then(data =>{
        alert("Record Deleted")
        return 200
      }).catch((err) =>{
        alert("Failed to delete")
      });
    // }
    // else{
    //   alert("delete Log doesnt match Database log");
    //   return "Requested Log id did not match database";
    // }
    
  }
  loadWasteLogs(){
    return this.db.executeSql('SELECT * FROM log', []).then(data =>{
      let result= [];
 
      if (data.rows.length > 0){
        
        try{
          for (let i =0; i < data.rows.length; i++){
           
            
            let log =    
              {
              id: data.rows.item(i).id,
              wastename : data.rows.item(i).waste_name,
              wasteamount : data.rows.item(i).waste_amount,
              wastetype : data.rows.item(i).waste_type,
              wastematerial : data.rows.item(i).waste_material,
              wasrecycled : <Boolean> data.rows.item(i).was_recycled,
              necessary : data.rows.item(i).is_necessary,
              wasteNotes : data.rows.item(i).waste_notes, 
              logdate : new Date(data.rows.item(i).log_date)
              }    
              
              result.push(log);
          }
        }catch(err){
          alert("err found : " + err); 
        }
      }
      
      this.bevWasteLogs.next(result);
    })
   
  }
  getbevWasteLogs(): Observable<Log[]> {
    return this.bevWasteLogs.asObservable();
  }
  getbevTimeLogs(): Observable<Log[]> {
    return this.bevTimeLogs.asObservable();
  }
  deleteTemp() {
    return this.db.executeSql('DELETE * FROM logs', []).then(_ => {
      this.loadWasteLogs();
    });
  }
}

