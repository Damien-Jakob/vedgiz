import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VegetablesIndexPage } from './vegetables-index.page';

describe('VegetablesIndexPage', () => {
  let component: VegetablesIndexPage;
  let fixture: ComponentFixture<VegetablesIndexPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VegetablesIndexPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VegetablesIndexPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
