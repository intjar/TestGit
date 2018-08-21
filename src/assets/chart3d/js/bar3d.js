
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

function getBarChartData(chartMap)
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
function drawBarChart(chartMap)
{ 	
	chartMap = getBarChartData(chartMap);
	var view_data = chartMap.get("view_data");
	

	// set the ranges
    var xScale = d3.scale.ordinal().rangeRoundBands([0, chartMap.get("width")], .3); // shift left-rigth bar-chart [0 TO 1]
    var yScale = d3.scale.linear().range([chartMap.get("height"), 0]);

    // define the axis
    var xAxis = d3.svg.axis().scale(xScale).orient("bottom");
    var yAxis = d3.svg.axis().scale(yScale).orient("left")

            //.tickFormat(function(d) { alert(d);return d; })
            .tickFormat(function(d) { return d >= 1000 ? (d/1000) + "K" : d; })
        ;


    // add the SVG element 
    var svg = d3.select('#'+chartMap.get("ID")).append("svg")
	    .attr("width",  chartMap.get("width")  + chartMap.get("margin").left + chartMap.get("margin").right)
	    .attr("height", chartMap.get("height") + chartMap.get("margin").top  + chartMap.get("margin").bottom)
	    .append("g")
	    .attr("transform", "translate(" + chartMap.get("margin").left + "," + chartMap.get("margin").top + ")")
    ;
    
	xScale.domain(view_data.map(function(d) { return d.letter; }));
	
	var max = d3.max(view_data, function(d) { return d.value; });
	var min = d3.min(view_data, function(d) { return d.value>0 ? 0 : d.value ; })
	min = (min<0 && max/10>(-min) ) ? -max/10 : min;
	yScale.domain([min, max]);
	
	//alert(min +"<>>"+ max);
    //alert(    d3.min(view_data, function(d) { return d.value>0 ? 0 : d.value ; })   );

	// add axis
    svg.append("g")
	    .attr("class", "x axis")
	    .attr("transform", "translate(0," + (chartMap.get("height")+5) + ")")
	    .call(xAxis)
	
	    //Rotate x-Axis Text
		.selectAll("text")	
		.style("text-anchor", "end")
		.attr("dx", "-.8em")
		.attr("dy", ".15em")
		.attr("transform", "rotate(-30)")
		.style('fill',"#EAE") // Text Lable
		;
    

  	svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("dy", "1.40em")
        .attr("dx", "-10.40em")
        .style("text-anchor", "end")
        .text("Capacity (MW)")
        ;
  	

	drawBarShadow(svg);


  	// Add bar chart
  	svg.selectAll("bar")
      			.data(view_data)
    			.enter().append("rect")
		      	.attr("class", "bar")
		      	.attr("x", function(d) { return xScale(d.letter); })
                .attr("y", function(d) { return yScale(d.value); })
		      	.attr("height", function(d) { return chartMap.get("height") - yScale(d.value); })
                .attr("width", xScale.rangeBand())// put gap between two bar rectangle range ==>>>xScale.rangeBand()<<<==
                
                .style("fill", function(d) { return d.color; } )
                .style("filter", "url(#drop-shadow)")
                
                
                .on("mousemove", function(d){
                	chartMap.get("toolTip").style("left", d3.event.pageX+10+"px");
                	chartMap.get("toolTip").style("top", d3.event.pageY-25+"px");
                	chartMap.get("toolTip").style("display", "inline-block");
                	chartMap.get("toolTip").html((d.letter)+"<br>"+(d.value)+"%");
                })
                .on("mouseout", function(d){
                	chartMap.get("toolTip").style("display", "none");
                })
                ;
		      
    /*******************Draw Text Lable on BarChart**********************/

  	svg.selectAll(".text") 
      			.data(view_data)
    			.enter().append("text")
    			.attr("id", function(d)  { return ("D3D"+chartMap.get("ID")+parseInt(d.value)).trim(); } )
		      	.attr("x",  function(d)  { return xScale(d.letter); })
			    .attr("y",  function(d)  { return yScale(d.value); })
			    .attr("dx", -5)
			    .attr("dy", ".36em")
			    .attr("text-anchor", "end")
			    .text(function(d){ return (d.value); })
			
				.attr("transform", function(d, i) {
				  return "rotate(-90 " + xScale(d.letter) + "," + (yScale(d.value) - d.letter.length) + ")"
				})
                ;
	    svg
	    	.on("mousemove", function(d){
	    	chartMap.get("toolTip").style("left", d3.event.pageX+10+"px");
	    	chartMap.get("toolTip").style("top", d3.event.pageY-25+"px");
	    	chartMap.get("toolTip").style("display", "inline-block");
	    	chartMap.get("toolTip").html((d.letter)+"<br>"+(d.value)+"%");
	    });
	    svg
		  	.on("mouseout", function(d){
		    chartMap.get("toolTip").style("display", "none");
		});


    
    chartMap.set("xScale", 		xScale);
    chartMap.set("yScale", 		yScale);
    chartMap.set("xAxis", 		xAxis);
    chartMap.set("yAxis", 		yAxis);
    chartMap.set("svg", 		svg);
    chartMap.set("view_data", 	view_data);
    
    
    
	return chartMap;
}

