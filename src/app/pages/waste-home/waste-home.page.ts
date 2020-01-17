import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-waste-home',
  templateUrl: './waste-home.page.html',
  styleUrls: ['./waste-home.page.scss'],
})
export class WasteHomePage implements OnInit {
  myString = "beep";
  constructor(private router: Router) { 
    
  }

  ngOnInit() {
  }

  openPage(){
    this.myString = "boop";
    this.router.navigateByUrl('/tabs/Add-manual');
  }

}
