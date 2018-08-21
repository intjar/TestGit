!function(){
	var BarDonutMulti3D={};
	


	function drawBarShadow(svg)
	{
		// filters go in defs element
		var defs = svg.append("defs");
		var filter = defs.append("filter").attr("id", "drop-shadow").attr("height", "170%");
		filter.append("feGaussianBlur").attr("in", "SourceAlpha").attr("stdDeviation", 2).attr("result", "blur");
		filter.append("feOffset").attr("in", "blur").attr("dx", 1).attr("dy", 1).attr("result", "offsetBlur");
		var feMerge = filter.append("feMerge");
		feMerge.append("feMergeNode").attr("in", "offsetBlur");
		feMerge.append("feMergeNode").attr("in", "SourceGraphic");
	}


	BarDonutMulti3D.drawH=function( dataMap ){
       /*  http://bl.ocks.org/erikvullings/51cc5332439939f1f292
		var x0 = d3.scale.ordinal().rangeRoundBands([5, dataMap.get("width")], 0.2);//0.1--> width of one group bar chart

		var x1 = d3.scale.ordinal();
		var y = d3.scale.linear().range([dataMap.get("height"), 0]);
		

		var xAxis = d3.svg.axis().scale(x0).orient("bottom") ;
		var yAxis = d3.svg.axis().scale(y).orient("left").ticks(dataMap.get("ticks"))
					.tickFormat(function(d) { return d >= 1000 ? (d/1000) + "K" : d; })
					;


		var color = d3.scale.ordinal().range( dataMap.get("colors") );

		var svg = d3.select('#'+dataMap.get("ID") ).append("svg")
				    .attr("width", dataMap.get("width") + dataMap.get("margin").left + dataMap.get("margin").right)
				    .attr("height", dataMap.get("height") + dataMap.get("margin").top + dataMap.get("margin").bottom)
				    .append("g")
				    .attr("transform", "translate(" + dataMap.get("margin").left + "," + dataMap.get("margin").top + ")");


*/
	
		var data = {
				  labels: [
				    'resilience', 'maintainability', 'accessibility',
				    'uptime', 'functionality', 'impact'
				  ],
				  series: [
				    {
				      label: '2012',
				      values: [4, 8, 15, 16, 23, 42]
				    },
				    {
				      label: '2013',
				      values: [12, 43, 22, 11, 73, 25]
				    },
				    {
				      label: '2014',
				      values: [31, 28, 14, 8, 15, 21]
				    },]
				};

				var chartWidth       = 300,
				    barHeight        = 20,
				    groupHeight      = barHeight * data.series.length,
				    gapBetweenGroups = 10,
				    spaceForLabels   = 150,
				    spaceForLegend   = 150;

				// Zip the series data together (first values, second values, etc.)
				var zippedData = [];
				for (var i=0; i<data.labels.length; i++) {
				  for (var j=0; j<data.series.length; j++) {
				    zippedData.push(data.series[j].values[i]);
				  }
				}

				// Color scale
				var color = d3.scale.category20();
				var chartHeight = barHeight * zippedData.length + gapBetweenGroups * data.labels.length;

				var x = d3.scale.linear()
				    .domain([0, d3.max(zippedData)])
				    .range([0, chartWidth]);

				var y = d3.scale.linear()
				    .range([chartHeight + gapBetweenGroups, 0]);

				var yAxis = d3.svg.axis()
				    .scale(y)
				    .tickFormat('')
				    .tickSize(0)
				    .orient("left");

				// Specify the chart area and dimensions

				var chart = d3.select('#'+dataMap.get("ID") ).append("svg")
					  //  .attr("width", dataMap.get("width") + dataMap.get("margin").left + dataMap.get("margin").right)
					  //  .attr("height", dataMap.get("height") + dataMap.get("margin").top + dataMap.get("margin").bottom)
              
				//var chart = d3.select(".chart")
				    .attr("width", spaceForLabels + chartWidth + spaceForLegend)
				    .attr("height", chartHeight);

				// Create bars
				var bar = chart.selectAll("g")
				    .data(zippedData)
				    .enter().append("g")
				    .attr("transform", function(d, i) {
				      return "translate(" + spaceForLabels + "," + (i * barHeight + gapBetweenGroups * (0.5 + Math.floor(i/data.series.length))) + ")";
				    });

				// Create rectangles of the correct width
				bar.append("rect")
				    .attr("fill", function(d,i) { return color(i % data.series.length); })
				    .attr("class", "bar")
				    .attr("width", x)
				    .attr("height", barHeight - 1);

				// Add text label in bar
				bar.append("text")
				    .attr("x", function(d) { return x(d) - 3; })
				    .attr("y", barHeight / 2)
				    .attr("fill", "red")
				    .attr("dy", ".35em")
				    .text(function(d) { return d; });
				


				
		//drawBarShadow(slice);
  
/*
	    var tool = '';
		slice.selectAll("rect")
		      .data(function(d) { return d.values; })
		      .enter().append("rect")
		      .attr("width", x1.rangeBand()-1)
		      .attr("height", function(d) { return dataMap.get("height") - y(0); })
		      
		      .attr("x", function(d) { return x1(d.key); })
		      .attr("y", function(d) { return y(0); })
		      .style("filter", "url(#drop-shadow)")
		      .style("fill", function(d) { return color(d.key) })
		      
*/



		return dataMap;
	}
	
	BarDonutMulti3D.draw=function( dataMap ){

		var x0 = d3.scale.ordinal().rangeRoundBands([5, dataMap.get("width")], 0.2);//0.1--> width of one group bar chart

		var x1 = d3.scale.ordinal();
		var y = d3.scale.linear().range([dataMap.get("height"), 0]);
		

		var xAxis = d3.svg.axis().scale(x0).orient("bottom") ;
		var yAxis = d3.svg.axis().scale(y).orient("left").ticks(dataMap.get("ticks"))
					.tickFormat(function(d) { return d >= 1000 ? (d/1000) + "K" : d; })
					;


		var color = d3.scale.ordinal().range( dataMap.get("colors") );

		var svg = d3.select('#'+dataMap.get("ID") ).append("svg")
				    .attr("width", dataMap.get("width") + dataMap.get("margin").left + dataMap.get("margin").right)
				    .attr("height", dataMap.get("height") + dataMap.get("margin").top + dataMap.get("margin").bottom)
				    .append("g")
				    .attr("transform", "translate(" + dataMap.get("margin").left + "," + dataMap.get("margin").top + ")");



		var categoriesNames = dataMap.get("data").map(function(d) { return d.categorie; });     // Liberal Profession,Salaried Staff,Employee,Craftsman
		var rateNames       = dataMap.get("data")[0].values.map(function(d) { return d.key; }); // Not at all,Not very much,Medium,Very much,Tremendously
	
		x0.domain(categoriesNames); //alert(  "197->"+x0.rangeBand()  );
		x1.domain(rateNames).rangeRoundBands([0, x0.rangeBand()]);
	  
		var yScaleRange = d3.max(dataMap.get("data"), function(categorie) { return d3.max(categorie.values, function(d) { return d.value; }); })
		//alert( d3.max(dataMap.get("data"), function(categorie) { return d3.max(categorie.values, function(d) { return d.value; }); }) );
		y.domain([0, d3.max(dataMap.get("data"), function(categorie) { return d3.max(categorie.values, function(d) { return d.value; }); })]);

  
		var max_val = d3.max(dataMap.get("data"), function(categorie) { return d3.max(categorie.values, function(d) { return d.value; }); });
		
		svg.append("g")
		      .attr("class", "x axis")
		      .attr("transform", "translate(0," + (dataMap.get("height")+5) + ")")
		      .call(xAxis)
		      
		      //Rotate x-Axis Text
		      .selectAll("text")	
		      .style("text-anchor", "end")
		      .attr("dx", function(d) { if( dataMap.get("xText_Angle")==0 ) {return "2.6em";} else return "0.6em"; }   )
		      .attr("dy", "0.65em")
		      .attr("transform",    "rotate( "+dataMap.get("xText_Angle")+" )")
		      //.style("font-weight", "bold")
		      .style("font-size",   "12px")
		      .style("font-family", "sans-serif")
		      .style('fill',        "#234" ) 
		      ;


	  	
		svg.append("g")
			  .attr("class", "y axis")
		      .call(yAxis)
		      .style("font-size",   "10px")
		      .style("font-family", "sans-serif")
		      .style('fill',        "#234" ) 
      
      	      .append("text")
      	      .attr("transform", "rotate(-90)")
      	      .attr("dy", dataMap.get("yText_dx")+"em")
      	      .attr("dx", dataMap.get("yText_dy")+"em")
      	      .style('fill',   dataMap.get("yText_color") ) 
      	      .style("text-anchor", "end")
      	      .text(           dataMap.get("yText") )
      	      
      	      .style("font-size",   "10px")
      	      .style("font-family", "sans-serif")

      	      ;

	    //svg.select('.y').transition().duration(0).delay(10).style('opacity','1');
/*		svg.append("line")
			.attr("x1", 0)
			.attr("y1", dataMap.get("height")+1)
			.attr("x2", dataMap.get("width"))
			.attr("y2", dataMap.get("height")+1)
			.style('opacity',1)
			.attr("stroke-width", 1)
			.style("stroke", "black")
			;

*/





		var slice = svg.selectAll(".slice")
		      .data(dataMap.get("data"))
		      .enter().append("g")
		      .attr("class", "g")
		      .attr("transform",function(d) { return "translate(" + x0(d.categorie) + ",0)"; })
		      ;

		drawBarShadow(slice);
  

	    var tool = '';
		slice.selectAll("rect")
		      .data(function(d) { return d.values; })
		      .enter().append("rect")
		      .attr("width", x1.rangeBand()-1)
		      .attr("height", function(d) { return dataMap.get("height") - y(0); })
		      
		      .attr("x", function(d) { return x1(d.key); })
		      .attr("y", function(d) { return y(0); })
		      .style("filter", "url(#drop-shadow)")
		      .style("fill", function(d) { return color(d.key) })
		      


		      .on("mousemove", function(d){

	                	var toolTipX = (dataMap.get("toolTipX")==null || dataMap.get("toolTipX")=='undefined') ? 0 : dataMap.get("toolTipX")
	                	var toolTipY = (dataMap.get("toolTipY")==null || dataMap.get("toolTipY")=='undefined') ? 0 : dataMap.get("toolTipY")
	                		    		
	                	
	 		    	   	dataMap.get("toolTip").style("color", "#000")	//Text Color
			 		   	dataMap.get("toolTip").style("background", "#FFF")
			 		   	dataMap.get("toolTip").style("box-shadow", "-3px 3px 15px #000"  )
			 		          
			 		   	dataMap.get("toolTip").style("border-bottom", "1px solid"+color(d.key)  )
			 		   	dataMap.get("toolTip").style("border-top",    "1px solid"+color(d.key)  )
			 		   	dataMap.get("toolTip").style("border-left",   "1px solid"+color(d.key)  )
			 		   	dataMap.get("toolTip").style("border-right",  "1px solid"+color(d.key)  )
			 		   	
			 		    dataMap.get("toolTip").style("left", toolTipX + d3.event.pageX+10+"px");
	                	dataMap.get("toolTip").style("top",  toolTipY + d3.event.pageY-25+"px");

	                	dataMap.get("toolTip").style("display", "inline-block");
	                	dataMap.get("toolTip").style("z-index", "11111");
	                	 
	                	
	                	dataMap.get("toolTip").html(d.toolTip);
	                	
	                	d3.select(this).style("fill", d3.rgb(color(d.key)).darker(2));
	                })
	                .on("mouseout", function(d){
	                	dataMap.get("toolTip").style("display", "none");
	                	d3.select(this).style("fill", color(d.key));
	                })
	                
		
		/*
		      .on("mouseover", function(d) {
		          d3.select(this).style("fill", d3.rgb(color(d.key)).darker(2));
		      })
		      .on("mouseout", function(d) {
		          d3.select(this).style("fill", color(d.key));
		      })
		      */
		      ;

		slice.selectAll("rect")
		      .transition()
		      .delay(function (d) {return Math.random()*1000;})
		      .duration(1000)
		      //.attr("y", function(d) { return y(d.value); })
		      //.attr("height", function(d) { return dataMap.get("height") - y(d.value); })
		      .attr("y", function(d) 
		      { 
		    	   var d_value = Math.abs(d.value); // set +vt
		    	   d_value = (d_value<(max_val/40)) ? (max_val/40) : d_value;
		    	   return y(d_value); 
              })
	      	  .attr("height", function(d) 
	      	  {   
	      		  var d_value = Math.abs(d.value); // set +vt
	      		  d_value = (d_value<(max_val/40)) ? (max_val/40) : d_value;
	      		  return dataMap.get("height") - y(d_value);
			  })
		      ;
  

  
  /*******************Draw Text Lable on BarChart**********************/

		slice.selectAll(".text") 
	    		.data(function(d) { return d.values; })
	  			.enter()
	  			.append("text")
	  			.attr("id", function(d, i)  { return ("D3D"+dataMap.get("ID")+parseInt(i)).trim(); } )
			    .attr("x", function(d) { return x1(d.key); })
			    .attr("y", function(d) { return dataMap.get("height") - y(0); })
	
	      
				//.attr("dx", function(d){ return "-"+(dataMap.get("bar_text_dx_vl") - (((dataMap.get("height") - y(d.value))/yScaleRange)*dataMap.get("bar_text_dx_pr")))   + "em" ; } )
			    .attr("dx", function(d) { return "-"+(y(d.value)- dataMap.get("bar_text_dy_px")) +"px" ; } )
				.attr("dy", dataMap.get("bar_text_dx_px")+"px")
				.attr("text-anchor", "end") // yScaleRange
					    
	
				.text(function(d){ return (d.value); })
				    
				.style("font-size",   "12px")
				.style("font-family", "sans-serif")
				.style('fill',        "#234" ) 
				
				.attr("transform", function(d, i) {  //alert(  ((height - y(d.value))/yScaleRange)    ) ;
					  return "rotate(-90 " + x1(d.key) + ", 0)"
				})
	           ;
  
		  /*********************legend_data***************************/
		  dataMap.set("svg", 	svg);
		  legend.drawLegends( dataMap );

		
		  /*********************legend_data***************************/
	    
		  
		  dataMap.set("xAxis", 		xAxis);
		  dataMap.set("yAxis", 		yAxis);
		  
		  dataMap.set("x0", 		x0);
		  dataMap.set("x1", 		x1);
		  dataMap.set("y", 		    y);
		  dataMap.set("max_val",    max_val);
		  
		  dataMap.set("d3.color",   color);
		  dataMap.set("rateNames",  rateNames);
		  dataMap.set("categories", categoriesNames);
		  dataMap.set("yScaleRange",yScaleRange);
		  
		  

		    /*
		    dataMap.set("xScale", 		xScale);
		    dataMap.set("yScale", 		yScale);
		    dataMap.set("xAxis", 		xAxis);
		    dataMap.set("yAxis", 		yAxis);
		    dataMap.set("svg", 		svg);
		    dataMap.set("bar", 		bars);
		    dataMap.set("view_data", 	view_data);
		    */
		return dataMap;
	}
	
	BarDonutMulti3D.drawNext=function( dataMap ){
        /*
		var view_data = dataMap.get("view_data");
		var data 	  = dataMap.get("data"); 
		
		
		var xScale    = dataMap.get("xScale");
		var yScale    = dataMap.get("yScale");
	    */
		
		
		var svg       = dataMap.get("svg");
		var xAxis     = dataMap.get("xAxis");
		var yAxis     = dataMap.get("yAxis");
		
		var x0        = dataMap.get("x0");
		var x1        = dataMap.get("x1");
		var y         = dataMap.get("y");
		var color     = dataMap.get("d3.color");
		var max_val   = dataMap.get("max_val");
		
		
		var rateNames        = dataMap.get("rateNames");
		var categoriesNames  = dataMap.get("categories");
		var yScaleRange      = dataMap.get("yScaleRange");

		

		d3.select("#"+dataMap.get("ID")).selectAll("svg").remove();


		 svg = d3.select('#'+dataMap.get("ID"))
		        .append("svg")
		 		.attr("width", dataMap.get("width") + dataMap.get("margin").left + dataMap.get("margin").right)
			    .attr("height", dataMap.get("height") + dataMap.get("margin").top + dataMap.get("margin").bottom)
			    .append("g")
			    .attr("transform", "translate(" + dataMap.get("margin").left + "," + dataMap.get("margin").top + ")");


		 svg.append("g")
		      	.attr("class", "x axis")
		      	.attr("transform", "translate(0," + (dataMap.get("height")+5) + ")")
		      	.call(xAxis)
		 
		      	//Rotate x-Axis Text
		      	.selectAll("text")	
		      	.style("text-anchor", "end")
		      	.attr("dx", function(d) { if( dataMap.get("xText_Angle")==0 ) {return "2.6em";} else return "0.6em"; }   )
		      	.attr("dy", "0.65em")
		      	.attr("transform",    "rotate( "+dataMap.get("xText_Angle")+" )")
		      	//.style("font-weight", "bold")
		      	.style("font-size",   "12px")
		      	.style("font-family", "sans-serif")
		      	.style('fill',        "#234" ) 
		      ;

	
			
		 svg.append("g")
		      	.attr("class", "y axis")
		      	.call(yAxis)
		      	.style("font-size",   "10px")
		        .style("font-family", "sans-serif")
		        .style('fill',        "#234" ) 
		      
	    	    .append("text")
		        .attr("transform", "rotate(-90)")
		        .attr("dy", dataMap.get("yText_dx")+"em")
		        .attr("dx", dataMap.get("yText_dy")+"em")
		        .style('fill',        dataMap.get("yText_color") ) 
		        .style("text-anchor", "end")
				//.style("font-weight", "bold")
				.style("font-size",   "10px")
				.style("font-family", "sans-serif")
				
		        .text(  dataMap.get("yText")  )
		        ;
		  

		/*	
		 svg.append("line")
			  	.attr("x1", 0)
			  	.attr("y1", dataMap.get("height")+1)
			  	.attr("x2", dataMap.get("width"))
			  	.attr("y2", dataMap.get("height")+1)
			  	.style('opacity',1)
			  	.attr("stroke-width", 1)
			  	.style("stroke", "black")
			  	;
		  */
		  //svg.select('.x.axis').call(xAxis);
		  //svg.select(".y.axis").call(yAxis);


		  
		 var slice = svg.selectAll(".slice")
		      	.data(dataMap.get("data")) 
		      	.enter().append("g")
		      	.attr("class", "g")
		      	.attr("transform",function(d) { return "translate(" + x0(d.categorie) + ",0)"; });

		 drawBarShadow(slice);
		  
		 

		 slice.selectAll("rect")
		      .data(function(d) { return d.values; })
		      .enter()
		      .append("rect")
		      .attr("width", x1.rangeBand()-1)
		      .attr("height", function(d) { return dataMap.get("height") - y(0); })
		      
		      .attr("x", function(d) { return x1(d.key); })
		      .attr("y", function(d) { return y(0); })
		      .style("filter", "url(#drop-shadow)")
		      .style("fill", function(d) { return color(d.key) })

		      .on("mousemove", function(d){

	                	var toolTipX = (dataMap.get("toolTipX")==null || dataMap.get("toolTipX")=='undefined') ? 0 : dataMap.get("toolTipX")
	                	var toolTipY = (dataMap.get("toolTipY")==null || dataMap.get("toolTipY")=='undefined') ? 0 : dataMap.get("toolTipY")
	                		    		
	                	
	 		    	   	dataMap.get("toolTip").style("color", "#000")	//Text Color
			 		   	dataMap.get("toolTip").style("background", "#FFF")
			 		   	dataMap.get("toolTip").style("box-shadow", "-3px 3px 15px #000"  )
			 		          
			 		   	dataMap.get("toolTip").style("border-bottom", "1px solid"+d.color  )
			 		   	dataMap.get("toolTip").style("border-top",    "1px solid"+d.color  )
			 		   	dataMap.get("toolTip").style("border-left",   "1px solid"+d.color  )
			 		   	dataMap.get("toolTip").style("border-right",  "1px solid"+d.color  )
			 		   	
			 		    dataMap.get("toolTip").style("left", toolTipX + d3.event.pageX+10+"px");
	                	dataMap.get("toolTip").style("top",  toolTipY + d3.event.pageY-25+"px");

	                	dataMap.get("toolTip").style("display", "inline-block");
	                	dataMap.get("toolTip").style("z-index", "11111");
	                	 
	                	dataMap.get("toolTip").html(d.toolTip);
	                	d3.select(this).style("fill", d3.rgb(color(d.key)).darker(2));
	                })
	                .on("mouseout", function(d){
	                	dataMap.get("toolTip").style("display", "none");
	                	d3.select(this).style("fill", color(d.key));
	                })
		      /*
		      .on("mouseover", function(d) {
		          d3.select(this).style("fill", d3.rgb(color(d.key)).darker(2));
		      })
		      .on("mouseout", function(d) {
		          d3.select(this).style("fill", color(d.key));
		      })
		      */
		      ;


			slice.selectAll("rect")
		      .transition()
		      //.delay(function (d) {return Math.random()*500;})
		      .duration(500)
		      //.attr("y", function(d) { return y(d.value); })
		      //.attr("height", function(d) { return dataMap.get("height") - y(d.value); })
	                .attr("y", function(d) 
	                { 
	                	var d_value = Math.abs(d.value); // set +vt
			      		d_value = (d_value<(max_val/40)) ? (max_val/40) : d_value;
			      		
	                	return y(d_value); 
	                })
			      	.attr("height", function(d) 
			      	{   
			      		var d_value = Math.abs(d.value); // set +vt
			      		d_value = (d_value<(max_val/40)) ? (max_val/40) : d_value;
			      		return dataMap.get("height") - y(d_value);
			      	})
		      ;
			
		  /*
		 slice.selectAll("rect")
		 		.transition()
		 		.delay(function (d) {return Math.random()*200;})
		 		.duration(1000)
		 		.attr("y", function(d) { return y(d.value); })
		 		.attr("height", function(d) { return dataMap.get("height") - y(d.value); })
		 		;

		  */
		  
		 
		  /*******************Draw Text Lable on BarChart**********************/
		 slice.selectAll(".text") 
		 	.data(function(d) { return d.values; })
		 	.enter().append("text")
		 	.transition()
	      	.delay(10)
	       	.duration(700)
	       	//.attr("id", function(d, i)  { return ("D3D"+dataMap.get("ID")+parseInt(i)).trim(); } )
			.attr("x", function(d) { return x1(d.key); })
			.attr("y", function(d) { return dataMap.get("height") - y(0); })


		    //.attr("dx", function(d){ return "-"+(dataMap.get("bar_text_dx_vl") - (((dataMap.get("height") - y(d.value))/yScaleRange)*dataMap.get("bar_text_dx_pr")))   + "em" ; } )
			//.attr("dy", dataMap.get("bar_text_dy_vl")+"em")
			.attr("dx", function(d) { return "-"+(y(d.value)- dataMap.get("bar_text_dy_px")) +"px" ; } )
			.attr("dy", dataMap.get("bar_text_dx_px")+"px")
			.attr("text-anchor", "end") // yScaleRange
		    
		    
			.text(function(d){ return (d.value); })
	    
			.style("font-size",   "12px")
			.style("font-family", "sans-serif")
			.style('fill',        "#234" ) 
	
	         
			.attr("transform", function(d, i) {  //alert(  ((height - y(d.value))/yScaleRange)    ) ;
					return "rotate(-90 " + x1(d.key) + ", 0)"
			})
			;

		  /*******************************************************************/ 

		  
		/*********************legend_data***************************/
		dataMap.set("svg", 	svg);
		legend.drawLegends( dataMap );
		  

		  
		
	    
		return dataMap;
	}
	
	

	this.BarDonutMulti3D = BarDonutMulti3D;
}();



