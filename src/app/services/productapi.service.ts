import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductapiService {
  films: Observable<any>;
  url = "https://secretive-paper-rhvxx3gher.glitch.me/product"
  constructor(private http: HttpClient) {
   }

  searchData(barcodeid: Number){
    return this.http.get(`${this.url}/${barcodeid}`)
  }
}
