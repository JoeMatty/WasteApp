import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import {
  HttpBackend,
  HttpClient
} from '@angular/common/http';
import {
  HttpTestingController,
  HttpClientTestingModule
} from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { RouterTestingModule } from '@angular/router/testing';

import { DatabaseService } from 'src/app/services/database.service';

import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Storage } from '@ionic/storage';
import { AddManualPage } from './add-manual.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('AddManualPage', () => {
  let component: AddManualPage;
  let fixture: ComponentFixture<AddManualPage>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;


  class MockStorage {}
  class MockDbService {
    create(){
      var t:any;
      return(t)
    }
  }
  class MockBarcodeScan {}
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddManualPage ],
      providers: [{provide: Storage, useClass: MockStorage},{provide: DatabaseService, useClass: MockDbService},{provide: BarcodeScanner, useClass: MockBarcodeScan}],
      imports: [IonicModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule
        
    ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]
    }).compileComponents();
    httpClient = TestBed.get(HttpClient);

    fixture = TestBed.createComponent(AddManualPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
