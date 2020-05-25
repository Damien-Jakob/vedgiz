import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VegetablesIndexPageRoutingModule } from './vegetables-index-routing.module';

import { VegetablesIndexPage } from './vegetables-index.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VegetablesIndexPageRoutingModule
  ],
  declarations: [VegetablesIndexPage]
})
export class VegetablesIndexPageModule {}
