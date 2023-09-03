import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DatePipe} from "@angular/common";
import {FunctionsProvider} from "./helper/functions";
import {StorageProvider} from "./providers/storage";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
    declarations: [AppComponent],
    imports: [
        HttpClientModule,
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule
    ],
    providers: [
        StorageProvider,
        FunctionsProvider,
        DatePipe,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
