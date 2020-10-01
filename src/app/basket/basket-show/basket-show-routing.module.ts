import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BasketShowPage } from './basket-show.page';

const routes: Routes = [
  {
    path: '',
    component: BasketShowPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BasketShowPageRoutingModule {}
