import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FindOponentPageRoutingModule } from './find-oponent-routing.module';

import { FindOponentPage } from './find-oponent.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FindOponentPageRoutingModule
  ],
  declarations: [FindOponentPage]
})
export class FindOponentPageModule {}
