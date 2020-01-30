import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddWasteService } from './../../services/add-waste.service';
import { DatabaseService } from 'src/app/services/database.service';
import { ToastController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-waste-home',
  templateUrl: './waste-home.page.html',
  styleUrls: ['./waste-home.page.scss'],
})
export class WasteHomePage implements OnInit {
  wasteLogModal = null;
  wasteTotal = 32;
  wasteLogs = [];
  constructor(private router: Router, private addWasteService: AddWasteService,private databaseService: DatabaseService,
    private modalCtrl: ModalController ,private toastctrl: ToastController) { 
    
  }

  ngOnInit() {
    
  }
  ionViewDidEnter(){
    this.databaseService.getDataBaseState().subscribe(rdy => {
      if(rdy){
        this.loadWasteLogs();
      }
    })
  }
  loadWasteLogs() {
    this.databaseService.getWasteLogs().then(res => {
      this.wasteLogs = res;
    });
  }


  //tempory functions using local ionic variable
  update(){
    this.addWasteService.getWasteTotal().then(totAmount => {
      this.wasteTotal = totAmount;
    });
  }
  openManualAdd(){
    let modal = this.modalCtrl.create({
      component: 'AddManualPage'
    }).then( modal => {
      modal.present();
      this.wasteLogModal = modal;
    });
    
    // this.wasteLogModal.onDidDismiss(data=>{
    //   if (data && data.reload) {
    //     let toast = this.toastctrl.create({
    //       message: 'New Log Added',
    //       duration: 2000,
    //       color: 'success'
    //     })
    //     this.loadWasteLogs();
    //   }
    //   else{
    //     let toast = this.toastctrl.create({
    //       message: 'Log has not been added',
    //       duration: 2000,
    //       color: 'failure'
    //     })        
    //     this.loadWasteLogs();
    //   }
    // });
  }

}
