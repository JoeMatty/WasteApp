import { TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import {
  HttpBackend,
  HttpClient
} from '@angular/common/http';
import {
  HttpTestingController,
  HttpClientTestingModule
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DatabaseService } from './database.service';
import { SQLite } from '@ionic-native/sqlite/ngx';

describe('DatabaseService', () => {
  class Mocksqlite{

  }
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: SQLite, useValue: Mocksqlite },
    ],
    imports: [
      IonicModule.forRoot(),
      RouterTestingModule,
      HttpClientTestingModule
      
  ]
  }));

  it('should be created', () => {
    const service: DatabaseService = TestBed.get(DatabaseService);
    expect(service).toBeTruthy();
  });
});
