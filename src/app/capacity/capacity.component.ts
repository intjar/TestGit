import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Data, Router, NavigationExtras } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';

import { CapacityService } from './capacity.service';
import { AllCapacityModel, SectorCapacityModel,CategoryCapacityModel } from './capacity.model';



//import * as d3 from '../../assets/chart3d/js/d3.v3.min.js';
//import * as modelM from '../../assets/chart3d/js/dount3d.js';

@Component({
  selector: 'app-capacity',
  templateUrl: './capacity.component.html',
})
export class CapacityComponent implements OnInit {
  constructor(updates: SwUpdate, private router: Router, private capacityService: CapacityService) {
    updates.available.subscribe(event => {
      updates.activateUpdate().then(() => document.location.reload());
    })
  }

  title : 'capacity';
  allCapacity: AllCapacityModel;
  sectorCapacity: SectorCapacityModel;
  categoryCapacity: CategoryCapacityModel
  isVisible: boolean;

 

  ngOnInit() {
    this.funAllCapacity();
    //this.drawChart();
  }

  funAllCapacity() {
    this.capacityService.getCapacityData().subscribe(data => {
      localStorage.setItem('installedCapacity', JSON.stringify(data));
      this.allCapacity = data;

      //alert("installed_capacity=="+this.allCapacity.installed_capacity)
    })
  }

  funcSectorCapacity(sectorId: string) {
    this.capacityService.getSectorCapacityData(sectorId).subscribe(data => {
      localStorage.setItem('sectorCapacity'+sectorId, JSON.stringify(data));
      this.sectorCapacity = data;
        //alert("installed_capacity=="+this.sectorCapacity.installed_capacity)
    })
  }

  funcCategoryCapacity(categoryId: String){
    this.capacityService.getCategoryCapacityData(categoryId).subscribe(data => {
      localStorage.setItem('categoryCapacity'+categoryId, JSON.stringify(data));
      this.categoryCapacity = data;
        //alert("installed_capacity=="+this.categoryCapacity.installed_capacity)
    })
  }


  //  var key_val_chart = [
  //         {letter:"Thermal",  		value:34},
  //         {letter:"Hydro" ,       value:64},
  //         {letter:"Nuclear",  		value:24	},
  //         {letter:"Bio Power",    value:70},
  //         {letter:"Solar Power",  value:50}
  //     ];
      
     // builedChart_13(key_val_chart);
      //builedChart_13_pop(key_val_chart);
     
     
     
     
     
      // drawChart(){
      //   var key_val_chart = [
      //     {letter:"Thermal",  		value:34},
      //     {letter:"Hydro" ,       value:64},
      //     {letter:"Nuclear",  		value:24	},
      //     {letter:"Bio Power",    value:70},
      //     {letter:"Solar Power",  value:50}
      //     ];
        
        
          

      //     var mapContainer 	= new Map();
      //     var toolTip = d3.select("body").append("div").attr("class", "toolTipD3");
      //     mapContainer.set("toolTip",toolTip);
      //     mapContainer.set("lblText", true);
      //     mapContainer.set("lblText_percent", true);
      //     mapContainer.set("text_box", 7); // maximum each side text box
      //     mapContainer.set("box_dist", 60);
      //     mapContainer.set("box_tot_dis", 330); // distance of y axis
          
      //     mapContainer.set("legend",       true); // by-default TRUE
      //     mapContainer.set("legendX",     -100);
      //     mapContainer.set("legendY",      20);
      //     mapContainer.set("legendV",      false);
      //     mapContainer.set("legendL",      3)
      //     mapContainer.set("legendBoxWidth", 200);
      //       //if(builedChart_13_timer!=null)clearTimeout( builedChart_13_timer );
      //     d3.select("#L_Chart_3_pop").selectAll("svg").remove();
            
      //     var pieDataEmpty=[], pieData=[];
          
          
      //     var colors = ['#515664', '#058dc7', '#ff0000', '#6cad5a', '#88f268', '#50B432', '#188e0e', '#05Adc7'  ];
        
        
      //     for(var i=0; i<key_val_chart.length; i++ )
      //     {
      //     pieData[i]  = {
      //     label	    : key_val_chart[i].letter, 
      //     value	    : key_val_chart[i].value, 
      //     color       : colors[i],
      //     key_text    : key_val_chart[i].letter,
      //     unit        : "MW",
      //     legend_text : key_val_chart[i].letter + " " + key_val_chart[i].value + " MW",
      //     lable_text  : key_val_chart[i].letter + " (" + key_val_chart[i].value + ") MW"
      //     };
      //     } 
          

        
      //     var svg_pie_ch3 = d3.select("#ChartID").append("svg").attr("width", 800).attr("height",310);
          
      //     svg_pie_ch3.append("g").attr("id","ChartID_pop");
      //     alert("svg_pie_ch3="+svg_pie_ch3);

      //     //dount3d.myfunction( );
      //     //alert(dount3d);
      //     //dount3d.draw=function(id, data,    x /*center x*/, y/*center y*/,  rx/*radius x*/, ry/*radius y*/, h/*height*/, ir/*inner radius*/){   
      //     //alert("dount3d.Myfunction="+dount3d.Myfunction() );

      //     alert(mapContainer)
      //     modelM.dount3d.draw("ChartID_pop", pieData, (300+70),       100,            140,            70,             20,          0.0, mapContainer);
      //     alert("pieData="+pieData)
        
          
      //     function randomData()
      //     {
      //       return pieData.map(function(d)
      //       {
      //         return {label:d.label, value: d.value, color:d.color, key_text: d.key_text };
      //       });
      //     }
 
      //   }




}
