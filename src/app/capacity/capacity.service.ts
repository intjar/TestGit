import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { AllCapacityModel,SectorCapacityModel,CategoryCapacityModel } from './capacity.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CapacityService {
  constructor(private http:HttpClient) {}

  private baseURL = environment.basePortalURI; 
  private capacityUrl = this.baseURL+'/capacity';
  //private sectorCapacityUrl = this.baseURL+'/capacity';
  
  
  public getCapacityData() {
    console.log("inside capacity service getCapacityData");
    return this.http.get<AllCapacityModel>(this.capacityUrl);
  }

  getSectorCapacityData(sectorId:String) {
    console.log("inside capacity service getSectorCapacityData");
    let sectorCapacityUrl = this.capacityUrl+'?sectorId='+sectorId;
    return this.http.get<SectorCapacityModel>(sectorCapacityUrl);
  }

  getCategoryCapacityData(categoryId:String) {
    console.log("inside capacity service getCategoryCapacityData");
    let categoryCapacityUrl = this.capacityUrl+'?categoryId='+categoryId;
    return this.http.get<CategoryCapacityModel>(categoryCapacityUrl);
  }

}
