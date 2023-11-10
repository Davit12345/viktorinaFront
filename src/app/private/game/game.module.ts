import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { AnimationTimerComponent } from './../../components/animation-timer';

import { GamePageRoutingModule } from './game-routing.module';

import { GamePage } from './game.page';
import {ResultListComponent} from "../../components/result-list/result-list.component";
import {GetTypeTimeComponent} from "../../components/get-type-time/get-type-time.component";
import {GetCategoryComponent} from "../../components/get-category/get-category.component";
import {GameResultComponent} from "../../components/game-result/game-result.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GamePageRoutingModule
  ],
  declarations: [GamePage, AnimationTimerComponent, ResultListComponent, GetTypeTimeComponent,GetCategoryComponent,GameResultComponent]
})
export class GamePageModule {}