function removeTextLbl(key_id, ssggvv)
{   alert("removeTextLbl");
	var elms = document.getElementsByTagName('*');
	
	//var key_id = chartMap.get("ID");

    for (var iElem=0; iElem<elms.length; iElem++) 
    {
    	var elemID = (elms[iElem].id).trim();
    	var key_ID = ("D3D"+key_id).trim();
    	
        if( elemID.startsWith(key_ID)  )
        {   alert(key_id+"<-key_id->elms[i_id].id-->"+elms[iElem].id);
        	//document.getElementById(elms[i].id).innerHTML = "";
        	ssggvv.selectAll("#"+elms[iElem].id).remove();	  	
        }
    }
}
function drawNextBarChart(chartMap)
{   
	var view_data = chartMap.get("view_data");
	var data 	  = chartMap.get("data"); 
	var svg       = chartMap.get("svg");
	var xAxis     = chartMap.get("xAxis");
	var yAxis     = chartMap.get("yAxis");
	var xScale    = chartMap.get("xScale");
	var yScale    = chartMap.get("yScale");

    
	/*********************************************/
	
	removeTextLbl(chartMap.get("ID"), svg);
    for(var i=0; i<data.length; i++ )
	{   //alert(key_id+"<<22222-->"+chartMap.get("ID"));
    	//document.getElementById(( chartMap.get("ID")+parseInt(data[i].value)).trim()).innerHTML = "";
    	svg.selectAll(("#D3D"+chartMap.get("ID")+parseInt(data[i].value)).trim()).remove();	
	}
    /*********************************************/
	
	

    chartMap = getBarChartData(chartMap);
    view_data = chartMap.get("view_data");// get new data
	



	xScale.domain(view_data.map(function(d) { return d.letter; }));
	//yScale.domain([0, d3.max(view_data, function(d) { return d.value; })]);
	//yScale.domain([d3.min(view_data, function(d) { return d.value>0 ? 0 : d.value ; }), d3.max(view_data, function(d) { return d.value; })]);
	var max = d3.max(view_data, function(d) { return d.value; });
	var min = d3.min(view_data, function(d) { return d.value>0 ? 0 : d.value ; })
	min = (min<0 && max/10>(-min) ) ? -max/10 : min;
	yScale.domain([min, max]);

	svg.select('.x.axis').call(xAxis)
	  
	            //Rotate x-Axis Text
	      		.selectAll("text")	
	      		.style("text-anchor", "end")
	      		.attr("dx", "-.8em")
	      		.attr("dy", ".15em")
	      		.attr("transform", "rotate(-30)")
	      		.style('fill',"#EAE") // Text Lable
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
	  
	  
	  /*
	    transition: 1s;
	    left: 0;
	  
	  circle_prv.style("left", "0")
*/
	  drawBarShadow(svg);


	  /*********************************************************************************/
	  var bars = svg.selectAll(".bar").data(view_data, function(d) { return d.letter; })
	  
	  bars.exit()
	    .transition()
	    .duration(300)
	    .attr("y", yScale(0))
	    .attr("height", chartMap.get("height") - yScale(0))
	    .style('fill-opacity', 1e-6)
	    .remove();

	  // data that needs DOM = enter() (a set/selection, not an event!)
	  bars.enter().append("rect")
	    .attr("class", "bar")
	    .attr("y", yScale(0))
	    .attr("height", chartMap.get("height") - yScale(0))
	    .style("filter", "url(#drop-shadow)")
	    ;
	    

	  bars
        .on("mousemove", function(d){
        	chartMap.get("toolTip").style("left", d3.event.pageX+10+"px");
        	chartMap.get("toolTip").style("top", d3.event.pageY-25+"px");
        	chartMap.get("toolTip").style("display", "inline-block");
        	chartMap.get("toolTip").html((d.letter)+"<br>"+(d.value)+"%");
        });
	  bars
        .on("mouseout", function(d){
        	chartMap.get("toolTip").style("display", "none");
        });
	    

	  // the "UPDATE" set:
	  bars.transition().duration(1000).attr("x", function(d) { return xScale(d.letter); }) // (d) is one item from the data array, x is the scale object from above
	    .attr("width", xScale.rangeBand()) // constant, so no callback function(d) here
	    .attr("y", function(d) { return yScale(d.value); })
	    .attr("height", function(d) { return chartMap.get("height") - yScale(d.value); })
	    
	    .style("fill", function(d) { return d.color; } )
	    .style("filter", "url(#drop-shadow)")

	    ; // flip the height, because y's domain 
	  /*******************************************************************/

  
  

	  
	  /*******************Draw Text Lable on BarChart**********************/

	  svg.selectAll(".text")
		    .data(view_data)
		    .enter().append("text")

            .transition()
            .delay(500)
		    //.duration(700)
		    //.ease("slow-out")
		    
		    
		    .attr("id",function(d){ return ("D3D"+chartMap.get("ID")+parseInt(d.value)).trim(); } )
		    .attr("y", function(d) { return yScale(d.value); })
		    .attr("x", function(d) { return xScale(d.letter); })
		    
		    .attr("dx", -5)
		    .attr("dy", ".36em")
		    .attr("text-anchor", "end")
		    .text(function(d){ return (d.value); })
		
			.attr("transform", function(d, i) {
			  return "rotate(-90 " + xScale(d.letter) + "," + (yScale(d.value) - d.letter.length) + ")"
			})
		    ;
	  /*******************************************************************/ 

	
		
    chartMap.set("xScale", 		xScale);
    chartMap.set("yScale", 		yScale);
    chartMap.set("xAxis", 		xAxis);
    chartMap.set("yAxis", 		yAxis);
    chartMap.set("svg", 		svg);
    chartMap.set("bar", 		bars);
    chartMap.set("view_data", 	view_data);
    
    
    
	return chartMap;
}










