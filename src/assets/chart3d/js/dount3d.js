
	var donut3d={};
	var LBox = [], RBox = [];
	//var legend;
	
	function pieTop(d, rx, ry, ir ){
		if(d.endAngle - d.startAngle == 0 ) return "M 0 0";
		var sx = rx*Math.cos(d.startAngle),
			sy = ry*Math.sin(d.startAngle),
			ex = rx*Math.cos(d.endAngle),
			ey = ry*Math.sin(d.endAngle);
			
		var ret =[];
		ret.push("M",sx,sy,"A",rx,ry,"0",(d.endAngle-d.startAngle > Math.PI? 1: 0),"1",ex,ey,"L",ir*ex,ir*ey);
		ret.push("A",ir*rx,ir*ry,"0",(d.endAngle-d.startAngle > Math.PI? 1: 0), "0",ir*sx,ir*sy,"z");
		return ret.join(" ");
	}

	function pieOuter(d, rx, ry, h ){
		var startAngle = (d.startAngle > Math.PI ? Math.PI : d.startAngle);
		var endAngle = (d.endAngle > Math.PI ? Math.PI : d.endAngle);
		
		var sx = rx*Math.cos(startAngle),
			sy = ry*Math.sin(startAngle),
			ex = rx*Math.cos(endAngle),
			ey = ry*Math.sin(endAngle);
			
			var ret =[];
			ret.push("M",sx,h+sy,"A",rx,ry,"0 0 1",ex,h+ey,"L",ex,ey,"A",rx,ry,"0 0 0",sx,sy,"z");
			return ret.join(" ");
	}

	function pieInner(d, rx, ry, h, ir ){
		var startAngle = (d.startAngle < Math.PI ? Math.PI : d.startAngle);
		var endAngle = (d.endAngle < Math.PI ? Math.PI : d.endAngle);
		
		var sx = ir*rx*Math.cos(startAngle),
			sy = ir*ry*Math.sin(startAngle),
			ex = ir*rx*Math.cos(endAngle),
			ey = ir*ry*Math.sin(endAngle);

			var ret =[];
			ret.push("M",sx, sy,"A",ir*rx,ir*ry,"0 0 1",ex,ey, "L",ex,h+ey,"A",ir*rx, ir*ry,"0 0 0",sx,h+sy,"z");
			return ret.join(" ");
	}

	function getPercent(d){
		return (d.endAngle-d.startAngle > 0 ? 
				Math.round(1000*(d.endAngle-d.startAngle)/(Math.PI*2))/10+'%' : '');
	}	
	/*
	function getPercent(d){
		return (d.endAngle-d.startAngle > 0.2 ? 
				Math.round(1000*(d.endAngle-d.startAngle)/(Math.PI*2))/10+'%' : '');
	}*/	
	function getLable(d){
		return (d.value);
	}
	function getLableSkipZero(d){
		if(d.value>0)
		return (d.value);
		else
	    return "";		
	}
	
	donut3d.transition = function(id, data, rx, ry, h, ir){
		// map.delete(name, {qty: 1});
		
		
		
		function arcTweenInner(a) {
		  var i = d3.interpolate(this._current, a);
		  this._current = i(0);
		  return function(t) { return pieInner(i(t), rx+0.5, ry+0.5, h, ir);  };
		}
		function arcTweenTop(a) {
		  var i = d3.interpolate(this._current, a);
		  this._current = i(0);
		  return function(t) { return pieTop(i(t), rx, ry, ir);  };
		}
		function arcTweenOuter(a) {
		  var i = d3.interpolate(this._current, a);
		  this._current = i(0);
		  return function(t) { return pieOuter(i(t), rx-.5, ry-.5, h);  };
		}
		function textTweenX(a) {
		  var i = d3.interpolate(this._current, a);
		  this._current = i(0);
		  return function(t) { return 0.8*rx*Math.cos(0.5*(i(t).startAngle+i(t).endAngle));  };
		}
		function textTweenY(a) {
		  var i = d3.interpolate(this._current, a);
		  this._current = i(0);
		  return function(t) { return 0.8*rx*Math.sin(0.5*(i(t).startAngle+i(t).endAngle));  };
		}
		
		//var _data = d3.layout.pie().sort(null).value(function(d, i) {if(i==0 || i==2)return ""; return d.value;})(data);
		var _data = d3.layout.pie().sort(null).value(function(d, i) 
		{
			//if(i==0 || i==2)return ""; 
			//alert(disEnb);

		    //for(var disEnb_i=0; i<disEnb.length;disEnb_i++)
		    //{
		    if(!(disEnb["key_index_"+i]==null || disEnb["key_index_"+i]=='undefined'))
		    {
		    	return ""; 
		    }
		    //}
			return d.value;
			
		})(data);
		
		d3.select("#"+id).selectAll(".innerSlice").data(_data)
			.transition().duration(750).attrTween("d", arcTweenInner); 
			
		d3.select("#"+id).selectAll(".topSlice").data(_data)
			.transition().duration(750).attrTween("d", arcTweenTop); 
			
		d3.select("#"+id).selectAll(".outerSlice").data(_data)
			.transition().duration(750).attrTween("d", arcTweenOuter); 	
			
		d3.select("#"+id).selectAll(".percent").data(_data).transition().duration(750)
			.attrTween("x",textTweenX).attrTween("y",textTweenY).text( getLableSkipZero ); 
		
		//slices.selectAll(".percent").data(_data).enter().append("text").attr("class", "percent")
		//.attr("x",function(d){ return 0.6*rx*Math.cos(0.5*(d.startAngle+d.endAngle));})
		//.attr("y",function(d){ return 0.6*ry*Math.sin(0.5*(d.startAngle+d.endAngle));})
		//.text(getPercent).each(function(d){this._current=d;});	
		
		/*
		d3.select("#"+id).selectAll(".legend").remove();
		//legend.call(d3.legend);
		
		var slices = d3.select("#"+id).append("g").attr("transform", "translate(" + x + "," + y + ")")
		.attr("class", "slices");
		  legend = slices.append("g")
		    .attr("class","legend")
		    
		    .attr("transform","translate(-150,150)")
		    .style("font-size","12px")

		    .call(d3.legend)
		    ;
		  
		  */
		
		/*
		d3.select("#"+id).selectAll("text").remove();
		d3.select("#"+id).selectAll("circle").remove();

		  legend = slices.append("g")
		    .attr("class","legend")
		    
		    .attr("transform","translate(-150,150)")
		    .style("font-size","12px")

		    .call(d3.legend)
		    ;
		  */

		//d3.select("#"+id).selectAll("text").data(_data, function(d) { return d; })
		//.attr("class", "update")
		//;
		
		/*
	    li.selectAll("text")
        .data(items)
        //.data(items,function(d) { return d.key; })
        .call(function(d) { d.enter().append("text")})
        .call(function(d) { d.exit().remove()})
        .attr("y",function(d,i) { return ((0.65*i)+i-3.50)+"em"})
        .attr("x","1em")
        .text(function(d) {  return d.key;})
        .style("fill",function(d) { console.log(d.value.color);return d.value.color;})
        */
		/*
		d3.select("#"+id).selectAll("[data-legend]").each(function(d, i) 
		{
			
			  alert( i+"-->>>>--"+ d.value   ); 
		      for (var p in d ) 
		      { 
		        //if(p.fields)
		        //alert( i+"-->>>>--"+ p   ); 

		      }
	      });
	      */
		


		  /*
		d3.select("#"+id).selectAll("[data-legend]").each(function(i, d) {
		        //alert(i+ 'abul kalam'+ d);  
		        
		        d3.select(this).text(function(d) {  return 'abul kalam';})
			

		      });*/
		/*
		d3.select("#"+id).selectAll("text")
		  .data(_data)

		  .attr('class', 'legend')
		  .attr('text', function(d, i) { alert(d.value);return 'abul'+i });
		
		*/
		
	}


	/*********************************************************/

	//var toolTip = d3.select("body").append("div").attr("class", "toolTipD3");
