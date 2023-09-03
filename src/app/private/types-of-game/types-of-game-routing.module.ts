import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TypesOfGamePage } from './types-of-game.page';

const routes: Routes = [
  {
    path: '',
    component: TypesOfGamePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TypesOfGamePageRoutingModule {}
