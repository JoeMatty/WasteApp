import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddManualPage } from './add-manual.page';

describe('AddManualPage', () => {
  let component: AddManualPage;
  let fixture: ComponentFixture<AddManualPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddManualPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddManualPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
