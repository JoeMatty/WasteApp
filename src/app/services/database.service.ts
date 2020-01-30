import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  db: SQLiteObject;
  private databaseReady: BehaviorSubject<boolean>; //This varaible true when the db is open and readyt for commands

  constructor(private http: HttpClient, private sqlite: SQLite, private plt: Platform) { 
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
    console.log('Open/Create DB')         //For debugging  -- remove
    return this.sqlite.create({
      name: 'wasteLog.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
        this.db = db;
        return this.db.sqlBatch([
            'CREATE TABLE IF NOT EXISTS log(id INTEGER PRIMARY KEY AUTOINCREMENT, waste_name VARHCHAR(32),waste_type VARHCHAR(15), waste_amount SMALLINT)'  
        ]).then(data => {
        this.databaseReady.next(true);
        return data;
        });
    });
  }
  addWasteLog(data){
    return this.db.executeSql('INSERT into log (waste_name, waste_type, waste_amount) VALUES (?)', [data]);
  }
  getWasteLogs(){
    return this.db.executeSql('SELECT * FRON log', null).then(data =>{
      let result = [];
      for (let i =0; i < data.rows.length; i++){
        result.push({ waste_name: data.rows.item(i).waste_name, waste_type: data.rows.item(i).waste_type, waste_amount: data.rows.item(i).waste_amount })
      }
      return result;
    });
  }
}
