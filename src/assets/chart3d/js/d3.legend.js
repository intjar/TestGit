var disEnb = {};

(function() {
	
d3.legend = function(g, mapContainer) {
	

  g.each(function() {
    var g= d3.select(this),
        items = {},
        svg = d3.select(g.property("nearestViewportElement")),
        legendPadding = g.attr("data-style-padding") || 5,
        lb = g.selectAll(".legend-box").data([true]),
        li = g.selectAll(".legend-items").data([true])

        //svg.selectAll(("#D3D"+dataMap.get("ID")+i).trim()).remove();	
    //lb.remove();
    //li.remove();
    //svg.selectAll("[data-legend]").remove();
    
    lb.enter().append("rect").classed("legend-box",true)
    li.enter().append("g").classed("legend-items",true)

    svg.selectAll("[data-legend]").each(function() {
        var self = d3.select(this)
        //alert( "d.data.key_text>>"+ self.attr("data-legend").key_text );
        items[self.attr("data-legend")] = {
          pos : self.attr("data-legend-pos") || this.getBBox().y,
          color : self.attr("data-legend-color") != undefined ? self.attr("data-legend-color") : self.style("fill") != 'none' ? self.style("fill") : self.style("stroke") ,
          percent :  self.attr("data-legend-per")   
        }
      })
//d3.select(this).attr("data-legend-per")
    /** items = d3.entries(items).sort(function(a,b) { return a.value.pos-b.value.pos}) **/
    items = d3.entries(items);//.sort(function(a,b) { return a.value.pos-b.value.pos})

    //alert( Object.entries( Object.entries( Object.entries(items)[0] )[1])[1]  );
    /***********************STATRT************************/
    
    var legendBoxHeigth = (mapContainer.get("legendBoxHeigth")==null || mapContainer.get("legendBoxHeigth")=='undefined') ? 20 	: mapContainer.get("legendBoxHeigth");
    var legendBoxWidth 	= (mapContainer.get("legendBoxWidth")==null || mapContainer.get("legendBoxWidth")=='undefined') ? 100 	: mapContainer.get("legendBoxWidth");
    var legendX 		= (mapContainer.get("legendX")==null || mapContainer.get("legendX")=='undefined') ? 0 	: mapContainer.get("legendX");
	var legendY 		= (mapContainer.get("legendY")==null || mapContainer.get("legendY")=='undefined') ? 0 	: mapContainer.get("legendY");
	var legendV 		= (mapContainer.get("legendV")==null || mapContainer.get("legendV")=='undefined') ? true: mapContainer.get("legendV");
	var legendL 		= (mapContainer.get("legendL")==null || mapContainer.get("legendL")=='undefined') ? 1   : mapContainer.get("legendL");
	var space = 10;	
	var cr 	  = 5;
	var space = 5;
	    		
		    		
    /***Vertical***/
    
    if( legendV )
    {
    
	    li.selectAll("text")
	        .data(items)
	        //.data(items,function(d) { return d.key; })
	        .call(function(d) { d.enter().append("text")})
	        .call(function(d) { d.exit().remove()})
	        .attr("y",function(d,i) { return 3 + legendY+(i*16)+"px"})
	        .attr("x",space+legendX+1+"px")
	        .text(function(d) { /*alert( d.value.percent  );*/ return d.key;})
	        .style("fill",function(d) { console.log(d.value.color);return d.value.color;})
	        
	        
	        .style("font-size",   "10px")
			.style("font-family", "sans-serif")
			;
	    
	    li.selectAll("circle")
	        .data(items,function(d) { return d.key})
	        .call(function(d) { d.enter().append("circle")})
	        .call(function(d) { d.exit().remove()})
	        .attr("cy",function(d,i) { return legendY+(i*16)+"px"})
	        .attr("cx",legendX+"px")        
	        .attr("r","6px")
	        .style("fill",function(d) { return d.value.color})  
	        ;
    }
    else /**Horozontal legendL **/ 
    {
        li.selectAll("text")
            .data(items,function(d) { return d.key})
            .call(function(d) { d.enter().append("text")})
            .call(function(d) { d.exit().remove()})
            
            
				.attr("x", function(d, i) {  return legendX + (legendBoxWidth*(i%legendL) + cr + space) +"px";  })
				.attr("y", function(d, i) { return (parseInt(i/legendL)*legendBoxHeigth)+legendY +"px"; })
				
				.text(function(d) { return d.key;})
				.style("font-size",   "12px")
				.style("font-family", "sans-serif")
				//.style("font-weight", "bold")
				.style("fill",function(d) { return d.value.color;})
		    	;


        li.selectAll("circle")
	        .data(items,function(d) { return d.key})
	        .call(function(d) { d.enter().append("circle")})
	        .call(function(d) { d.exit().remove()})
	        
	        .attr("cx", function(d, i) {  return legendX + (legendBoxWidth*(i%legendL)) +"px";  })
			.attr("cy", function(d, i) { return (parseInt(i/legendL)*legendBoxHeigth)+legendY-5 +"px"; })
	        .attr("r",cr+"px")
	        .style("fill",function(d) { return d.value.color})  
        ;
        
    }
	  
 
        
        
    /*
    // Reposition and resize the box
    var lbbox = li[0][0].getBBox()  
    lb.attr("x",(lbbox.x-legendPadding))
        .attr("y",(lbbox.y-legendPadding))
        .attr("height",(lbbox.height+2*legendPadding))
        .attr("width",(lbbox.width+2*legendPadding))
    ;
    */
    
  })
  return g
}
})()