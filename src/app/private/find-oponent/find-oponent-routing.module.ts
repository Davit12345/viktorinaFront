import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FindOponentPage } from './find-oponent.page';

const routes: Routes = [
  {
    path: '',
    component: FindOponentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FindOponentPageRoutingModule {}
