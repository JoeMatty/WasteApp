import { Component, OnInit } from '@angular/core';
import { PopoverController, NavParams } from '@ionic/angular';
import { isNgTemplate } from '@angular/compiler';

@Component({
  selector: 'app-add-pop',
  templateUrl: './add-pop.component.html',
  styleUrls: ['./add-pop.component.scss'],
})
export class AddPopComponent implements OnInit {
  item : any;
  constructor(private popControl :PopoverController,private navParams: NavParams) { }

  ngOnInit() {
    this.item = this.navParams.data.item;
  }
  async closePop(){
    await this.popControl.dismiss();
  }
  confirm(){
    console.log("wop: " + this.item.wastename)
    this.closePop();
  }
}
