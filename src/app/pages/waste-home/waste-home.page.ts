import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddWasteService } from './../../services/add-waste.service';

@Component({
  selector: 'app-waste-home',
  templateUrl: './waste-home.page.html',
  styleUrls: ['./waste-home.page.scss'],
})
export class WasteHomePage implements OnInit {
  wasteTotal = 32;
  constructor(private router: Router, private addWasteService: AddWasteService) { 
    
  }

  ngOnInit() {
    
      this.addWasteService.getWasteTotal().then(totAmount => {
        this.wasteTotal = totAmount;
      });
    
  }
update(){
  this.addWasteService.getWasteTotal().then(totAmount => {
    this.wasteTotal = totAmount;
  });
}
  openPage(){
    this.router.navigateByUrl('/tabs/Add-Manual');
  }

}
