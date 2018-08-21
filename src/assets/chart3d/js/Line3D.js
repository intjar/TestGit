
var lbl_color = ["#FF0000", "#009933" , "#00FF00", "#FF9933", "#0a99FF", "#0FF933", "#009FF3", "#FF0000", "#009911" , "#FF00FF", "#FF0033", "#0a0033", "#0000FF", "#0099a3",
	             "#FF0000", "#009933" , "#00FF00", "#FF9933", "#0a99FF", "#0FF933", "#009FF3", "#FF0000", "#009911" , "#FF00FF", "#FF0033", "#0a0033", "#0000FF", "#0099a3"];



function resetGridSize(dataMap)
{
	var gridSize = dataMap.get("gridSize");
	var key_val  = dataMap.get("data");
    if(key_val!=null && key_val!='undefined' && key_val.length>0)
    {
    	if( gridSize>key_val.length )
    	{
    		dataMap.set("gridSize", 	key_val.length);
    	}
    }
    return dataMap
}
function lineGridData(dataMap)
{	
	var gridSize     = dataMap.get("gridSize");
	var key_val      = dataMap.get("data");
	var vw_key_val   = dataMap.get("view_data");
	var x_line_index = 1;
	var color        = lbl_color;
	var key_index    = 0;
	
	
    if(dataMap.get("color")!=null && dataMap.get("color")!='undefined' && dataMap.get("color").length>0)
    {
    	color = dataMap.get("color");
    }
    
	/** x-axis statrt line index--> Incremented plus one every time**/
    if(vw_key_val!=null && vw_key_val!='undefined' && vw_key_val.length>0)
    {
    	x_line_index = vw_key_val[0].x_line_index;
    	x_line_index = x_line_index + 1;
    }
    /*****************************/

	
	
    
    /*** get and set splited data list index ***/
    if(vw_key_val!=null && vw_key_val!='undefined' && vw_key_val.length>0)
    {
    	key_index = vw_key_val[0].key_index;
    	key_index = key_index + 1;
    }
    if(key_index>=key_val.length) key_index = 0; // for circuler rotation
    /*******************************************/
    
    
    

    var color_index = 0;
	var counter = 0;
	var temp_val = [];
	for(var i=0; i<key_val.length; )
	{
		//alert("color_key=>"+(i+key_index)%color.length);
		var color_key = color[(i+key_index)%color.length];
		
		
		
		temp_val[counter]  = {
				            x				: counter, 
							x_line_index	: (x_line_index + counter), 
							 
							lbl_key			: key_val[i+key_index].lbl_key, 
							lbl_val			: key_val[i+key_index].lbl_val,
							toolTip		    : key_val[i+key_index].toolTip, 
							key_index		: key_index,   // Total 8 Record >> Start to end eg.. 1,2,3,4,5.. ... 7,8,1,2,3.. ....
							color_code  	: color_key
						};
		
		
		gridSize = gridSize - 1;
		if(gridSize<1)break;
		
		counter = counter + 1;
		
		i = i + 1;
		if((i+key_index) >= key_val.length) {i = 0; key_index = 0; }
		
	} 


	dataMap.set("view_data", temp_val);
	
	
	return dataMap
}


