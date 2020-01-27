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
  private databaseReady: BehaviorSubject<boolean>;

  constructor(private http: HttpClient, private sqlite: SQLite, private plt: Platform) { 
    this.databaseReady = new BehaviorSubject(false);
    this.plt.ready().then(() => {
        this.openOrCreate();
    })
  }

  getDataBaseState(){
    return this.databaseReady.asObservable();
  }
  openOrCreate(){
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
}
