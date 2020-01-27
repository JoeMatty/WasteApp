import { Component, OnInit } from '@angular/core';
import { AddWasteService } from './../../services/add-waste.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-add-manual',
  templateUrl: './add-manual.page.html',
  styleUrls: ['./add-manual.page.scss']
})
export class AddManualPage implements OnInit {
  newAmount: number = 0;
  wasteType: string = "";
  wasteAmount: string = "";

  quickAdd = this.formBuilder.group({
    'wasteName': ['', Validators.required],
    'wasteType': ['', Validators.required],
    'wasteAmount': ['0', Validators.required],
  });

  constructor(private formBuilder: FormBuilder, private router: Router, private addWasteService: AddWasteService, private databaseService: DatabaseService) { 

    
  }

  ngOnInit() {
  }

  handleWasteAmount(amount){
    this.addWasteService.addWasteTotal(1).then(() => {
      this.router.navigateByUrl('/tabs/Waste-Home');
    });
  }
  processForm(){
    this.newAmount += this.quickAdd.get('wasteAmount').value as number ;
    console.log(this.newAmount );
      // this.addWasteService.addWasteTotal(1).then(() => {
      //   this.router.navigateByUrl('/tabs/Waste-Home');
      // });
    
  }
}

// Pages include waste summary page, product information page, settings page.