/*
	   .style("position", "relative")
       .style("color", "#0E0")
       .style("opacity", "0.8")
       .style("background", "#FFF")
       .attr("dx", "-80.8em") // Foure line toolTips => Move to UpSide
       .style("display", "inline-block")
       .style("WebkitTransition", "all 1s")
       .style("transition", "all 1s")
       .style("border", "3px solid #73AD21")
       .html( ""  )
       
       ;
       */

       /***************************************************/


	
	   donut3d.draw=function(id, data, x /*center x*/, y/*center y*/, 
			rx/*radius x*/, ry/*radius y*/, h/*height*/, ir/*inner radius*/, mapContainer){
				alert("dount3d.draw inside");
		var toolTip = mapContainer.get("toolTip");
		var _data = d3.layout.pie().sort(null).value(function(d) {return d.value;})(data);
		       
		var slices = d3.select("#"+id).append("g").attr("transform", "translate(" + x + "," + y + ")")
			.attr("class", "slices");
			
		slices.selectAll(".innerSlice").data(_data).enter().append("path").attr("class", "innerSlice")
			.style("fill", function(d) { return d3.hsl(d.data.color).darker(0.7); })
			.attr("d",function(d){ return pieInner(d, rx+0.5,ry+0.5, h, ir);})
			.attr("data-legend",function(d) { return d.data.legend_text; })
			.attr("data-legend-per",function(d) { return getPercent(d); })
			
			.each(function(d){this._current=d;});
        

		slices.selectAll(".topSlice").data(_data).enter().append("path")
		    .attr("class", "topSlice")
		    .attr("keyColor", 	function(d) { return d.data.color; 	  })
		    .attr("key_text", 	function(d) { return d.data.key_text; })
		    .attr("unit", 		function(d) { return d.data.unit; 	  })
			.style("fill", 		function(d) { return d.data.color;    })
			.style("stroke", 	function(d) { return d.data.color;    })
			.attr("d",			function(d) { return pieTop(d, rx, ry, ir);})
			.each(function(d){this._current=d;})
			
			
	   //.style("transition", "all 2s")
	   .on("mousemove", function(d){   
		   d3.select(this).style("opacity", "0.7");
		   
		   //d3.select(this).attr("d",function(d){ return pieTop  (d, rx-20, ry-20, ir);})
		   //d3.select(this).attr("d",function(d){ return pieInner(d, rx+0.4,ry+0.4, h+10, ir);})
		   //d3.select(this).attr("d",function(d){ return pieOuter(d, rx-.7,ry-.7, h+20);})
           
		   //alert( "d3.select(this).attr(d)-->"+d3.select(this).attr("d")   );
           //.attr("data-legend-per",function(d) { return getPercent(d); })

		    var toolTipX = (mapContainer.get("toolTipX")==null || mapContainer.get("toolTipX")=='undefined') ? 0 : mapContainer.get("toolTipX")
		    var toolTipY = (mapContainer.get("toolTipY")==null || mapContainer.get("toolTipY")=='undefined') ? 0 : mapContainer.get("toolTipY")
	    	
    	   	toolTip.style("color", "#000")	//Text Color
		   	toolTip.style("background", "#FFF")
		   	toolTip.style("box-shadow", "-3px 3px 15px #000"  )
		          
		   .style("border-bottom", "1px solid"+d3.select(this).attr("keyColor")  )
		   .style("border-top",    "1px solid"+d3.select(this).attr("keyColor")  )
		   .style("border-left",   "1px solid"+d3.select(this).attr("keyColor")  )
		   .style("border-right",  "1px solid"+d3.select(this).attr("keyColor")  )
		   
       	    toolTip.style("left", toolTipX+d3.event.pageX+10+"px");
    	   	toolTip.style("top",  toolTipY+d3.event.pageY-25+"px");
    	   	toolTip.style("display", "inline-block");
    	   	toolTip.style("z-index", "11111");
       	
    	   	toolTip.html( "<B>"+d3.select(this).attr("key_text") +" ("+ d.value +") "+d3.select(this).attr("unit") +"</B><br> "+ getPercent(d) );
       	

	    })

	    .on("mouseout", function(d){ 
	    	d3.select(this).style("opacity", "1")
	    	toolTip.style("display", "none");
	        //d3.select(this).style("fill", d3.select(this).attr("keyColor"))
	    })
		;
		
		slices.selectAll(".outerSlice").data(_data).enter().append("path").attr("class", "outerSlice")
			.style("fill", function(d) { return d3.hsl(d.data.color).darker(0.7); })
			.attr("d",function(d){ return pieOuter(d, rx-.5,ry-.5, h);})
			.each(function(d){this._current=d;});
		
		
        
	    /****************************************************Draw Lable********************************************************/																										 // linear 
		
		if( (mapContainer.get("lblText")!='undefined')  &&  mapContainer.get("lblText")  ) 
		{
			slices = drawTextLable(slices, mapContainer, _data, rx, ry);
			
		}
		/***************************************************END-Draw-Lable*********************************************************/


		  var _legend = (mapContainer.get("legend")==null || mapContainer.get("legend")=='undefined') ? true   : mapContainer.get("legend");
          if(_legend)
          {
			  legend = slices.append("g")
			    .attr("class","legend")
			    
			    .attr("transform","translate(-150,150)")
			    .style("font-size","12px")
	
			    .call(d3.legend, mapContainer)
			    ;
          }


		

	}
	
	
	function drawTextLable(slices, mapContainer, _data, rx, ry)
	{
		var lineFunction = d3.svg.line() .x(function(d) { return d.xx; }) .y(function(d) { return d.yy; }) .interpolate('basis');

		lineData = [];
		
		// get position for each arc in pie chart
		slices
			.selectAll(".percent")
			.data(_data).enter()
			.append("text")
			.attr("class", "percent")
			.attr("x",
					function(d,i)
					{   
						lineData[i] = {
								xx: 1.0*rx*Math.cos(0.5*(d.startAngle+d.endAngle)),  
								yy: 1.0*ry*Math.sin(0.5*(d.startAngle+d.endAngle)), 
								val:d.data.lable_text,
								per:getPercent(d), 
								color:d.data.color 
								}; 
						return 1.0*rx*Math.cos(0.5*(d.startAngle+d.endAngle));
					})
			//.attr("x",function(d,i){ return 1.0*rx*Math.cos(0.5*(d.startAngle+d.endAngle));})
			.attr("y",function(d){ return 1.0*ry*Math.sin(0.5*(d.startAngle+d.endAngle));})
			//.text(getLable).each(function(d){this._current=d;})
			.text('')
		    ;

		
		//donut3d.draw=function(id, data, x /*center x*/, y/*center y*/,  rx/*radius x*/, ry/*radius y*/, h/*height*/, ir/*inner radius*/){ 
		
		var text_box    = (mapContainer.get("text_box")==null || mapContainer.get("text_box")=='undefined') ? 6 : mapContainer.get("text_box");// maximum each side text box
		var box_dist    = (mapContainer.get("box_dist")==null || mapContainer.get("box_dist")=='undefined') ? 30 : mapContainer.get("box_dist"); 
		var box_tot_dis = (mapContainer.get("box_tot_dis")==null || mapContainer.get("box_tot_dis")=='undefined') ? parseInt(2*ry) : mapContainer.get("box_tot_dis"); 
		var start_heigth = -ry;
		var text_dist = parseInt(box_tot_dis/text_box) ;
		LBox = []; // put empty
		RBox = []; // put empty

		//create box
		for(var ii=0; ii<text_box; ii++)
		{
			RBox[ii] = {x:(rx+box_dist),   y:start_heigth };
			LBox[ii] = {x:(-rx-box_dist),  y:start_heigth };
			start_heigth = start_heigth + text_dist;
		}
//alert(lineData.length+"--+++++---"+RBox.length+">>>>>>"+text_box);
		
		for(var ii=0; ii<lineData.length; ii++)
		{   
			var xy_coordinate = getXY_coordinate(lineData[ii], ii)

			var line_ang  = 10;	
			var lineData2 = []; 

			if(xy_coordinate.x<0)
			{
				lineData2[0] = {xx:lineData[ii].xx,     		yy:lineData[ii].yy };
				lineData2[1] = {xx:lineData[ii].xx-line_ang , 	yy:lineData[ii].yy+line_ang };
				lineData2[2] = {xx:xy_coordinate.x,             yy:xy_coordinate.y };
				
				xy_coordinate.x = xy_coordinate.x - (lineData[ii].val.length*6.5);
			}
			else
			{
				lineData2[0] = {xx:lineData[ii].xx,     		yy:lineData[ii].yy };
				lineData2[1] = {xx:lineData[ii].xx+line_ang , 	yy:lineData[ii].yy-line_ang };
				lineData2[2] = {xx:xy_coordinate.x,             yy:xy_coordinate.y };
			}


			slices.append("path")
			  .attr("d", lineFunction(lineData2))
			  .attr("stroke", lineData[ii].color)
			  .attr("stroke-width", 1)
			  .attr("fill", "none")
			  ;

			slices
		        .append("text")
		        .attr("x", xy_coordinate.x)
				.attr("y", xy_coordinate.y)
		        .text( lineData[ii].val ) 
		        .style("font-weight", "bold")
				.style("font-size",   "12px")
				.style("font-family", "Trebuchet MS, Verdana, sans-serif")
		        ;
			
			if( (mapContainer.get("lblText_percent")!='undefined')  &&  mapContainer.get("lblText_percent")  ) 
			{
			slices
		        .append("text")
		        .attr("x", xy_coordinate.x)
				.attr("y", xy_coordinate.y+15)
		        .text("("+lineData[ii].per+")" ) 
		        //.style("font-weight", "bold")
				.style("font-size",   "10px")
				.style("font-family", "Trebuchet MS, Verdana, sans-serif")
		        ;
			}
			
			
		}
		
		return slices;
	}
    // RBox, LBox,  
    function getXY_coordinate(lineData, d_index)
    {
    	var xy = {x:0, y:0};
    	if(lineData.xx<=0 )
    	{
    		var arrayList = [];
    		for(var index = 0; index<LBox.length; index++)
    		{
    			arrayList[index] = LBox[index].y;
    		}

    		xy.x = LBox[d_index].x;
    		xy.y = closest (lineData.yy, arrayList);   
    		
    		setFalseSelectedeBox(xy.y, 0);
    	}
    	else
    	{
    		var arrayList = [];
    		for(var index = 0; index<RBox.length; index++)
    		{
    			arrayList[index] = RBox[index].y;
    		}

        	if(d_index==6)
    		{
    		//alert(d_index+">>>"+lineData.xx+">>>>>"+RBox[d_index]);
    		}
        	
    		xy.x = RBox[d_index].x;
    		xy.y = closest (lineData.yy, arrayList);
    		
    		setFalseSelectedeBox(xy.y, 1);
    	}    
    	
    	return xy;
    }
    
    function setFalseSelectedeBox(y, selectedBox)
    {
    	if(selectedBox==0)
    	{
    		for(var index = 0; index<LBox.length; index++)
    		{
    			if( LBox[index].y==y) LBox[index].y = 9999;
    		}
    	}
    	if(selectedBox==1)
    	{
    		for(var index = 0; index<RBox.length; index++)
    		{
    			if( RBox[index].y==y) RBox[index].y = 9999;
    		}
    	}
    }
	
    function closest (num, arr) {
        var curr = arr[0];
        var diff = Math.abs (num - curr);
        for (var val = 0; val < arr.length; val++) {
            var newdiff = Math.abs (num - arr[val]);
            if (newdiff < diff) {
                diff = newdiff;
                curr = arr[val];
            }
        }
        return curr;
    }
	//reDrawD3();
	

	
	// export{
	// 	donut3d
	// };





