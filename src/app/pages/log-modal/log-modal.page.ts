import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Log } from 'src/app/services/database.service';
@Component({
  selector: 'app-log-modal',
  templateUrl: './log-modal.page.html',
  styleUrls: ['./log-modal.page.scss'],
})
export class LogModalPage implements OnInit {

  @Input() public log : Log;
  constructor(private modalCtrl: ModalController) { 
    console.log(this.log);
  }
  
  ngOnInit() {
  }
  async closeModal(){
      await this.modalCtrl.dismiss();
    }
}
