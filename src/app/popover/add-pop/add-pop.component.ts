import { Component, OnInit } from '@angular/core';
import { PopoverController, NavParams, ToastController } from '@ionic/angular';
import { isNgTemplate } from '@angular/compiler';

@Component({
  selector: 'app-add-pop',
  templateUrl: './add-pop.component.html',
  styleUrls: ['./add-pop.component.scss'],
})
export class AddPopComponent implements OnInit {
  item : any;
  confirmed: boolean;
  amountOfItem: number;
  wasRecycled : boolean;
  constructor(private popControl :PopoverController,private navParams: NavParams,private toastController: ToastController) { }

  ngOnInit() {
    this.item = this.navParams.data.item;
    this.amountOfItem = 1;
  }
  ionViewDidEnter(){
      this.confirmed = false;
  }
  async closePop(){
    let response = {
      'item' : this.item,
      'confirmed': this.confirmed,
      'wasRecycled': this.wasRecycled,
      'amount': this.amountOfItem
    };
    await this.popControl.dismiss(response);
  }
  add(){
    this.amountOfItem = 1 + this.amountOfItem;
  }
  minus(){
    if(this.amountOfItem > 1){
      this.amountOfItem -= 1;
    }
  }
  changeAmount(ev){
    let value = ev.target.value;
    if(value != null){

        if(value > 0){
            this.amountOfItem = value;
        }else{
            this.amountOfItem = 1
            this.presentToast("Amount must be more than 0","danger");
      }
    }
  }
  async presentToast(message: string,color:string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color
    });
    toast.present();
  }
  confirm(){
    this.confirmed = true;
    this.closePop();
  }
}
