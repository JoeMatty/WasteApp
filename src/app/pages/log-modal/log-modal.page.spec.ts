import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LogModalPage } from './log-modal.page';

describe('LogModalPage', () => {
  let component: LogModalPage;
  let fixture: ComponentFixture<LogModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LogModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
