!function(){
	var BarDonut3DH={};
	


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
	
	
	BarDonut3DH.draw=function( chartMap ){

	    
		//dataMap.set("ID", 		"Chart_ID");
		//dataMap.set("unit",	    "MW");
		//dataMap.set("data", 	    key_val);
		
		var data 				= chartMap.get("data");
		var barHeight           = (chartMap.get("barHeight")==null || chartMap.get("barHeight")=='undefined') ? 8 : chartMap.get("barHeight");
		var chartWidth 			= (chartMap.get("chartWidth")==null || chartMap.get("chartWidth")=='undefined') ? 100 : chartMap.get("chartWidth");
		var gapBetweenGroups 	= (chartMap.get("gapBetweenGroups")==null || chartMap.get("gapBetweenGroups")=='undefined') ? 5 : chartMap.get("gapBetweenGroups");
		var spaceForLabels 		= (chartMap.get("spaceForLabels")==null || chartMap.get("spaceForLabels")=='undefined') ? 20 : chartMap.get("spaceForLabels");
		var spaceForBottom 		= (chartMap.get("spaceForBottom")==null || chartMap.get("spaceForBottom")=='undefined') ? 5 : chartMap.get("spaceForBottom");


		var xAxis_x_Copm = (chartMap.get("xAxis_x_Copm")==null || chartMap.get("xAxis_x_Copm")=='undefined') ? 0 : chartMap.get("xAxis_x_Copm");
        var xAxis_y_Copm = (chartMap.get("xAxis_y_Copm")==null || chartMap.get("xAxis_y_Copm")=='undefined') ? 0 : chartMap.get("xAxis_y_Copm");	
        var xAxis_font_weight 		= (chartMap.get("xAxis_font_weight")==null || chartMap.get("xAxis_font_weight")=='undefined') ? 5 : chartMap.get("xAxis_font_weight");
        var xAxis_fill_color 		= (chartMap.get("xAxis_fill_color")==null || chartMap.get("xAxis_fill_color")=='undefined') ? 5 : chartMap.get("xAxis_fill_color");
        var xAxis_font_size 		= (chartMap.get("xAxis_font_size")==null || chartMap.get("xAxis_font_size")=='undefined') ? 5 : chartMap.get("xAxis_font_size");
        var xAxis_font_family 		= (chartMap.get("xAxis_font_family")==null || chartMap.get("xAxis_font_family")=='undefined') ? 5 : chartMap.get("xAxis_font_family");
            			
		
        var yAxis_font_weight 		= (chartMap.get("yAxis_font_weight")==null || chartMap.get("yAxis_font_weight")=='undefined') ? 5 : chartMap.get("yAxis_font_weight");
        var yAxis_fill_color 		= (chartMap.get("yAxis_fill_color")==null || chartMap.get("yAxis_fill_color")=='undefined') ? 5 : chartMap.get("yAxis_fill_color");
        var yAxis_font_size 		= (chartMap.get("yAxis_font_size")==null || chartMap.get("yAxis_font_size")=='undefined') ? 5 : chartMap.get("yAxis_font_size");
        var yAxis_font_family 		= (chartMap.get("yAxis_font_family")==null || chartMap.get("yAxis_font_family")=='undefined') ? 5 : chartMap.get("yAxis_font_family");
        
		var groupHeight      = barHeight * data.series.length;
		


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
    /*
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
    */
	var x = d3.scale.linear().domain([0,   d3.max(zippedData)     ]).range([4, chartWidth]);

	var y = d3.scale.linear().range([chartHeight + gapBetweenGroups, 0]);

	var yAxis = d3.svg.axis().scale(y).orient("left")
		.tickSize(0)
	    .tickFormat('')
	    ;

	/*-------------------------------------------------*/
	var xAxis = d3.svg.axis().scale(x).orient("bottom") 
	.tickSize(4)
	.tickFormat(function(d) { return d >= 1000 ? (d/1000) + "K" : d; })
	;


	// Specify the chart area and dimensions
	var chart = d3.select('#Chart_ID').append("svg")
	    .attr("width", spaceForLabels + chartWidth   )
	    .attr("height", chartHeight + spaceForBottom )
	    //.attr("transform", "translate(" + 150 + "," + 150 + ")")
	    ;

	// Create bars
	var bar = chart.selectAll("g")
	    .data(zippedData)
	    .enter().append("g")
	    .attr("transform", function(d, i) {
	      return "translate(" + spaceForLabels + "," + (i * barHeight + gapBetweenGroups * (0.5 + Math.floor(i/data.series.length))) + ")";
	    });

	// Create rectangles of the correct width

	drawBarShadow(bar);
	bar.append("rect")
	    .attr("fill", function(d,i) { return color(i % data.series.length); })
	    .attr("class", "bar")
	    .attr("width", x)
	    .attr("height", barHeight - 1)
	    .attr("transform", "translate(" + 5 + "," + 0 + ")")
	    .style("filter", "url(#drop-shadow)")
	    ;

	// Add text label in bar
	bar.append("text")
	    .attr("x", function(d) { return x(d) - 3; })
	    .attr("y", barHeight / 2)
	    .attr("fill", "red")
	    .attr("dy", ".35em")
	    .text(function(d) { return d; });

	// Draw labels
	bar.append("text")
	    .attr("class", "label")
	    .attr("x", function(d) { return - spaceForLabels; })
	    .attr("y", groupHeight / 2)
	    .attr("dy", ".35em")
	    
	    .style("font-weight", yAxis_font_weight)
		.style("fill", 		  yAxis_fill_color )
		.style("font-size",   yAxis_font_size)
		.style("font-family", yAxis_font_family)
	
	
	    .text(function(d,i) {
	      if (i % data.series.length === 0)
	        return data.labels[Math.floor(i/data.series.length)];
	      else
	        return ""});

	chart.append("g")
	      .attr("class", "y axis")
	      .attr("transform", "translate(" + spaceForLabels + ", " + -gapBetweenGroups/2 + ")")
	      .call(yAxis)
	      ;

	chart.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate("+(spaceForLabels+xAxis_x_Copm)+", "+ ((      ((barHeight*data.series.length)+gapBetweenGroups)  * data.labels.length  )+xAxis_y_Copm)+")")
		.call(xAxis)
		.style("font-weight", xAxis_font_weight)
		.style("fill", 		  xAxis_fill_color )
		.style("font-size",   xAxis_font_size)
		.style("font-family", xAxis_font_family)
	;

	
	    /*
	    dataMap.set("xScale", 		xScale);
	    dataMap.set("yScale", 		yScale);
	    dataMap.set("xAxis", 		xAxis);
	    dataMap.set("yAxis", 		yAxis);
	    dataMap.set("svg", 		svg);
	    dataMap.set("view_data", 	view_data);
	    
	    */
	    
		return dataMap;
	}
	

	//reDrawD3();
	
	this.BarDonut3DH = BarDonut3DH;
}();
