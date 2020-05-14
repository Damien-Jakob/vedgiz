import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VegetablesShowPage } from './vegetables-show.page';

const routes: Routes = [
  {
    path: '',
    component: VegetablesShowPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VegetablesShowPageRoutingModule {}
