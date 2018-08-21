!function(){
	var legend={};
	


	legend.drawRec3D=function( sgv,x,y,w,h )
	{

			svg.append("circle")
			    .attr("cx", x )
		        .attr("cy",y)
		        .attr("r", 5)
		        .style('fill', "#e4e" ) // Text Header Lable;
		        ;

	}
	
	legend.drawLegends=function( dataMap )
	{
		var legend_data     = dataMap.get("legend_data");
		var legTextSpace    = (dataMap.get("legendTextSpace")==null || dataMap.get("legendTextSpace")=='undefined') ? 0 : dataMap.get("legendTextSpace");
		var svg 			= dataMap.get("svg");
		var legend_hv       = (dataMap.get("legend_hv")==null || dataMap.get("legend_hv")=='undefined') ? 'h' : dataMap.get("legend_hv");
		var legend_gap_h    = (dataMap.get("legend_gap_h")==null || dataMap.get("legend_gap_h")=='undefined') ? 20 : dataMap.get("legend_gap_h");
		var r 				= 4;
		var space 			= 5;
		var textPxLength 	= 0;
		var cirColor 		= '#000';
		var txtColor 		= '#000';
		var legendStartX 	= 0;
		var legendStartY 	= 0;
		
		try 
		{ 
			var x = dataMap.get("legendStartX"); 
			if(!(x==null || x=='undefined' || x.length<1 ))
			{
				legendStartX = parseInt(x);
			}
		}catch(e){legendStartX = 0;}
		try 
		{ 
			var y = dataMap.get("legendStartY"); 
			if(!(y==null || y=='undefined' || y.length<1 ))
			{
				legendStartY = parseInt(y);
			}
		}catch(e){legendStartY = 0;}
		
		
 
		
	    for(var i=0; (legend_hv=='h' || legend_hv=='H') && i<legend_data.length; i ++)// h->Horizontal
	    {
	    	try { cirColor = legend_data[i].cirColor; }catch(e){}
	    	try { txtColor = legend_data[i].txtColor; }catch(e){}
	    	
	    	// alert(legend_data[i].name+"<<legendStartX>>"+legendStartX);

			svg.append("circle")
			    .attr("cx", legendStartX )
		        .attr("cy",dataMap.get("height") + dataMap.get("margin").top  + dataMap.get("margin").bottom - legendStartY)
		        .attr("r", r)
		        .style('fill', cirColor ) // Text Header Lable;
		        ;


			svg.append("text")
				.attr("x", legendStartX + r + space)
				.attr("y",dataMap.get("height") + dataMap.get("margin").top  + dataMap.get("margin").bottom - legendStartY + 3 )
				.text( legend_data[i].name )
				.style("font-size", function(d) { textPxLength = this.getComputedTextLength() + legTextSpace; return "12px"; })
				.style("font-family", "sans-serif")
				.style("font-weight", "bold")
				.style('fill',  txtColor  ) 
		    	;

			svg.append("line")
			   .attr("x1", legendStartX-7)
	           .attr("y1", dataMap.get("height") + dataMap.get("margin").top  + dataMap.get("margin").bottom - legendStartY )
			   .attr("x2", legendStartX+7)
	           .attr("y2", dataMap.get("height") + dataMap.get("margin").top  + dataMap.get("margin").bottom - legendStartY )
	           .attr("stroke-width", 2)
               .attr("stroke", cirColor);

	        ;
			
			
			legendStartX = legendStartX + ( textPxLength * 2);
			
	    }
	    

	    for(var i=0; i<2 && (legend_hv=='v' || legend_hv=='V') && i<legend_data.length; i ++)// v->Vertical
	    {
	    	try { cirColor = legend_data[i].cirColor; }catch(e){}
	    	try { txtColor = legend_data[i].txtColor; }catch(e){}
	    	

			svg.append("circle")
			
			    .attr("cx", legendStartX) 
			    .attr("cy", dataMap.get("height") - legendStartY )
		        
		        .attr("r", r)
		        .style('fill', cirColor ) // Text Header Lable;
		        ;


			svg.append("text")
				.attr("x", legendStartX + r + space)
				.attr("y",dataMap.get("height") - legendStartY + r)
				.text( legend_data[i].name )
				.style("font-size", function(d) { textPxLength = this.getComputedTextLength() + legTextSpace; return "12px"; })
				.style("font-family", "sans-serif")
				.style("font-weight", "bold")
				.style('fill',  txtColor  ) 
		    	;

			svg.append("line")
			   .attr("x1", legendStartX-7)
	           .attr("y1", dataMap.get("height") - legendStartY )
			   .attr("x2", legendStartX+7)
	           .attr("y2", dataMap.get("height") - legendStartY )
	           .attr("stroke-width", 2)
               .attr("stroke", cirColor);

	        ;
	        legendStartY = legendStartY - legend_gap_h;

	    }
		return dataMap;
	}

	
	this.legend = legend;
}();