function draw3dBarChart(chartMap)
{   /*
	cMap_1.set("ID", 			"L_Chart_1");
	cMap_1.set("data", 			data_ch1);
	cMap_1.set("colors", 		colors);
	cMap_1.set("margin", 		margin);
	cMap_1.set("width", 		width);
	cMap_1.set("height", 		height);
	cMap_1.set("depth", 		depth);
	cMap_1.set("xScale", 		d3.scale.ordinal().rangeRoundBands([0, width], .4)   );
	cMap_1.set("yScale", 		d3.scale.linear().range([height, 0])   );
	cMap_1.set("zScale", 		d3.scale.ordinal().domain([0, 1, 2]).rangeRoundBands([0, depth], .4)  );

	cMap_1.set("xAxis", 		d3.svg.axis().scale(cMap_1.get("xScale")).orient('bottom')  );
	cMap_1.set("yAxis", 		d3.svg.axis().scale(cMap_1.get("yScale")).orient('left').ticks(10, '')  );



	cMap_1.set("chart",  chart  );
	*/

	chartMap.get("chart").append("g")
      		.attr("class", "x axis")
      		.attr("transform", "translate(0," + chartMap.get("height") + ")")
      		.call(chartMap.get("xAxis"))
      
      		//Rotate x-Axis Text
      		.selectAll("text")	
      		.style("text-anchor", "end")
      		.attr("dx", "-.8em")
      		.attr("dy", ".15em")
      		.attr("transform", "rotate(-30)")
      		.style('fill',function(d,i){ return chartMap.get("colors")[i]; }) // Text Lable
        
      		;
	  

	chartMap.get("chart").append('g')
    		.attr('class', 'y axis')
    		.call(chartMap.get("yAxis"))
    		.append('text')
    		.attr('transform', svgHelp.rotate(-90))
    		.attr('y', 6)
    		.attr('dy', '.71em')
    		.style('text-anchor', 'end')
    		.text('Frequency')
    		.style('fill',function(d,i){ return chartMap.get("colors")[i]; }) // Y Axis Text Lable Color
    		
    		;
    

    var extent = chartMap.get("xScale").rangeExtent();
    var middle = (extent[1] - extent[0]) / 2;
    
	chartMap.get("chart").selectAll('g.bar')
			.data(chartMap.get("data"))
			.enter().append('g')
			.attr('class', 'bar')

			// sort based on distance from center, so we draw outermost
			// bars first. otherwise, bars drawn later might overlap bars drawn first
			.sort(function(a, b) {
				return Math.abs(x(b) - middle) - Math.abs(x(a) - middle);
			})
			.call(chartMap.get("barGen"))
       
			//-------------ToolTips//-------------
			.on("mousemove", function(d){
				chartMap.get("tooltip")
		             .style("left", d3.event.pageX - 50 + "px")
		             .style("top", d3.event.pageY - 70 + "px")
		             .style("color", "RED")
		             .style("display", "inline-block")
		             .html((d.letter) + "<br>" + "£" + (d.frequency));               
			})
			.on("mouseout", function(d){ tooltip.style("display", "none");})
			//-------------End//-------------

			;
	 
	 
	chartMap.get("chart").selectAll(".text")  		
	  		.data(chartMap.get("data"))
	  		.enter()
	  		.append("text")
	  		.attr("class", "value")
	  		.attr("x", function(d) { xText = (10) + chartMap.get("xScale")(d.letter) + chartMap.get("xScale").rangeBand() / 2;  return xText; }  )
	  		.attr("y", function(d, i) { yText = (-20) + chartMap.get("yScale")(d.frequency) + i;  return yText; })
	  
	  

	  .attr("transform", function(d, i) {
	      return "rotate(90 " + chartMap.get("xScale")(d.letter) + "," + (chartMap.get("yScale")(d.frequency) - d.letter.length) + ")"
	    })

  
	  .text(function(d) { return d.frequency; })
	  .style('fill',function(d,i){ return chartMap.get("colors")[i]; }) // Bar-Chart Text Lable Color

	  ; 
	
	
	
	return cMap_1;
}


