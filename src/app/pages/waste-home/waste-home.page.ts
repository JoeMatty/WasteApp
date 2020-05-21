import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import { ToastController, ModalController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { AddPopComponent } from '../../popover/add-pop/add-pop.component';
import { Chart } from 'chart.js';
import { subWeeks } from 'date-fns'

@Component({
  selector: 'app-waste-home',
  templateUrl: './waste-home.page.html',
  styleUrls: ['./waste-home.page.scss'],
})
export class WasteHomePage implements OnInit {
  @ViewChild('pieChart',{static: false}) pieChart;

  wasteLogModal = null;
  wasteTotal = 0;
  wasteLogs = [];
  totalPerRec = 0;
  totalnotRecycled = 0;
  recycleSummarySize = 6;
  nonRecycleSummarySize = 6;
  wasteRecycled=0;
  databaseState;
  subcribe : any;
  wasteAmounts = [0,0,0,0,0]
  wastePercentages = ["","","","",""]

  constructor(private router: Router,private databaseService: DatabaseService,
    private modalCtrl: ModalController ,private toastctrl: ToastController, private popCtrl: PopoverController) { 
    
  }
  public createBarChart() {
    this.pieChart = new Chart(this.pieChart.nativeElement, {
      type: 'doughnut',
      data: {
        datasets: [{
            label: 'Waste Percentages',
            data: this.wasteAmounts,
            backgroundColor: [
                '#910101',
                '#0124bd',
                '#1ec28b',
                '#aaaaaa',
                '#252424',
            ],

            borderWidth: 0
        }]
    }
    });
  }
  ngOnInit() {
    
    this.databaseService.getDataBaseState().subscribe(rdy => {
      this.databaseState = rdy;
      if(rdy){
        
       

        // this.subcribe = this.databaseService.getbevWasteLogs();
        // this.subcribe.subscribe(logs => {
        //   alert("in global subscribe");
        //   try{
        //   this.wasteTotal =0;
        //   this.wasteAmounts = [0,0,0,0,0];
        //   this.wastePercentages = ["","","","",""];
        //   this.wasteRecycled = 0;
          
        
        //   this.calculateDataTotals(logs);
        //   alert("calculated scores");
        //   }
        //   catch (error){
        //       alert("error :"+ error)
        //   }
        // })
        this.databaseService.getbevWasteLogs().subscribe(logs => {
          
          try{
          this.wasteTotal =0;
          this.wasteAmounts = [0,0,0,0,0];
          this.wastePercentages = ["","","","",""];
          this.wasteRecycled = 0;
          
          this.calculateDataTotals(logs);
          
        }
          catch (error){
                
            
            }
        })
        
      }
    });
  }
  calculateDataTotals(logs : any[]){
    let logsPresent = false;
    for(let log of logs){
      this.wasteTotal += log.wasteamount;
      switch(log.wastetype.toLocaleLowerCase()){
        case "plastic": {
          this.wasteAmounts[0] += log.wasteamount;
          break;
        }
        case "mixedpaper":{
          this.wasteAmounts[1] += log.wasteamount;
          break;
        }
        case "glass":{
          this.wasteAmounts[2] += log.wasteamount;
          break;
        }
        case "metals":{
          this.wasteAmounts[3] += log.wasteamount;
          break;
        }
        default: {
          this.wasteAmounts[4] += log.wasteamount;
          break;
        }
      }
      //Check if recycled
      if(Boolean(String(log.wasrecycled) == "true")){
        this.wasteRecycled += log.wasteamount;
      }
      logsPresent = true;
    }
    
  
    if(logsPresent == true){
      
    for(let i = 0; i < this.wastePercentages.length; i++){
      
      
      let wasteAmount = this.wasteAmounts[i];
      if(wasteAmount > 0 ){
          this.wastePercentages[i] =  Math.round(wasteAmount/this.wasteTotal * 100).toFixed(0);
      }else{
        this.wastePercentages[i] = "0";
      }
    }

    if(this.wasteRecycled > 0 ){
      
      this.totalPerRec = +Math.round((this.wasteRecycled / this.wasteTotal) * 100).toFixed(0);
      this.totalnotRecycled = (100 - this.totalPerRec);

      this.recycleSummarySize = +Math.round((12/100 )* this.totalPerRec).toFixed(0);
      this.nonRecycleSummarySize = 12 - this.recycleSummarySize;

      if(this.recycleSummarySize < 2 ){
        this.recycleSummarySize = 2;
      }
      if(this.nonRecycleSummarySize < 2 ){
        this.nonRecycleSummarySize = 2;
      }

    }
   
    let active =  this.router.isActive('/tabs/Waste-Home', false)
    if(logs.length > 0 && active){
      
      this.createBarChart();
      
    }

    }
  }
  loadWasteLogs() {
    
    this.databaseService.loadWasteLogs().then(res => {
      
    });
  }
  ionViewDidEnter(){
  //   this.ngOnInit();
  //  alert("in Ion enter");
    if(this.databaseState){
      
      this.databaseService.loadWasteLogs()
      
 }
  }

  async presentPopover(ev: any) {
    const popover = await this.popCtrl.create({
      component: AddPopComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

  //tempory functions using local ionic variable
  openManualAdd(){
    let modal = this.modalCtrl.create({
      component: 'AddManualPage'
    }).then( modal => {
      modal.present();
      this.wasteLogModal = modal;
    });

  }

}
