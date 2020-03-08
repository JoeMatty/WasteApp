import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddPopComponent } from './add-pop.component';

describe('AddPopComponent', () => {
  let component: AddPopComponent;
  let fixture: ComponentFixture<AddPopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPopComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddPopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
