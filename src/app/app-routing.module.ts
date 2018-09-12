import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CapacityComponent } from './capacity/capacity.component';
import { GenerationComponent } from './generation/generation.component';

import { TestcodeComponent } from './testcode/testcode.component';


const routes: Routes = [
  {path: '',component: HomeComponent},
  {path: 'home',component: HomeComponent},
  { path: 'capacity', component: CapacityComponent },
  { path: 'generation', component: GenerationComponent },

  { path: 'testPurpose', component: TestcodeComponent },
  
];



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [],

  exports: [ RouterModule ]
})
export class AppRoutingModule { }