function drawLine( dataMap ) 
{   
	dataMap = resetGridSize(dataMap);
	dataMap = lineGridData(dataMap);
	
	
	var gridSize = dataMap.get("gridSize");
	var view_data= dataMap.get("view_data");
	
	var yAxisLbl_x = (dataMap.get("yAxisLbl_x")==null || dataMap.get("yAxisLbl_x")=='undefined') ? 0 : dataMap.get("yAxisLbl_x")
	var yAxisLbl_y = (dataMap.get("yAxisLbl_y")==null || dataMap.get("yAxisLbl_y")=='undefined') ? 0 : dataMap.get("yAxisLbl_y")
	
	

	var xx = d3.time.scale().range([5, dataMap.get("width")- 15]);   // Line move left-rigth position
	var yy = d3.scale.linear().range([dataMap.get("height"), 0]);

	
	//Define the axes
	var xAxis = d3.svg.axis().scale(xx).orient("bottom").ticks( gridSize );
	var yAxis = d3.svg.axis().scale(yy).orient("left")
	                  .ticks(dataMap.get("ticks"))
	                  .outerTickSize( -5 )
	                  .innerTickSize(-dataMap.get("width") )
	                  .tickFormat(function(d) { return d >= 1000 ? (d/1000) + "K" : d; });

	

	
	
	var d_max = d3.max(view_data, function(d) { return d.lbl_val; });
	var d_min = d3.min(view_data, function(d) { return d.lbl_val; });
	// Scale the range of the data
	var xScale = xx.domain(d3.extent(view_data, function(d) {return d.x_line_index;}));
	var yScale = yy.domain([0, d3.max(view_data, function(d) { return d.lbl_val; })]);
	if(d3.max(view_data, function(d) { return d.lbl_val; })==0)
	{
		yScale = yy.domain([-1, 1]);
	}
	else
	{   
		if( d_min>0 && d_min>(d_max-d_min) )
		{
			yScale = yy.domain([(d_min/2), (d_max + d_max/10)]);
		}
	}
    
	dataMap.set("xScale", 	xScale   );
	dataMap.set("yScale", 	yScale   );
	
	


	//Define the line
	var line = d3.svg.line()
		.x(function(d,i) { return xx(d.x_line_index); })
		.y(function(d)   { return yy(d.lbl_val); })
		.interpolate("linear") // cardinal   cardinal-open
	    ;
	

	var svg = 	d3.select("#"+dataMap.get("ID"))
		.append("svg")
	    .attr("width",  dataMap.get("width")  + dataMap.get("margin").left + dataMap.get("margin").right  )
	    .attr("height", dataMap.get("height") + dataMap.get("margin").top  + dataMap.get("margin").bottom)
	    .append("g")
	    .attr("transform", "translate(" + dataMap.get("margin").left + "," + dataMap.get("margin").top + ")")
	    ;
		

	dataMap.set("d_max", 	d_max   );
	dataMap.set("d_min", 	d_min   );
	dataMap.set("xx", 		xx   );
	dataMap.set("yy", 		yy   );
	dataMap.set("xScale", 	xScale   );
	dataMap.set("yScale", 	yScale   );
	dataMap.set("xAxis", 	xAxis   );
	dataMap.set("yAxis", 	yAxis   );
	dataMap.set("line", 	line   );
	

	//Get the data
	view_data.forEach(function(d) 
	{ 
		d.x_line_index =  d.x_line_index; 
		d.lbl_val      = +d.lbl_val;
	});




	// Add the valueline path.
	svg.append("path")
	.attr("class", "line")
	.attr("d", line(view_data))

	.style("fill", "none")
	.style("stroke", dataMap.get("line_color"))
	.style("stroke-width", 2)

	;



	// Add the X Axis
	svg.append("g")
	.attr("class", "x axis")
	.attr("transform", "translate(0," + dataMap.get("height") + ")")
	.call(xAxis)


	//Rotate x-Axis Text
	.selectAll("text")	
	.style("text-anchor", "end")
	.attr("dx", "1.1em")
	.attr("dy", "1.20em")
	.attr("transform", "rotate(-30)")
	//.text(function(d, i) {  return view_data[i].x_line_index +":"+ view_data[i].lbl_val +":"+ view_data[i].lbl_key; })
	.text(function(d, i) {  return view_data[i].lbl_key; })
	.style("font-size", "10px")
	.style("font-family", "sans-serif")
	.style("font-weight", "bold")
	.style('fill',dataMap.get("xLText_color") ) // Text Lable
	;
	
	
	// Add the Y Axis
	svg.append("g")
	.attr("class", "y axis")
	.call(yAxis)
	
	.style("font-size",   "10px")
	.style("font-family", "sans-serif")
	.style('fill',dataMap.get("yLText_color") ) // Text Lable;
	
			   	.append("text")
		        .attr("transform", "rotate(-90)")
		        .attr("dy", (yAxisLbl_x-2.90)+"em")
		        .attr("dx", (yAxisLbl_y-2.40)+"em")
		        .style("text-anchor", "end")
		        .text( dataMap.get("yAxisLbl")   )
		        .style('fill', dataMap.get("yText_color") ) // Text Header Lable;
		        
		        .style("font-size", "10px")
		        .style("font-family", "Verdana, Geneva, sans-serif")
		        //.style("font-weight", "bold")
    ;


	dataMap.set("svg", svg);
	var tooltip = d3.select("body").append("div").attr("class", "toolTipD3");


	
	svg.selectAll(".dot")
	.data( dataMap.get("view_data") )
	.enter()
	.append("circle")  
	.attr("class", "dot")  
	.attr("cx", function(d, i) {  return xScale( d.x_line_index );  })
	.attr("cy", function(d)    {  return yScale(d.lbl_val) })
	.style('fill', dataMap.get("dot_color"))   
	.attr("r", 5)
	;
	
	  
	/*****************************************/
	/******************************************/
    svg.append("rect") // Total area for mouse over and out 
    	.attr("class", "overlay")
	    .attr("width",  dataMap.get("width")   )
		.attr("height", dataMap.get("height")  )
	

	    .style('fill',"#FF0") // Text Lable
	    .style("transition", "all 2s")
	    .style("opacity", "0.0")


		.on("mousemove", function(d){


			// get x coordinate for the mouse
			// var xCoordinate = d3.mouse(this)[0];
			var xCoordinate = d3.mouse(this)[0] + dataMap.get("width")/(view_data.length*2);
			
			// invert the scale to get the domain value
			var domainX = dataMap.get("xScale").invert(xCoordinate);
			
			// bisect the data to get insertion position
			var bisect = d3.bisector(function(d) { return d.x_line_index - 1; }).left;

			
			var pos = bisect(view_data, domainX);
			
		
		    var cData  = view_data[pos-1];
			var larger = view_data[pos];


		     tooltip
	          
		          .style("left", d3.event.pageX - 50 + "px")
		          .style("top",  d3.event.pageY - 70 + "px")
		          
		          .style("color", "#000")	//Text Color
		          .style("background", "#FFF")
		          .style("box-shadow", "-3px 3px 15px #000"  )
		          
		          .style("border-bottom", "1px solid"+dataMap.get("line_color")  )
		          .style("border-top", 	  "1px solid"+dataMap.get("line_color")  )
		          .style("border-left",   "1px solid"+dataMap.get("line_color")  )
		          .style("border-right",  "1px solid"+dataMap.get("line_color")  )
		
		
		
		          
		          .attr("dx", "-80.8em") // Foure line toolTips => Move to UpSide
		          .style("opacity", "0.8")
		          .style("display", "inline-block")
		          .style("z-index", "111111")
		          
		          .style("transition-property", "right, left")
		          .style("transition", "all 1s")
		          //.html(cData.x+"<br>"+cData.x_line_index+"<BR>"+cData.lbl_key+"<BR>"+pos+"-->"+pos );
		          .html( cData.toolTip );
		       
		})	    
		.on("mouseout", function(d){ 
		    //focus.style("display", "none");
		  tooltip.style("display", "none");
		})
		;


    

    /*
    svg.append("image")
    .attr("xlink:href", getResourcesPat()+"/gmap2/images/zoom2.png")
       .attr("x", 15-dataMap.get("margin").right+"px")
       .attr("y", -35 + dataMap.get("margin").bottom + dataMap.get("height") + dataMap.get("margin").top +"px")
    .attr("width", "24px")
    .attr("height", "24px")
 	.on("click", function(d){
 		$("#z_o_o_m").modal();
 	})
 	;

	svg.append("text")

       .attr("x", 15-dataMap.get("margin").right+"px")
       .attr("y", -20 + dataMap.get("margin").bottom + dataMap.get("height") + dataMap.get("margin").top +"px")
	   .style("text-anchor", "end")
	   .text( 'zoom'  )
	   
	   .style("font-size", "12px")
	   .style("font-family", "Verdana, Geneva, sans-serif")
	   .style('fill', '#12993F' ) 

    .on("click", function(d){
    	$("#z_o_o_m").modal();
    })
    ;
*/
    
    
    
    
        dataMap.set("svg", svg);
        dataMap.set("tooltipDiv", tooltip);
	    return dataMap;
	    
}

