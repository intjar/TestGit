import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { Title } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { CommonChartService } from './common-file/createchartjs.service';
import { ChartTypeService } from './common-file/charttype.service';


import { HomeComponent } from './home/home.component';

import { CapacityComponent } from './capacity/capacity.component';
import { CapacityService } from './capacity/capacity.service';

import { GenerationComponent } from './generation/generation.component';
import { GenerationService } from './generation/generation.service';

import { TestcodeComponent } from './testcode/testcode.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CapacityComponent,
    GenerationComponent,
    TestcodeComponent
  ],
  providers: [
    CommonChartService,
    ChartTypeService,
    CapacityService,
    GenerationService
    ],


  imports: [
    AppRoutingModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
