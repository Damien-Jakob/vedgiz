import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VegetablesShowPage } from './vegetables-show.page';

describe('VegetablesShowPage', () => {
  let component: VegetablesShowPage;
  let fixture: ComponentFixture<VegetablesShowPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VegetablesShowPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VegetablesShowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