function updateLine( dataMap ) 
{
	dataMap = lineGridData(dataMap);

	var gridSize = dataMap.get("gridSize");
	var view_data= dataMap.get("view_data");
	
	
	var x_line_index = view_data[0].x_line_index;
	

	dataMap.set("xScale", 	dataMap.get("xx").domain([ view_data[0].x_line_index, view_data[view_data.length-1].x_line_index])   );
	dataMap.set("yScale", 	dataMap.get("yy").domain([0, d3.max(view_data, function(d) { return d.lbl_val; })])   );
	
	
	
	if(d3.max(view_data, function(d) { return d.lbl_val; })==0)
	{
		dataMap.set("yScale", 	dataMap.get("yy").domain([-1, 1])   );
	}
	else
	{   
		var d_max = dataMap.get("d_max");
		var d_min = dataMap.get("d_min");
		if( d_min>0 && d_min>(d_max-d_min) )
		{
			dataMap.set("yScale", 	dataMap.get("yy").domain([ d_min/2, (d_max + d_max/10)])   );
		}
	}
	
	
	
	var svg = 	d3.select("#"+dataMap.get("ID")).transition();
	
	
	// Make the changes
    svg.select(".line").duration(1750).attr("d", dataMap.get("line")(view_data));

    
    //svg.select(".x.axis").duration(1750).call(xAxis)
    svg.select(".x.axis").duration(1750).call( dataMap.get("xAxis")   )
    
    .selectAll("text")	 //Start Rotate x-Axis Text
    .style("text-anchor", "end")
    
    .attr("dx", "1.1em")
	.attr("dy", "1.20em")
	.attr("transform", "rotate(-30)")

	.text(function(d, i) { var ret = ''; if(i==0) {ret = view_data[i].lbl_key;} 
                                             else {ret = view_data[i-1].lbl_key;}  return ret; })

	.style("font-size", "10px")
	.style("font-family", "sans-serif")
	.style("font-weight", "bold")
	.style('fill',dataMap.get("xLText_color") ) // Text Lable
    ;
    

    svg.select(".y.axis").duration(1750).call( dataMap.get("yAxis") )
    .style('fill',dataMap.get("yText_color") ); // Text Lable;

    
    d3.select("#"+dataMap.get("ID")).selectAll(".dot")
      .data( dataMap.get("view_data") )
      .transition()
      //.ease('"sin-in-out"')
      
      .duration(1000)
      .attr("cx",    function(d, i) { return dataMap.get("xScale")(i+x_line_index) })
      .attr("cy",    function(d)    { return dataMap.get("yScale")(d.lbl_val) })
      .style('fill', function(d)    { return dataMap.get("dot_color"); }) 
      .attr("r", 5)
      ;



	/*****************************************/
	/******************************************/
    
    d3.select("#"+dataMap.get("ID")).selectAll("svg").selectAll("rect").remove();
    var tooltip = dataMap.get("tooltipDiv");
    d3.select("#"+dataMap.get("ID")).selectAll("svg").append("rect") // Total area for mouse over and out 
		.attr("class", "overlay")
	    .attr("width",  dataMap.get("width") +40   )
		.attr("height", dataMap.get("height") +15  )
	   
		.attr("y", "0.00em")
		.attr("x", "2.65em")

	
	    .style('fill',"#0FF") // Text Lable
	    .style("transition", "all 2s")
	    .style("opacity", "0.0")
    
		.on("mousemove", function(d){
		   	//focus.style("display", null);
			//alert(d3.mouse(this)[0]+"<chartMap.>"+dataMap.get("view_data"));
		    //alert();
	
			// get x coordinate for the mouse
			var xCoordinate = d3.mouse(this)[0];
			//var xCoordinate = d3.mouse(this)[0] + dataMap.get("width")/(view_data.length*2);
			
			// invert the scale to get the domain value
			var domainX = dataMap.get("xScale").invert(xCoordinate);

			// bisect the data to get insertion position
			var bisect = d3.bisector(function(d) { return d.x_line_index -1; }).left;
			var pos = bisect(view_data, domainX);
			
		
		    var cData  = view_data[pos-1];
			var larger = view_data[pos];
			

		     tooltip
		          .style("left", d3.event.pageX - 50 + "px")
		          .style("top",  d3.event.pageY - 70 + "px")
		          .style("color", "#000")	//Text Color
		          .style("background", "#FFF")
		          .style("box-shadow", "-3px 3px 15px #000"  )
		          
		          .style("border-bottom", "1px solid"+dataMap.get("line_color")  )
		          .style("border-top", 	  "1px solid"+dataMap.get("line_color")  )
		          .style("border-left",   "1px solid"+dataMap.get("line_color")  )
		          .style("border-right",  "1px solid"+dataMap.get("line_color")  )
		
		
		
		          
		          .attr("dx", "-80.8em") // Foure line toolTips => Move to UpSide
		          .style("opacity", "0.8")
		          .style("display", "inline-block")
		          .style("z-index", "11111")
		          
		          .style("transition-property", "right, left")
		          .style("transition", "all 1s")
		          //.html(cData.x+"<br>"+cData.x_line_index+"<BR>"+cData.lbl_key+"<BR>"+pos+"-->"+pos );
		          .html( cData.toolTip );
		})	    
		.on("mouseout", function(d){ 
		    //focus.style("display", "none");
		  tooltip.style("display", "none");
		})
		;
    
    
   
    
    return dataMap;
}

