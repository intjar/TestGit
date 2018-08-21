!function(){
	var BarDonut3D={};
	


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

	BarDonut3D.getBarChartData=function( chartMap )
	{
		var data 		= chartMap.get("data");
		var view_data 	= chartMap.get("view_data");
		var view_size 	= chartMap.get("view_size");
		var view_start 	= chartMap.get("view_start");
		var changeType 	= chartMap.get("changeType");
		var colors 	    = chartMap.get("colors");


	    var index 		= 0;
	    var index_color = 0;
		var counter 	= 0;
		var temp_val 	= [];
		
		if( data!=null &&  data != 'undefined' && view_size>data.length )
		{
			view_size 	= data.length;
		}
		
		
		if(view_data==null || view_data == 'undefined' || view_data.length<1)
		{
			index = view_start;
		}
		else
		{
			index = view_start;
		}
		
		if( changeType!=null &&  changeType != 'undefined' && changeType==0 )
		{
			index 	= 0;
		}
		
		index_color = index;
		for(var i=0; i<view_size; i++ )
		{
			color_code = "#FF3";
			if(colors!=null &&  colors != 'undefined' && index_color>=colors.length) index_color =0;
			if(colors!=null &&  colors != 'undefined' && colors.length>index_color) color_code = colors[index_color];
			
			
			if(index>=data.length) index =0;

			temp_val[i]  = {
								letter		: data[index].letter, 
								value		: data[index].value,
								color       : color_code
							};
			
			
			index 		= index + 1;
			index_color = index_color + 1;
		} 
		
		
		view_start = view_start + 1;
		if( data!=null &&  data != 'undefined' && view_start>=data.length )
		{
			view_start = 0;
		}
		
		
		chartMap.set("view_size",  view_size);
		chartMap.set("view_start", view_start);
		chartMap.set("view_data",  temp_val);
		
		
		
		return chartMap;
	}
	
	

	
	
	BarDonut3D.draw=function( dataMap ){

	    
		//dataMap = getBarChartData(dataMap);
		dataMap = BarDonut3D.getBarChartData( dataMap );
		
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
		/****
		var min = d3.min(view_data, function(d) { return d.value>0 ? 0 : d.value ; })
		min = (min<0 && max/10>(-min) ) ? -max/10 : min;
		yScale.domain([min, max]);
		*/ 
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
			      	

	                /**.attr("y", function(d) { return yScale(d.value); })*/
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
			      	/**.attr("height", function(d) { return dataMap.get("height") - yScale(d.value); })*/
			      	
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

  
	    /*******************Draw Text Lable on BarChart**********************/
/*
	  	svg.selectAll(".text") 
	      			.data(view_data)
	    			.enter().append("text")
	    			.attr("id", function(d, i)  { return ("D3D"+dataMap.get("ID")+parseInt(i)).trim(); } )
			      	.attr("x",  function(d)  { return xScale(d.letter); })
				    .attr("y",  function(d)  { return yScale(d.value); })
				    //.attr("dx", -5)
				    //.attr("dy", ".36em")
				    .attr("text-anchor", "end")
				    .text(function(d){ return (d.value); })
				    
				    .style("font-size",   "12px")
				    .style("font-family", "sans-serif")
				    .style('fill',        "#234" ) 

					.attr("transform", function(d, i) {
					  return "rotate(-90 " + xScale(d.letter) + "," + (yScale(d.value) - d.letter.length) + ")"
					})
					;
			
*/
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
/*
	                .attr("y", function(d) 
	                { 
	                	var d_value = Math.abs(d.value); // set +vt
			      		//d_value = (d_value<(max_val/20)) ? (max_val/20) : d_value;
			      		//d_value = yScale(d_value);
	                	return yScale(d_value); 
	                })
	                */
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


	  	
	  	            /**************SET TITLE************************************************************/
				  	if( !( dataMap.get("title_text")=='undefined' || dataMap.get("title_text")==null ) )
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
				  	}
				  	/**************SET TITLE************************************************************/

	  	/*
		    svg
		    	.on("mousemove", function(d){
		    		

		 		   
		    	dataMap.get("toolTip").style("left", d3.event.pageX+10+"px");
		    	dataMap.get("toolTip").style("top", d3.event.pageY-25+"px");
		    	dataMap.get("toolTip").style("display", "inline-block");
		    	dataMap.get("toolTip").html((d.letter)+"<br>"+(d.value)+"%");
		    	//dataMap.get("toolTip").html("Error");
		    });
		    
		    svg
			  	.on("mouseout", function(d){
			    dataMap.get("toolTip").style("display", "none");
			});
	  	 */

					  /*********************legend_data***************************/
				  	  var isLegend = (dataMap.get("legend")==null || dataMap.get("legend")=='undefined') ? false : dataMap.get("legend")
				  	  if(isLegend){		  
					  dataMap.set("svg", 	svg);
					  legend.drawLegends( dataMap );
				  	  }
					  /*********************legend_data***************************/
					  
					  
	    
	    dataMap.set("xScale", 		xScale);
	    dataMap.set("yScale", 		yScale);
	    dataMap.set("xAxis", 		xAxis);
	    dataMap.set("yAxis", 		yAxis);
	    dataMap.set("svg", 		svg);
	    dataMap.set("view_data", 	view_data);
	    
	    
	    
		return dataMap;
	}
	
	BarDonut3D.removeBarText=function( dataMap ){

		var view_data = dataMap.get("view_data");
		var svg       = dataMap.get("svg");
		var chid      = dataMap.get("ID");
		
	    for(var i=0; i<100; i++ )
		{   
	    	try
	    	{   
	    		svg.selectAll(("#D3D"+chid+i).trim()).remove();	
	    	}catch(evt){}
		}

	    /*
	    svg.selectAll("text").forEach(function (d, i) {
	    	
		    d.forEach(function (d, i) {
		    	
		    	if( d.id.startsWith(("D3D"+chid).trim())  )
		    	{
		    		//alert(i+"--++--"+d.id+"--++--"+d.id+"--++--"+d.innerHTML+"--++--"+d.dy+"--++--"+d.dx+"--++--"+d.y+"--++--"+d.x);
		    		d.innerHTML = "";
		    		d.remove;
		    	}
		    });
	    });
		*/
		/*
	    var elms = document.getElementsByTagName('*');
	    for (var iElem=0; iElem<elms.length; iElem++) 
	    {
	    	var elemID = (elms[iElem].id).trim();
	    	var key_ID = ("D3D"+id).trim();
	    	
	        if( elemID.startsWith(key_ID)  )
	        {   alert(key_id+"<-key_id->elms[i_id].id-->"+elms[iElem].id);
	        	//document.getElementById(elms[i].id).innerHTML = "";
	        	svg.selectAll("#"+elms[iElem].id).remove();	  	
	        }
	    }
	    */
	    return dataMap;
	}
	
	BarDonut3D.drawNext=function( dataMap ){

		var view_data = dataMap.get("view_data");
		var data 	  = dataMap.get("data"); 
		var svg       = dataMap.get("svg");
		var xAxis     = dataMap.get("xAxis");
		var yAxis     = dataMap.get("yAxis");
		var xScale    = dataMap.get("xScale");
		var yScale    = dataMap.get("yScale");
	    
		var line_end_pos = dataMap.get("height") - dataMap.get("margin").top;
			line_end_pos = dataMap.get("height");

		/*********************************************/
		/*
	    for(var i=0; i<100; i++ )
		{   //alert(key_id+"<<22222-->"+dataMap.get("ID"));
	    	try
	    	{
	    		svg.selectAll(("#D3D"+dataMap.get("ID")+i).trim()).remove();	
	    	}catch(evt){}
		}
		*/
		BarDonut3D.removeBarText( dataMap );
	    /*********************************************/
		
		

	    //dataMap = getBarChartData(dataMap);
	    dataMap = BarDonut3D.getBarChartData( dataMap );
	    view_data = dataMap.get("view_data");// get new data
		



		xScale.domain(view_data.map(function(d) { return d.letter; }));
		//yScale.domain([0, d3.max(view_data, function(d) { return d.value; })]);
		//yScale.domain([d3.min(view_data, function(d) { return d.value>0 ? 0 : d.value ; }), d3.max(view_data, function(d) { return d.value; })]);
		var max = d3.max(view_data, function(d) { return d.value; });
		/****
		var min = d3.min(view_data, function(d) { return d.value>0 ? 0 : d.value ; })
		min = (min<0 && max/10>(-min) ) ? -max/10 : min;
		yScale.domain([min, max]);
		*/
		yScale.domain([0, max]);
		var max_val = max;

		svg.select('.x.axis').call(xAxis)

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
		
		
		/*
		svg.select('.x.axis').transition().duration(1000).call(xAxis)
		
	    //Rotate x-Axis Text
			.selectAll("text")	
			.style("text-anchor", "end")
			.attr("dx", "-.8em")
			.attr("dy", ".15em")
			.attr("transform", "rotate(-30)")
			.style('fill',"#EAE") // Text Lable
	     ;
		*/
		
		
		
		// same for yAxis but with more transform and a title
		//svg.select(".y.axis").transition().duration(1000).call(yAxis);
		svg.select(".y.axis").call(yAxis);
		  

		drawBarShadow(svg);


		/*********************************************************************************/
		var bars = svg.selectAll(".bar").data(view_data, function(d) { return d.letter; })
		  
		bars.exit()
		    .transition()
		    .duration(300)
		    .attr("y", yScale(0))
		    .attr("height", dataMap.get("height") - yScale(0))
		    .style('fill-opacity', 1e-6)
		    .remove();

		// data that needs DOM = enter() (a set/selection, not an event!)
		bars.enter().append("rect")
		    .attr("class", "bar")
		    .attr("y", yScale(0))
		    .attr("height", dataMap.get("height") - yScale(0))
		    .style("filter", "url(#drop-shadow)")
		    ;
		    

		bars
	        .on("mousemove", function(d){
	        	
		    	dataMap.get("toolTip").style("color", "#000")	//Text Color
	 		   	dataMap.get("toolTip").style("background", "#FFF")
	 		   	dataMap.get("toolTip").style("box-shadow", "-3px 3px 15px #000"  )
	 		          
	 		   	dataMap.get("toolTip").style("border-bottom", "1px solid"+d.color  )
	 		   	dataMap.get("toolTip").style("border-top",    "1px solid"+d.color  )
	 		   	dataMap.get("toolTip").style("border-left",   "1px solid"+d.color  )
	 		   	dataMap.get("toolTip").style("border-right",  "1px solid"+d.color  )
	 		   	
	        	dataMap.get("toolTip").style("left", d3.event.pageX+10+"px");
	        	dataMap.get("toolTip").style("top", d3.event.pageY-25+"px");
	        	dataMap.get("toolTip").style("display", "inline-block");
	        	dataMap.get("toolTip").style("z-index", "11111");
	        	//dataMap.get("toolTip").html((d.letter)+"<br>"+(d.value)+"%");
	        	dataMap.get("toolTip").html(("<B>"+d.letter)+"</B><br>"+(d.value)+" "+ dataMap.get("unit"));
	        	
            	d3.select(this).style("fill", d3.rgb(d.color).darker(2));
	        });
		bars
	        .on("mouseout", function(d){
	        	dataMap.get("toolTip").style("display", "none");
	        	d3.select(this).style("fill", d.color );
	        });
		    

		// the "UPDATE" set:
		bars.transition().duration(1000).attr("x", function(d) { return xScale(d.letter); }) // (d) is one item from the data array, x is the scale object from above
		    .attr("width", xScale.rangeBand()) // constant, so no callback function(d) here
		    
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
			/**
		    .attr("y", function(d) { return yScale(d.value); })
		    .attr("height", function(d) { return dataMap.get("height") - yScale(d.value); })
		    */
		    .style("fill", function(d) { return d.color; } )
		    .style("filter", "url(#drop-shadow)")

		    ; // flip the height, because y's domain 
		  /*******************************************************************/

	  
	  

		  
		  /*******************Draw Text Lable on BarChart**********************/
          /*
		  svg.selectAll(".text")
			    .data(view_data)
			    .enter().append("text")

	            .transition()
	            .delay(500)
			    //.duration(700)
			    //.ease("slow-out")
			    
			    
			    .attr("id",function(d, i){return ("D3D"+dataMap.get("ID")+parseInt(i)).trim(); } )
			    .attr("y", function(d) { return yScale(d.value); })
			    .attr("x", function(d) { return xScale(d.letter); })
			    
			    .attr("dx", -5)
			    .attr("dy", ".36em")
			    .attr("text-anchor", "end")
			    .text(function(d){ return (d.value); })

				.style("font-size",   "12px")
				.style("font-family", "sans-serif")
				.style('fill',        "#234" ) 
				
				.attr("transform", function(d, i) {
				  return "rotate(-90 " + xScale(d.letter) + "," + (yScale(d.value) - d.letter.length) + ")"
				})
			    ;
			    */

		  svg.selectAll(".text")
		    	.data(view_data)
		    	.enter().append("text")

		    	.transition()
		    	.delay(500)

			    .attr("id",function(d, i){return ("D3D"+dataMap.get("ID")+parseInt(i)).trim(); } )
			    .attr("y", function(d) { return yScale(d.value); })
			    .attr("x", function(d) { return xScale(d.letter); })

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
			    //.attr("dx", function(d)  {   if( line_end_pos<(yScale(d.value) - d.letter.length) )  return "2em"; else return "0em";    } )
			    //.attr("dx", -5)
			    //.attr("dy", ".36em")
			    .attr("text-anchor", "end")
			    .text(function(d){ return (d.value); })
	
				.style("font-size",   "12px")
				.style("font-family", "sans-serif")
				.style('fill',        "#234" ) 
			
				.attr("transform", function(d, i) { 
				    return "rotate(-90 " + xScale(d.letter) + "," + (yScale(d.value)  ) + ")"
				})
		        ;
		  


			/*******************************************************************/ 
	
	        /**************SET TITLE************************************************************/
		  	
		  	if( !( dataMap.get("title_text")=='undefined' || dataMap.get("title_text")==null ) )
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
		  	}
		  	
		  	/**************SET TITLE************************************************************/

		  	
		  	
		
			
	    dataMap.set("xScale", 		xScale);
	    dataMap.set("yScale", 		yScale);
	    dataMap.set("xAxis", 		xAxis);
	    dataMap.set("yAxis", 		yAxis);
	    dataMap.set("svg", 		svg);
	    dataMap.set("bar", 		bars);
	    dataMap.set("view_data", 	view_data);
	    
		
		
		
		
		
		
		
	    
		return dataMap;
	}
	

	//reDrawD3();
	
	this.BarDonut3D = BarDonut3D;
}();


function redraw() {
	  console.log("here", d3.event.translate, d3.event.scale);
	  vis.attr("transform",
	      "translate(" + d3.event.translate + ")"
	      + " scale(" + d3.event.scale + ")");
	}
