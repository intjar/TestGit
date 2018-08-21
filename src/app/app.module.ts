import { environment } from '../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from "@angular/common/http";
import { ServiceWorkerModule } from '@angular/service-worker';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';


import {DashboardComponent} from './dashboard/dashboard.component';

import {CapacityComponent} from './capacity/capacity.component';
import {CapacityService} from './capacity/capacity.service';

import {GenerationComponent} from './generation/generation.component';
import {GenerationService} from './generation/generation.service';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CapacityComponent,
    GenerationComponent,
  ],
  
  providers: [
    CapacityComponent,
    GenerationComponent,
    CapacityService,
    GenerationService
  ],

  bootstrap: [AppComponent],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    HttpModule,
    HttpClientModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
  ],

})

export class AppModule { }
