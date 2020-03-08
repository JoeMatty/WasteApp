import { Injectable } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ProductapiService } from 'src/app/services/productapi.service';

export interface Product {
  barcodeid : number,
  productName: string,
  productType: string,
  material: string
}

@Injectable({
  providedIn: 'root'
})
export class CameraScanService {
   
  constructor(private barcodeScanner: BarcodeScanner,private productService: ProductapiService) { }

  async scanBarcode() {
    let product: any;
    // this.barcodeScanner.scan().then(barcodeData => {
    //     this.productService.searchData(+barcodeData.text).subscribe(result => {
    //       let response: any = result;
    //       if(response['found']){
    //         product = response;
    //       }
    //       else{
    //         console.log(JSON.stringify(product));
    //       }
    //     })
           
  //   }).catch(err => {
  //       product = {'Failed': true}
  //   });
  //   return product;
  }
}
