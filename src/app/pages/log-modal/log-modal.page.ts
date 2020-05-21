import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Log, DatabaseService } from 'src/app/services/database.service';
import { compareAsc, format } from 'date-fns'
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-log-modal',
  templateUrl: './log-modal.page.html',
  styleUrls: ['./log-modal.page.scss'],
})
export class LogModalPage implements OnInit {

  @Input() public log : Log;
  constructor(private databaseService: DatabaseService ,private modalCtrl: ModalController,private toastController: ToastController) { 
    console.log(this.log);
  }
  formattedD = ""
  formattedT = ""
  formattedAmount = ""
  headImage = ""
  cardClass = ""

  ngOnInit() {
    this.formattedD = format(this.log.logdate,'yyyy-MM-dd');
    this.formattedT = format(this.log.logdate,"HH:mm:ss");
    this.formattedAmount = ""+ this.log.wasteamount 
    let wasteType = this.log.wastetype.toLowerCase();

    if(this.log.wasrecycled === true){
        this.cardClass = "cardSuccess";
    }
    if(this.log.wasrecycled === false){
      this.cardClass = "cardFailure";
    }
    this.headImage = "wastePic/MixedBad2.png"


    switch(this.log.wastetype.toLocaleLowerCase()){
      case "plastic": {
        this.headImage = "wastePic/plasticGood.png" ;
        if(this.log.wasrecycled == false){
            this.headImage = "wastePic/PlasticBottleBad.png" ;
        }
        break;
      }
      case "mixedpaper":{
        this.headImage = "wastePic/cardboardGood.png"
        if(this.log.wasrecycled == false){
          this.headImage = "wastePic/MixedBad.jpg" ;
        }
        break;
      }
      case "glass":{
        this.headImage = "wastePic/GlassGood.jpg"
        if(this.log.wasrecycled == false){
          this.headImage = "wastePic/GlassBad.png" ;
        }
        break;
      }
      case "metals":{
        this.headImage = "wastePic/metalGood.png"
        if(this.log.wasrecycled == false){
          if(this.log.wastename.toLocaleLowerCase().includes("can")){
            this.headImage = "wastePic/MetalCanBad.png" ;
          }
          this.headImage = "wastePic/metalBad.png" ;
        }
        break;
      }
    }
  }
    
  deleteLog() {  
 
    this.databaseService.deleteWasteLog(this.log).then((data => {
      if(data == true){
        this.presentToast();
        this.closeModal();
      }
    }))

  }  
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Log has been removed.',
      duration: 2000,
      color: "success"
    });
    toast.present();
  }
  async closeModal(){
      await this.modalCtrl.dismiss();
    }
}
