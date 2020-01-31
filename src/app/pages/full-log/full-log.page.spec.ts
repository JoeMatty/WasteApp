import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FullLogPage } from './full-log.page';

describe('FullLogPage', () => {
  let component: FullLogPage;
  let fixture: ComponentFixture<FullLogPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullLogPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FullLogPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
