import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Log, DatabaseService } from 'src/app/services/database.service';
import { compareAsc, format } from 'date-fns'
@Component({
  selector: 'app-log-modal',
  templateUrl: './log-modal.page.html',
  styleUrls: ['./log-modal.page.scss'],
})
export class LogModalPage implements OnInit {

  @Input() public log : Log;
  constructor(private databaseService: DatabaseService ,private modalCtrl: ModalController) { 
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
    if(wasteType === "bottle"){
      this.headImage = "PlasticBottle.jpg" ;
    }else
        if(wasteType.includes("glass")){
           this.headImage = "wasteGlass.png"
        }else{
            if(wasteType.includes("cardboard")){
              this.headImage = "cardboardWaste.png"
              }else{
                this.headImage = "nicaraguaWaste.png"
              }
        }
    

  }
    
   
  async closeModal( log){
      await this.modalCtrl.dismiss();
    }
}
