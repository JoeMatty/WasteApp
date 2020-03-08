import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AddWasteService } from './../../services/add-waste.service';
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
  wasteTotal = 32;
  wasteLogs = [];
  wasteNotRecycled= 0;
  wasteRecycled=0;
  databaseState;
  
  wasteAmounts = [0,0,0,0,0]

  constructor(private router: Router, private addWasteService: AddWasteService,private databaseService: DatabaseService,
    private modalCtrl: ModalController ,private toastctrl: ToastController, private popCtrl: PopoverController) { 
    
  }
  createBarChart() {
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
        

        this.databaseService.getbevWasteLogs().subscribe(logs => {
          
          alert("starting loop : " + logs.length)
          for(let log of logs){
            if(log.wastetype === "plastic"){
              this.wasteAmounts[0] += 0;
            }
            if(log.wastetype === "paper"){
              this.wasteAmounts[1] += 1;
            }
            if(log.wastetype === "glass"){
              this.wasteAmounts[2] += 1;
            }
            if(log.wastetype === "metal"){
              this.wasteAmounts[3] += 1;
            }
            if(log.wastetype === "other"){
              this.wasteAmounts[4] += 1;
            }
            //Check if recycled
            if(String(log.wasrecycled) == "true"){
              this.wasteRecycled++;
            }else{
              this.wasteNotRecycled++;
            }
          }
          if(logs.length > 0){
            this.createBarChart();
          }
            
        })
        
      }
    });
  }
  ionViewDidEnter(){
    
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

  }

}
