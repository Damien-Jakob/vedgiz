import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BasketShowPage } from './basket-show.page';

describe('BasketShowPage', () => {
  let component: BasketShowPage;
  let fixture: ComponentFixture<BasketShowPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasketShowPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BasketShowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
