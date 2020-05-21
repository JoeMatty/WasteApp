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
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { RouterTestingModule } from '@angular/router/testing';

import { ProductapiService } from './productapi.service';

describe('ProductapiService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      IonicModule.forRoot(),
      RouterTestingModule,
      HttpClientTestingModule
      
  ]
  }));

  it('should be created', () => {
    const service: ProductapiService = TestBed.get(ProductapiService);
    expect(service).toBeTruthy();
  });
});
