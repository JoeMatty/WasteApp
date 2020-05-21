import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { RouterTestingModule } from '@angular/router/testing';
import { DatabaseService } from 'src/app/services/database.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../material.module';
import {
  HttpBackend,
  HttpClient
} from '@angular/common/http';
import {
  HttpTestingController,
  HttpClientTestingModule
} from '@angular/common/http/testing';

import { FullLogPage } from './full-log.page';
import { BehaviorSubject, Observable } from 'rxjs';
export class MockDbService {
  private databaseReady: BehaviorSubject<undefined> = new BehaviorSubject(undefined); //This varaible true when the db is open and readyt for commands
  create(){
    var t:any;
    return(t)
  }
  getDataBaseState(){
    
    return this.databaseReady.asObservable();
  }
}
describe('FullLogPage', () => {
  class MockStorage {}

  let component: FullLogPage;
  let fixture: ComponentFixture<FullLogPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullLogPage ],
      providers: [{provide: Storage, useClass: MockStorage},{provide: DatabaseService, useClass: MockDbService}],
      imports: [IonicModule.forRoot(),
        MaterialModule,
        RouterTestingModule,
        HttpClientTestingModule,
        BrowserAnimationsModule
        ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(FullLogPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
