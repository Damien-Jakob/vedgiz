import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BasketShowPageRoutingModule } from './basket-show-routing.module';

import { BasketShowPage } from './basket-show.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BasketShowPageRoutingModule
  ],
  declarations: [BasketShowPage]
})
export class BasketShowPageModule {}
