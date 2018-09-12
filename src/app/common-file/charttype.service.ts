import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonChartService } from '../common-file/createchartjs.service';

@Injectable({
  providedIn: 'root'
})

export class ChartTypeService {

  constructor(private http: HttpClient, private commonChartService:CommonChartService) { }

  funcCreateChart(type:any,chartId:any,chartData:Array<number>){
    //-----------chart parameters required----------------------------------------
    //let myChart:any;
    let chartHeaderText:String='Capacity Data'
    let chartType:string=type; // bar, horizontalBar, pie, line, doughnut, radar, polarArea
    let lavelsArr:Array<String>=['Installed Capacity', 'Under maintenance', 'Online Capacity'];
    let dataSetLabel:string='Capacity Data';
    let dataSetDataArr:Array<number>=chartData;
    let dataSetBGColorArr:Array<String>=['#f75b57','#ffc65b','#c15afd'];
    let legendDisplay:boolean=false;
    //-----------chart parameters required----------------------------------------
    
     // dataSetDataArr=chartData;
       
       if(dataSetDataArr.length >0){
        this.commonChartService.getChartJs(chartId,chartHeaderText,chartType,lavelsArr,dataSetLabel,dataSetDataArr,dataSetBGColorArr,legendDisplay);
      }else{
        chartHeaderText='Capacity Data Not Found'
        lavelsArr=['No Data Found'];
        dataSetLabel='Capacity Data Not Found';
        dataSetDataArr=[.0001]
        dataSetBGColorArr=['red'];
        this.commonChartService.getChartJs(chartId,chartHeaderText,chartType,lavelsArr,dataSetLabel,dataSetDataArr,dataSetBGColorArr,legendDisplay);
      }

  }

}