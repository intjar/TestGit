import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AllCapacityModel, SectorCapacityModel, CategoryCapacityModel } from './capacity.model';

@Injectable({
  providedIn: 'root'
})

export class CapacityService {

  constructor(private http: HttpClient) { }
  private capacityUrl = environment.basePortalURI+'/getCapacity';


  public getCapacityData() {
    console.log("inside capacity service getCapacityData");
    return this.http.get<AllCapacityModel>(this.capacityUrl);
  }

  public getSectorCapacityData(sectorId:String) {
    console.log("inside capacity service getSectorCapacityData");
    let sectorCapacityUrl = this.capacityUrl+'?sectorId='+sectorId;
    return this.http.get<SectorCapacityModel>(sectorCapacityUrl);
  }

  public getCategoryCapacityData(categoryId:String) {
    console.log("inside capacity service getCategoryCapacityData");
    let categoryCapacityUrl = this.capacityUrl+'?categoryId='+categoryId;
    return this.http.get<CategoryCapacityModel>(categoryCapacityUrl)
  }

}
