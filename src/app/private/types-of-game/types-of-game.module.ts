import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TypesOfGamePageRoutingModule } from './types-of-game-routing.module';

import { TypesOfGamePage } from './types-of-game.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TypesOfGamePageRoutingModule
  ],
  declarations: [TypesOfGamePage]
})
export class TypesOfGamePageModule {}