function bar3d() {
  var config = {
    x: prop('x'),
    y: prop('y'),
    z: prop('z'),
    width: prop('width'),
    height: prop('height'),
    depth: prop('depth'),
    camera: [0, 0, 1]
  };

  function bar3d(g) {
    g.each(function(d){
      var g = d3.select(this);
      var faces = getFaces.apply(this, arguments);

      _.each(faces, function(points, name) {

    	// alert(name); //front top right left
        var path = g.selectAll('.face.'+name).data([name]);
        path.exit().remove();
        path.enter().append('path')
          .attr('class', 'face ' + name);

        d3.transition(path)
          .attr('d', svgHelp.polygon(points));
      });
    });
  }

  function getFaces() {
    // resolve absolute positions
    // x,y,z is left top front corner of the bar
    var left = config.x.apply(this, arguments);
    var right = left + config.width.apply(this, arguments);
    var top = config.y.apply(this, arguments);
    var bottom = top + config.height.apply(this, arguments);
    var front = config.z.apply(this, arguments);
    var back = front + config.depth.apply(this, arguments);

    var cx = config.camera[0];
    var cy = config.camera[1];
    var cz = config.camera[2];

    var projection = perspective(config.camera);

    var faces = {};
// alert("left>"+left+ "-right>"+right +"-top>"+top+ "-bottom>"+bottom +"-front>"+front);
    if (front > cz) {
      faces.front = projection([
        [left,  top,    front],
        [left,  bottom, front],
        [right, bottom, front],
        [right, top,    front]
      ]);
    }
    if (top > cy) {
      faces.top = projection([
        [left,  top, front],
        [left,  top, back],
        [right, top, back],
        [right, top, front]
      ]);
    }
    if (left > cx) {
      faces.left = projection([
        [left, top,    front],
        [left, top,    back],
        [left, bottom, back],
        [left, bottom, front]
      ]);
    }
    if (right < cx) {
      faces.right = projection([
        [right, top,    front],
        [right, top,    back],
        [right, bottom, back],
        [right, bottom, front]
      ]);
    }

    return faces;
  }

  accessor(bar3d, config, 'camera', true);
  accessor(bar3d, config, 'x');
  accessor(bar3d, config, 'y');
  accessor(bar3d, config, 'z');
  accessor(bar3d, config, 'width');
  accessor(bar3d, config, 'height');
  accessor(bar3d, config, 'depth');

  return bar3d;
}