import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VegetablesIndexPage } from './vegetables-index.page';

const routes: Routes = [
  {
    path: '',
    component: VegetablesIndexPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VegetablesIndexPageRoutingModule {}
