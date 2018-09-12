import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { Title } from '@angular/platform-browser';

import { GenerationService } from './generation.service';
import { AllGenerationModel,SectorGenerationModel,CategoryGenerationModel } from './generation.model';
import { ChartTypeService } from '../common-file/charttype.service';

@Component({
  selector: 'app-generation',
  templateUrl: './generation.component.html'
})
export class GenerationComponent implements OnInit {

  constructor(updates: SwUpdate, private titleService: Title, private generationService: GenerationService, private chartTypeService:ChartTypeService) {
    updates.available.subscribe(event => {
    updates.activateUpdate().then(() => document.location.reload());
  }) }

  //public isOnline: boolean = navigator.onLine;

  ngOnInit() {
    this.titleService.setTitle('generation');
    this.funAllGeneration();
  }

 
  allGeneration: AllGenerationModel;
  sectorGeneration:SectorGenerationModel;
  categoryGeneration: CategoryGenerationModel


  clickOnTab(clcikType: string){
    if(clcikType=='allGeneration')
      this.funAllGeneration();
    if(clcikType=='sectorGeneration')
      this.funcSectorGeneration('0');
    if(clcikType=='categoryGeneration')
      this.funcCategoryGeneration('0');
  }

  funAllGeneration() {
      this.generationService.getGenerationData().subscribe(data => {
      this.allGeneration = data;
       
      let dataSetDataArr=[
        +data.programGeneration,
        +data.actualGeneration,
        +data.deviationGeneration
      ];
      this.chartTypeService.funcCreateChart('horizontalBar','allChartId',dataSetDataArr);
    })
  }

  funcSectorGeneration(sectorId: string) {
    this.generationService.getSectorGenerationData(sectorId).subscribe(data => {
      this.sectorGeneration = data;
      
      let dataSetDataArr=[
        +data.programGeneration,
        +data.actualGeneration,
        +data.deviationGeneration
      ];
      this.chartTypeService.funcCreateChart('horizontalBar','sectorChartId',dataSetDataArr);
    })
  }

  funcCategoryGeneration(categoryId: String){
    this.generationService.getCategoryGenerationData(categoryId).subscribe(data => {
      this.categoryGeneration = data;

      let dataSetDataArr=[
        +data.programGeneration,
        +data.actualGeneration,
        +data.deviationGeneration
      ];
      this.chartTypeService.funcCreateChart('horizontalBar','categoryChartId',dataSetDataArr);
    })
  }



}
