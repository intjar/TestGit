import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { throwError } from "rxjs";
import { catchError } from 'rxjs/operators';

import { AllGenerationModel,SectorGenerationModel,CategoryGenerationModel } from './generation.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class GenerationService {
  constructor(private http:HttpClient) {}

  private serviceUrl = environment.basePortalURI+'/getGeneration';

  public getGenerationData() {
    console.log("inside capacity service getSectorGenerationData");
    return this.http.get<AllGenerationModel>(this.serviceUrl);
  }

  getSectorGenerationData(sectorId:String) {
    console.log("inside service getSectorGenerationData");
    let sectorGenerationeUrl = this.serviceUrl+'?sectorId='+sectorId;
    return this.http.get<SectorGenerationModel>(sectorGenerationeUrl);
  }

  getCategoryGenerationData(categoryId:String) {
    console.log("inside service getCategoryGenerationData");
    let categoryGenerationeUrl = this.serviceUrl+'?categoryId='+categoryId;
    return this.http.get<CategoryGenerationModel>(categoryGenerationeUrl);
  }

}