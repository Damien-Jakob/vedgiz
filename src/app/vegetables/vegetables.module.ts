import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VegetablesPageRoutingModule } from './vegetables-routing.module';

import { VegetablesPage } from './vegetables.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VegetablesPageRoutingModule
  ],
  declarations: [VegetablesPage]
})
export class VegetablesPageModule {}