function legend_drawLegends( dataMap )
{
	var legend_data     = dataMap.get("legend_data");
	var legTextSpace    = (dataMap.get("legendTextSpace")==null || dataMap.get("legendTextSpace")=='undefined') ? 0 : dataMap.get("legendTextSpace");
	var svg 			= dataMap.get("svg");
	var legend_hv       = (dataMap.get("legend_hv")==null || dataMap.get("legend_hv")=='undefined') ? 'h' : dataMap.get("legend_hv");
	var legend_gap_h    = (dataMap.get("legend_gap_h")==null || dataMap.get("legend_gap_h")=='undefined') ? 20 : dataMap.get("legend_gap_h");
	var r 				= 4;
	var space 			= 5;
	var textPxLength 	= 0;
	var cirColor 		= '#000';
	var txtColor 		= '#000';
	var legendStartX 	= 0;
	var legendStartY 	= 0;
	
	try 
	{ 
		var x = dataMap.get("legendStartX"); 
		if(!(x==null || x=='undefined' || x.length<1 ))
		{
			legendStartX = parseInt(x);
		}
	}catch(e){legendStartX = 0;}
	try 
	{ 
		var y = dataMap.get("legendStartY"); 
		if(!(y==null || y=='undefined' || y.length<1 ))
		{
			legendStartY = parseInt(y);
		}
	}catch(e){legendStartY = 0;}
	
	

	
    for(var i=0; legend_hv=='h' && i<legend_data.length; i ++)// h->Horizontal
    {
    	try { cirColor = legend_data[i].cirColor; }catch(e){}
    	try { txtColor = legend_data[i].txtColor; }catch(e){}
    	

		svg.append("circle")
		    .attr("cx", legendStartX )
	        .attr("cy",dataMap.get("height") + dataMap.get("margin").top  + dataMap.get("margin").bottom - legendStartY)
	        .attr("r", r)
	        .style('fill', cirColor ) // Text Header Lable;
	        ;


		svg.append("text")
			.attr("x", legendStartX + r + space)
			.attr("y",dataMap.get("height") + dataMap.get("margin").top  + dataMap.get("margin").bottom - legendStartY + 3 )
			.text( legend_data[i].name )
			.style("font-size", function(d) { textPxLength = this.getComputedTextLength() + legTextSpace; return "12px"; })
			.style("font-family", "sans-serif")
			.style("font-weight", "bold")
			.style('fill',  txtColor  ) 
	    	;

		svg.append("line")
		   .attr("x1", legendStartX-7)
           .attr("y1", dataMap.get("height") + dataMap.get("margin").top  + dataMap.get("margin").bottom - legendStartY )
		   .attr("x2", legendStartX+7)
           .attr("y2", dataMap.get("height") + dataMap.get("margin").top  + dataMap.get("margin").bottom - legendStartY )
           .attr("stroke-width", 2)
           .attr("stroke", cirColor);

        ;
		
		
		legendStartX = legendStartX + ( textPxLength * 2);
		
    }
    

    for(var i=0; legend_hv=='v' && i<legend_data.length; i ++)// v->Vertical
    {
    	try { cirColor = legend_data[i].cirColor; }catch(e){}
    	try { txtColor = legend_data[i].txtColor; }catch(e){}
    	

		svg.append("circle")
		
		    .attr("cx", legendStartX) 
		    .attr("cy", dataMap.get("height") - legendStartY )
	        
	        .attr("r", r)
	        .style('fill', cirColor ) // Text Header Lable;
	        ;


		svg.append("text")
			.attr("x", legendStartX + r + space)
			.attr("y",dataMap.get("height") - legendStartY + r)
			.text( legend_data[i].name )
			.style("font-size", function(d) { textPxLength = this.getComputedTextLength() + legTextSpace; return "12px"; })
			.style("font-family", "sans-serif")
			.style("font-weight", "bold")
			.style('fill',  txtColor  ) 
	    	;

		svg.append("line")
		   .attr("x1", legendStartX-7)
           .attr("y1", dataMap.get("height") - legendStartY )
		   .attr("x2", legendStartX+7)
           .attr("y2", dataMap.get("height") - legendStartY )
           .attr("stroke-width", 2)
           .attr("stroke", cirColor);

        ;
        legendStartY = legendStartY - legend_gap_h;

    }
	return dataMap;
}

