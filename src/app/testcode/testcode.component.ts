import { Component, OnInit, ElementRef  } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-testcode',
  templateUrl: './testcode.component.html'
})
export class TestcodeComponent implements OnInit {
  constructor(private elementRef: ElementRef) { }


  myChart:any;
  chartType:string='doughnut'; // bar, horizontalBar, pie, line, doughnut, radar, polarArea
  lavelsArr:Array<String>=['Boston', 'Worcester', 'Springfield', 'Lowell', 'Cambridge', 'New Bedford'];;
  dataSetLabel:string='Population';
  dataSetDataArr:Array<number>=[617594,181045,153060,106519,105162,95072];
  

  ngOnInit() {
    this.createChartJs(this.chartType,this.lavelsArr,this.dataSetLabel,this.dataSetDataArr);
  }

    //--------chartJs Method Start Here------------------------------------------------------------------------
    createChartJs(chartType:String,lavelsArr:Array<String>,dataSetLabel:String,dataSetDataArr:Array<number>){
      let htmlRef = this.elementRef.nativeElement.querySelector(`#chartId`);
          
      this.myChart = new Chart(htmlRef, {
        
        type:chartType,
        data:{
          labels:lavelsArr,
          datasets:[{
            label:dataSetLabel,
            data:dataSetDataArr,
            //backgroundColor:'green',
            backgroundColor:[
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
              'rgba(255, 99, 132, 0.6)'
            ],
            borderWidth:1,
            borderColor:'#777',
            hoverBorderWidth:3,
            hoverBorderColor:'#000'
          }]
        },
        options:{
          title:{
            display:true,
            text:'Largest Cities In Massachusetts',
            fontSize:25
          },
          legend:{
            display:true,
            position:'right',
            labels:{
              fontColor:'#000'
            }
          },
          layout:{
            padding:{
              left:50,
              right:0,
              bottom:0,
              top:0
            }
          },
          tooltips:{
            enabled:true
          }
        }
      });

    }
    //--------chartJs Method End Here------------------------------------------------------------------------
}
