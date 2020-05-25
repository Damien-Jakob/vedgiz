import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {CartPageRoutingModule} from './cart-routing.module';

import {CartPage} from './cart.page';
import {UnselectedVegetablesPipe} from "../unselected-vegetables.pipe";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CartPageRoutingModule,
        ReactiveFormsModule,
    ],
    declarations: [
        CartPage,
        // Added manually
        UnselectedVegetablesPipe
    ]
})
export class CartPageModule {
}
