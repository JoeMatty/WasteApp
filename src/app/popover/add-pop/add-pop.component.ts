import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-add-pop',
  templateUrl: './add-pop.component.html',
  styleUrls: ['./add-pop.component.scss'],
})
export class AddPopComponent implements OnInit {

  constructor(private popControl :PopoverController) { }

  ngOnInit() {}
  async closePop(){
    await this.popControl.dismiss();
  }
}
