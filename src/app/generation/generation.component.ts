import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute, Params, Data, Router, NavigationExtras } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';

import { GenerationService } from './generation.service';
import { AllGenerationModel,SectorGenerationModel,CategoryGenerationModel } from './generation.model';

import * as model from '../../assets/chart3d/js/testjs';

@Component({
  selector: 'app-generation',
  templateUrl: './generation.component.html',
})


export class GenerationComponent implements OnInit {
  constructor(updates: SwUpdate, private router: Router, private generationService: GenerationService) {
    updates.available.subscribe(event => {
      updates.activateUpdate().then(() => document.location.reload());
    })
  }
  
  title : 'generation';
  allGeneration: AllGenerationModel;
  sectorGeneration:SectorGenerationModel;
  categoryGeneration: CategoryGenerationModel
  ngOnInit() {
    this.funAllGeneration();
    
    //model.testjsfunction();
    //model.donut3d.draw('Test.........');
  }

  
  funAllGeneration() {
    this.generationService.getGenerationData().subscribe(data => {
      localStorage.setItem('installedGeneration', JSON.stringify(data));
      this.allGeneration = data;

      //alert("installed_capacity=="+this.allCapacity.installed_capacity)
    })
  }



  funcSectorGeneration(sectorId: string) {
    this.generationService.getSectorGenerationData(sectorId).subscribe(data => {
      localStorage.setItem('sectorGeneration', JSON.stringify(data));
      this.sectorGeneration = data;
      //alert(this.sectorGeneration.actualGeneration)
    })
  }

  funcCategoryGeneration(categoryId: String){
    this.generationService.getCategoryGenerationData(categoryId).subscribe(data => {
      localStorage.setItem('categoryGeneration'+categoryId, JSON.stringify(data));
      this.categoryGeneration = data;
        //alert("installed_capacity=="+this.categoryCapacity.installed_capacity)
    })
  }

  

}
