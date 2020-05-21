import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import {
  HttpBackend,
  HttpClient
} from '@angular/common/http';
import {
  HttpTestingController,
  HttpClientTestingModule
} from '@angular/common/http/testing';
import { WasteHomePage } from './waste-home.page';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs';
import { DatabaseService } from 'src/app/services/database.service';
export class MockDbService {
  private databaseReady: BehaviorSubject<undefined> = new BehaviorSubject(undefined); //This varaible true when the db is open and readyt for commands
  create(){
    var t:any;
    return(t)
  }
  getDataBaseState(){
    
    return this.databaseReady.asObservable();
  }
}
describe('WasteHomePage', () => {
  let component: WasteHomePage;
  let fixture: ComponentFixture<WasteHomePage>;
  let chartSpy;
  let testData = [{
    id : 1,
    wastename: "Coca Cola",
    wasteamount: 1,
    wastetype: "Plastic",
    wastematerial: "PET",
    wasrecycled: true,
    necessary: "a",
    wasteNotes: "Was bought on the weekend at the beach",
    logdate: new Date("2013-12-09 17:22:00.000"),
    formattedDate: "09-12-2013"
  },
  {
    id : 2,
    wastename: "Shop Bag",
    wasteamount: 1,
    wastetype: "Plastic",
    wastematerial: "HDPE",
    wasrecycled: true,
    necessary: "m",
    wasteNotes: "Needed a bag, will be reused",
    logdate: new Date("2017-12-09T12:22:00.000Z"),
    formattedDate: "12-12-2013"
  },{
    id : 3,
    wastename: "Tin Can",
    wasteamount: 8,
    wastetype: "Metals",
    wastematerial: "41",
    wasrecycled: false,
    necessary: "a",
    wasteNotes: "Bought from supermarket in multipack",
    logdate: new Date("2013-12-09 17:22:00.000"),
    formattedDate: "01-01-2014"
  },
  {
    id : 4,
    wastename: "Magazine",
    wasteamount: 1,
    wastetype: "Bag",
    wastematerial: "HDPE",
    wasrecycled: false,
    necessary: "m",
    wasteNotes: "Needed a bag, will be reused",
    logdate: new Date("2017-12-09T12:22:00.000Z"),
    formattedDate: "09-08-2013"
  },{
    id : 5,
    wastename: "Can of Beer",
    wasteamount: 1,
    wastetype: "MixedMetal",
    wastematerial: "41",
    wasrecycled: false,
    necessary: "a",
    wasteNotes: "Bought for the birthday party",
    logdate: new Date("2013-12-09 17:22:00.000"),
    formattedDate: "21-02-2014"
  },
  {
    id : 6,
    wastename: "Carton",
    wasteamount: 1,
    wastetype: "Bag",
    wastematerial: "HDPE",
    wasrecycled: true,
    necessary: "m",
    wasteNotes: "Needed a bag, will be reused",
    logdate: new Date("2017-12-09T12:22:00.000Z"),
    formattedDate: "23-08-2013"
  }]
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WasteHomePage ],
      providers: [{provide: DatabaseService, useClass: MockDbService}],
      imports: [IonicModule.forRoot(), 
        RouterTestingModule,
        HttpClientTestingModule,]
      }).compileComponents();
      //creates a mock version of the Home Page so that dataa can be inputted
      fixture = TestBed.createComponent(WasteHomePage);
      component = fixture.componentInstance;

      //A spy is used to watch if the create bar chart is called as expected
      spyOn(component, 'createBarChart')
    fixture.detectChanges();
    component.calculateDataTotals(testData)
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should total data correctly', () => {
    
    expect(component.wasteTotal).toEqual(13);
  });
  it('should calculate amount of waste recycled', () => {
    
    expect(component.wasteRecycled).toEqual(3);
  });
  it('should calualte percetage of none recycled waste', () => {
    
    expect(component.totalnotRecycled).toEqual(77);
  });
  it('should calualte percetage of recycled waste', () => {
    
    expect(component.totalPerRec).toEqual(23);
  });
  it('Expect Create a Bar chart to have been called', () => {
    
    expect(component.createBarChart).toHaveBeenCalled();
  });
});
