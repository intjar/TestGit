!function(){
	var BarStack3D={};
	

	function drawBarShadow(svg)
	{
		// filters go in defs element
		var defs = svg.append("defs");
		var filter = defs.append("filter").attr("id", "drop-shadow").attr("height", "170%");
		filter.append("feGaussianBlur").attr("in", "SourceAlpha").attr("stdDeviation", 1).attr("result", "blur");
		filter.append("feOffset").attr("in", "blur").attr("dy", 1).attr("dy", 1).attr("result", "offsetBlur");
		filter.append("feOffset").attr("in", "blur").attr("dx", 1).attr("dx", 1).attr("result", "offsetBlur");
		var feMerge = filter.append("feMerge");
		feMerge.append("feMergeNode").attr("in", "offsetBlur");
		feMerge.append("feMergeNode").attr("in", "SourceGraphic");
	}

	BarStack3D.draw=function( dataMap ){
        
		var TTip   	= new Map();
		var TolTip 	= dataMap.get("TolTip");
		var data 	= dataMap.get("data");
		var toolTip = dataMap.get("toolTip");
		var margin 	= dataMap.get("margin");
		var width   = dataMap.get("width");
		var height  = dataMap.get("height");
		var colors  = dataMap.get("colors");

		var barGap = (dataMap.get("barGap")==null || dataMap.get("barGap")=='undefined') ? 0.23 : dataMap.get("barGap")


		// Setup svg using Bostock's margin convention
        //alert(  "#"+dataMap.get("ID")   );

		var svg = d3.select("#"+dataMap.get("ID")).append("svg")
		  .attr("width", width + margin.left + margin.right)
		  .attr("height", height + margin.top + margin.bottom)
		  .append("g")
		  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


		// get stack keys
		var keys = new Array();
		var i = 0, j = 0;;
		for (var k in data[0]) 
		{
            if(j>2) // 0t->index; 1->key; 2->Name; and values->(2,3,4...n)
            {
				keys[i++] = k;
            }
            j++
		}


		// Transpose the data into layers
		var dataset = d3.layout.stack()(keys.map(function(values, i) 
	    {   
			return data.map(function(d, j) 
			{   
				//alert(i+"<>"+j+"<<<>>>"+d.index+"<<<>>>"+d[values]+"<<<>>>"+values);
				var v_TolTip = '', v_Colors = "00F";
				if(!(TolTip==null || TolTip=='undefined' ) )
				{  
					if( TolTip.length>i ) v_TolTip = TolTip[i];
				}
				if(!(colors==null || colors=='undefined' ) )
				{  
					if( colors.length>i ) v_Colors = colors[i];
				}
				//return {x: d.index, y: + d[values], keys :values };
				return {x: d.index, y: + d[values], column_name :values,  TolTip :v_TolTip, color_code : v_Colors };
			});
		}));



		// Set x, y and colors
		var x = d3.scale.ordinal()
		  .domain(dataset[0].map(function(d) { return d.x; }))
		  .rangeRoundBands([1, width-10], barGap);

		var y = d3.scale.linear()
		  .domain([0, d3.max(dataset, function(d) {  return d3.max(d, function(d) { return d.y0 + d.y; });  })])
		  .range([height, 0]);

		


		// Define and draw axes
		var yAxis = d3.svg.axis()
		  .scale(y)
		  .orient("left")
		  .ticks(5)
		  .tickSize(-width, 0, 0)
		  .tickFormat(function(d) { return d >= 1000 ? (d/1000) + "K" : d; })
		  ;

		var xAxis = d3.svg.axis()
		  .scale(x)
		  .orient("bottom")
		  //.tickFormat(d3.time.format("%Y")+'xxxx')
		  .tickFormat(function(d) { return data[d-1].key; });
		  ; // replace index to character (with name)

		svg.append("g")
		  .attr("class", "y axis")
		  .call(yAxis)
		  
	        //.style("font-weight", "bold")
			.style("font-size",   "10px")
			.style("font-family", "sans-serif")
			.style('fill',        "#234" ) 
			
	        .append("text")
	        .attr("transform", "rotate(-90)")
	        .attr("dy",      dataMap.get("yText_dy")+"em")
	        .attr("dx",      dataMap.get("yText_dx")+"em")
	        .style('fill',   dataMap.get("yText_color") ) 
	        .style("text-anchor", "end")
	        .text(           dataMap.get("yText") )
	        
	        //.style("font-weight", "bold")
			.style("font-size",   "12px")
			.style("font-family", "sans-serif")
			
		  ;

		svg.append("g")
		  .attr("class", "x axis")
		  .attr("transform", "translate(0," + height + ")")
		  .call(xAxis)
		  
		    //Rotate x-Axis Text
			.selectAll("text")	
			.style("text-anchor", "end")
			//.attr("dx", function(d) { if( dataMap.get("xText_Angle")==0 ) {return "2.6em";} else return "0.6em"; }   )
			//.attr("dy", "0.65em")
			.attr("transform",    "rotate( "+dataMap.get("xText_Angle")+" )")
			.style("font-weight", dataMap.get("xText_font-weight") )// no need to validate
			.style("font-size",   "12px")
			.style("font-family", "sans-serif")
			.style('fill',        "#234" ) 
			
		  ;


		// Create groups for each series, rects for each segment 
		var groups = svg.selectAll("g.cost")
		  .data(dataset)
		  .enter().append("g")
		  .attr("class", "cost")
		  .style("fill", function(d, i) { return colors[i]; });

		drawBarShadow(svg);

		var rect = groups.selectAll("rect")
		  .data(function(d) { return d; })
		  .enter()
		  .append("rect")
		  .attr("x", function(d) { return x(d.x); })
		  .attr("y", function(d) { return y(d.y0 + d.y); })
		  .attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); })
		  .attr("width", x.rangeBand())
		  
		  .style("filter", "url(#drop-shadow)")
		  
		.on("mouseout", function(d){
			                	toolTip.style("display", "none");

			                })
		  .on("mousemove", function(d) 
		  {
		  
		  	                	var toolTipX = 10;//(dataMap.get("toolTipX")==null || dataMap.get("toolTipX")=='undefined') ? 0 : dataMap.get("toolTipX")
			                	var toolTipY = 10;//(dataMap.get("toolTipY")==null || dataMap.get("toolTipY")=='undefined') ? 0 : dataMap.get("toolTipY")
			                		    		
			                	
			 		    	   	toolTip.style("color", "#000")	//Text Color
					 		   	toolTip.style("background", "#FFF")
					 		   	toolTip.style("box-shadow", "-3px 3px 15px #000"  )
					 		          
					 		   	toolTip.style("border-bottom", "1px solid " + d.color_code  )
					 		   	toolTip.style("border-top",    "1px solid " + d.color_code  )
					 		   	toolTip.style("border-left",   "1px solid " + d.color_code  )
					 		   	toolTip.style("border-right",  "1px solid " + d.color_code  )
					 		   	
					 		    toolTip.style("left", toolTipX + d3.event.pageX+10+"px");
			                	toolTip.style("top",  toolTipY + d3.event.pageY-25+"px");

			                	toolTip.style("display", "inline-block");
			                	toolTip.style("z-index", "11111");
			                	 
			                	//toolTip.html( " : "+d.y ); 
			                	//toolTip.html( d.column_name +" <<>> "+d.TolTip +" <<>> "+d.y );
			                	toolTip.html( d.TolTip +" : "+d.y );
			                	
			                	//d3.select(this).style("fill", d3.rgb(12,23,45).darker(2));
			                	
			      /*          	
		    var xPosition = d3.mouse(this)[0] - 15;
		    var yPosition = d3.mouse(this)[1] - 25;
		    tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
		    tooltip.select("text").text(d.y);
		    */
		  });


		// Draw legend
		/*
		var legend = svg.selectAll(".legend")
		  .data(colors)
		  .enter().append("g")
		  .attr("class", "legend")
		  .attr("transform", function(d, i) { return "translate(30," + i * 19 + ")"; });
		 
		legend.append("rect")
		  .attr("x", width - 18)
		  .attr("width", 18)
		  .attr("height", 18)
		  .style("fill", function(d, i) {return colors.slice().reverse()[i];});
		 
		legend.append("text")
		  .attr("x", width + 5)
		  .attr("y", 9)
		  .attr("dy", ".35em")
		  .style("text-anchor", "start")
		  .text(function(d, i) { 
		    switch (i) {
		      case 0: return "Anjou v4";
		      case 1: return "Naval v3";
		      case 2: return "v2 apples";
		      case 3: return "Red Delicious apples";
		    }
		  });

		*/
		// Prep the tooltip bits, initial display is hidden
		/*
		var tooltip = svg.append("g")
		  .attr("class", "tooltip")
		  .style("display", "none");
		    
		tooltip.append("rect")
		  .attr("width", 30)
		  .attr("height", 20)
		  .attr("fill", "white")
		  .style("opacity", 0.5);

		tooltip.append("text")
		  .attr("x", 15)
		  .attr("dy", "1.2em")
		  .style("text-anchor", "middle")
		  .attr("font-size", "12px")
		  .attr("font-weight", "bold");
		*/
		
		
	    /*
		//dataMap = getBarChartData(dataMap);
		dataMap = BarStack3D.getBarChartData( dataMap );
		
		var view_data = dataMap.get("view_data");
		

		// set the ranges
	    var xScale = d3.scale.ordinal().rangeRoundBands([0, dataMap.get("width")], .3); // shift left-rigth bar-chart [0 TO 1]
	    var yScale = d3.scale.linear().range([dataMap.get("height"), 0]);

	    // define the axis
	    var xAxis = d3.svg.axis().scale(xScale).orient("bottom");
	    var yAxis = d3.svg.axis().scale(yScale).orient("left")
                    .ticks(dataMap.get("ticks"))
	            //.tickFormat(function(d) { alert(d);return d; })
	            .tickFormat(function(d) { return d >= 1000 ? (d/1000) + "K" : d; })
	        ;


	    var line_end_pos = dataMap.get("height") - dataMap.get("margin").top;
	        line_end_pos = dataMap.get("height");
	    // add the SVG element 
	    var svg = d3.select('#'+dataMap.get("ID")).append("svg")
		    .attr("width",  dataMap.get("width")  + dataMap.get("margin").left + dataMap.get("margin").right)
		    .attr("height", dataMap.get("height") + dataMap.get("margin").top  + dataMap.get("margin").bottom)
		    .append("g")
		    .attr("transform", "translate(" + dataMap.get("margin").left + "," + dataMap.get("margin").top + ")")
		    
	    ;
	    
		xScale.domain(view_data.map(function(d) { return d.letter; }));
		
		var max = d3.max(view_data, function(d) { return d.value; });

		yScale.domain([0, max]);
		var max_val = max;
        

		//alert(min +"<>>"+ max);
	    //alert(    d3.min(view_data, function(d) { return d.value>0 ? 0 : d.value ; })   );

		// add axis
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
			.style("font-weight", dataMap.get("xText_font-weight") )// no need to validate
			.style("font-size",   "12px")
			.style("font-family", "sans-serif")
			.style('fill',        "#234" ) 

			;
	    
	    
	  	svg.append("g")
	        .attr("class", "y axis")
	        .call(yAxis)
	        //.style("font-weight", "bold")
			.style("font-size",   "10px")
			.style("font-family", "sans-serif")
			.style('fill',        "#234" ) 
			
	        .append("text")
	        .attr("transform", "rotate(-90)")
	        .attr("dy",      dataMap.get("yText_dy")+"em")
	        .attr("dx",      dataMap.get("yText_dx")+"em")
	        .style('fill',   dataMap.get("yText_color") ) 
	        .style("text-anchor", "end")
	        .text(           dataMap.get("yText") )
	        
	        //.style("font-weight", "bold")
			.style("font-size",   "10px")
			.style("font-family", "sans-serif")
			
	        ;
	  	

		drawBarShadow(svg);
		
	  	// Add bar chart
	  	svg.selectAll("bar")
	      			.data(view_data)
	    			.enter().append("rect")
			      	.attr("class", "bar")
			      	.attr("x", function(d) { return xScale(d.letter); })
			      	

	                .attr("y", function(d) 
	                { 
	                	var d_value = Math.abs(d.value); // set +vt
			      		d_value = (d_value<(max_val/20)) ? (max_val/20) : d_value;
	                	return yScale(d_value); 
	                })
			      	.attr("height", function(d) 
			      	{   
			      		var d_value = Math.abs(d.value); // set +vt
			      		d_value = (d_value<(max_val/20)) ? (max_val/20) : d_value;
			      		return dataMap.get("height") - yScale(d_value);
			      	})

			      	
	                .attr("width", xScale.rangeBand())// put gap between two bar rectangle range ==>>>xScale.rangeBand()<<<==
	                
	                .style("fill", function(d) { return d.color; } )
	                .style("filter", "url(#drop-shadow)")
	                
	                
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
	                	 
	                	
	                	dataMap.get("toolTip").html(("<B>"+d.letter)+"</B><br>"+(d.value)+" "+ dataMap.get("unit"));
	                	
	                	d3.select(this).style("fill", d3.rgb(d.color).darker(2));
	                	
	                })
	                .on("mouseout", function(d){
	                	dataMap.get("toolTip").style("display", "none");
	                	d3.select(this).style("fill", d.color );
	                })
	                ;

  */
	    /*******************Draw Text Lable on BarChart**********************/
