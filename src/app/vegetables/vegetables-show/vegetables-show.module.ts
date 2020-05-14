import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VegetablesShowPageRoutingModule } from './vegetables-show-routing.module';

import { VegetablesShowPage } from './vegetables-show.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VegetablesShowPageRoutingModule
  ],
  declarations: [VegetablesShowPage]
})
export class VegetablesShowPageModule {}
