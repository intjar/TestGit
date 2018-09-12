import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';

@Injectable({
  providedIn: 'root'
})

export class CommonChartService {

  constructor(private http: HttpClient) { }
  
  //--------chartJs Method Start Here------------------------------------------------------------------------
  getChartJs(chartId:any,chartHeaderText:String,chartType:String,lavelsArr:Array<String>,dataSetLabel:String,dataSetDataArr:Array<number>,dataSetBGColorArr:Array<String>,legendDisplay:boolean){
    //let myChart = new Chart(this.elementRef.nativeElement.querySelector(`#chartId`), {
    var ctx = document.getElementById(chartId);
      var myChart = new Chart(ctx, {

      type:chartType, // chartType String Type
      
      data:{
        labels:lavelsArr, // lavelsArr String Type
        datasets:[{
          label:dataSetLabel, // dataSetLabel String Type
          data:dataSetDataArr,  // dataSetDataArr array Type
          backgroundColor: dataSetBGColorArr, // dataSetBGColorArr array Type
          
          borderColor:'#777',
          borderWidth:1,
          
          hoverBorderColor:'#000',
          //hoverBackgroundColor:'red',
          hoverBorderWidth:3
          
        }]
      },
      
      options:{
        title:{
          display:true,
          text:chartHeaderText,
          fontSize:25,
          fontColor:'white'
        },

        legend:{
          display:legendDisplay, // chartType boolean Type
          position:'bottom',
          labels:{
            fontColor:'white'
          }
        },

        layout:{
          padding:{
            left:0,
            right:0,
            bottom:10,
            top:0
          }
        },

        tooltips:{
          enabled:true
        }

        // ,animation: {
        //   animateRotate: true,
        //   animateScale: false,
        //   rotation:-0.9 * Math.PI
        // },

        // ,rotation: -Math.PI,
        // cutoutPercentage: 60,
        // circumference: 2*Math.PI

      }

    });

    return myChart;
  }
  //--------chartJs Method End Here------------------------------------------------------------------------

}