/*

	  	var recText_VH = (dataMap.get("recText_VH")==null || dataMap.get("recText_VH")=='undefined') ? 'V' : dataMap.get("recText_VH");
	  	var recText_dx = (dataMap.get("recText_dx")==null || dataMap.get("recText_dx")=='undefined') ? 0   : dataMap.get("recText_dx");
	  	var recText_dy = (dataMap.get("recText_dy")==null || dataMap.get("recText_dy")=='undefined') ? 0   : dataMap.get("recText_dy");
	    
	    if( recText_VH=='H')
	    {
	    	svg.selectAll(".text") 
					.data(view_data)
					.enter().append("text")
					.attr("id", function(d, i)  { return ("D3D"+dataMap.get("ID")+parseInt(i)).trim(); } )
			      	.attr("x",  function(d)  {    return xScale(d.letter); })
	                .attr("y", function(d) 
	                { 
	                	var d_value = Math.abs(d.value); // set +vt
			      		d_value = (d_value<(max_val/20)) ? (max_val/20) : d_value;
			      		d_value = yScale(d_value);
	                	return (dataMap.get("height")+d_value)/2; 
	                })
				    .attr("text-anchor", "start")
				    .text(function(d){ return (d.value); })
				    
				    .style("font-size",   "12px")
				    .style("font-family", "sans-serif")
				    .style('fill',        "#234" ) 
					;
	    }
	    else
	    {
		  	svg.selectAll(".text") 
					.data(view_data)
					.enter().append("text")
					.attr("id", function(d, i)  { return ("D3D"+dataMap.get("ID")+parseInt(i)).trim(); } )
			      	.attr("x",  function(d)     { return xScale(d.letter); })
				    .attr("y",  function(d)     { return yScale(d.value); })

				    .attr("dx", function(d)  
				    {   
				    	var textPos = 0;
				    	if( (yScale(d.value) - (line_end_pos/2))>0 ) 
				    	{
				    		var split = line_end_pos/8;
				    		textPos = ((yScale(d.value) - (line_end_pos/2)))/split;
				    		return textPos+"em";
				    	}
				    	else return "0em";    
				    
				    } )
				    .attr("dy", (xScale.rangeBand()/20)+"em")
				    
				    .attr("text-anchor", "end")
				    .text(function(d){ return (d.value); })
				    
				    .style("font-size",   "12px")
				    .style("font-family", "sans-serif")
				    .style('fill',        "#234" ) 
			
				    //.attr("transform", "rotate(-10)" )
					.attr("transform", function(d, i) { //alert( line_end_pos +">>"+dataMap.get("height") +">>"+d.letter +" -->>>> "+  (yScale(d.value) - d.letter.length)  );
						//return "rotate(-90 " + xScale(d.letter) + "," + (yScale(d.value) - Math.min(2 * d.letter.length, (2 * d.letter.length - 8) / this.getComputedTextLength() * 12)) + ")"
					    return "rotate(-90 " + xScale(d.letter) + "," + (yScale(d.value)  ) + ")"
					})
			;
	    }
*/

	  	
	  	            /**************SET TITLE************************************************************/
				  	/*if( !( dataMap.get("title_text")=='undefined' || dataMap.get("title_text")==null ) )
				  	{
					  	for(var i=0; i<dataMap.get("title_text").length; i++)
					  	{
						  	svg
					        .append("text")
					        .attr("transform", "rotate(0)")
					        .attr("x",  dataMap.get("title_x"))
				            .attr("y",  dataMap.get("height") + dataMap.get("title_y") + (i*15))
					        
					        .text(           dataMap.get("title_text")[i] )
					        
					        .style('fill',   dataMap.get("yText_color") ) 
					        .style("font-weight", "bold")
							.style("font-size",   "12px")
							.style("font-family", "Trebuchet MS, Verdana, sans-serif")
					        ;
					  	}
				  	}/*
				  	/**************SET TITLE************************************************************/


					  /*********************legend_data***************************/
				  	  /*var isLegend = (dataMap.get("legend")==null || dataMap.get("legend")=='undefined') ? false : dataMap.get("legend")
				  	  if(isLegend){		  
					  dataMap.set("svg", 	svg);
					  legend.drawLegends( dataMap );
				  	  }*/
					  /*********************legend_data***************************/

	    dataMap.set("svg", 	svg);

		return dataMap;
	}

	
	this.BarStack3D = BarStack3D;
}();


function redraw() {
	  console.log("here", d3.event.translate, d3.event.scale);
	  vis.attr("transform",
	      "translate(" + d3.event.translate + ")"
	      + " scale(" + d3.event.scale + ")");
	}
