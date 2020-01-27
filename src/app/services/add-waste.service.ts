import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

const STORAGE_KEY = 'wasteAmountTotal';
const defaultWasteValue = 0;

@Injectable({
  providedIn: 'root'
})
export class AddWasteService {

  constructor(private storage: Storage) { }
  
    getWasteTotal(){
      return this.storage.get(STORAGE_KEY)
    }
    
    addWasteTotal(amount){
  
      return this.getWasteTotal().then(totAmount => {
        console.log(totAmount);
        return this.storage.set(STORAGE_KEY, totAmount+amount);
        });
    }
}