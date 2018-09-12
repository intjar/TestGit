import { Component, OnInit} from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { Title } from '@angular/platform-browser';

import { CapacityService } from './capacity.service';
import { AllCapacityModel, SectorCapacityModel, CategoryCapacityModel } from './capacity.model';
import { ChartTypeService } from '../common-file/charttype.service';

@Component({
  selector: 'app-capacity',
  templateUrl: './capacity.component.html'
})

export class CapacityComponent implements OnInit {
  constructor(updates: SwUpdate,private titleService: Title,private capacityService: CapacityService,private chartTypeService:ChartTypeService){
    updates.available.subscribe(event => {updates.activateUpdate().then(() => document.location.reload());}) 
  }

  allCapacity:AllCapacityModel;
  sectorCapacity:SectorCapacityModel;
  categoryCapacity:CategoryCapacityModel;
  
  ngOnInit() {
    this.titleService.setTitle('capacity');
    this.funAllCapacity();
  }

  clickOnTab(clcikType: string){
    if(clcikType=='allCapacity')
      this.funAllCapacity();
    if(clcikType=='sectorCapacity')
      this.funcSectorCapacity('0');
    if(clcikType=='categoryCapacity')
      this.funcCategoryCapacity('0');
  }


  funAllCapacity() {
    this.capacityService.getCapacityData().subscribe(data => {
      this.allCapacity = data;
      
      let dataSetDataArr=[
        +data.installed_capacity,
        +data.under_maintenance_capacity,
        +data.online_capacity
      ];
      this.chartTypeService.funcCreateChart('doughnut','allChartId',dataSetDataArr);
    }); 
  }

  funcSectorCapacity(sectorId: string) {
    this.capacityService.getSectorCapacityData(sectorId).subscribe(data => {
      this.sectorCapacity = data;

      let dataSetDataArr=[
        +data.installed_capacity,
        +data.under_maintenance_capacity,
        +data.online_capacity
      ];
      this.chartTypeService.funcCreateChart('doughnut','sectorChartId',dataSetDataArr);
    });
  }

  funcCategoryCapacity(categoryId: String){
    this.capacityService.getCategoryCapacityData(categoryId).subscribe(data => {
      this.categoryCapacity = data;

      let dataSetDataArr=[
        +data.installed_capacity,
        +data.under_maintenance_capacity,
        +data.online_capacity
      ];
      this.chartTypeService.funcCreateChart('doughnut','categoryChartId',dataSetDataArr);
    });
  }


  

}
