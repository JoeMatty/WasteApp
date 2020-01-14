import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WasteHomePage } from './waste-home.page';

describe('WasteHomePage', () => {
  let component: WasteHomePage;
  let fixture: ComponentFixture<WasteHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WasteHomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WasteHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
