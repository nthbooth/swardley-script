/* Format of map script
var mapScript = {
	title: "Example Map",
	elements: [
		{
			id: "1",
			name: "Element 1",
			visibility: 0.25,
			maturity: 0.75,
			circlecolour: "red",
			outercirclecoulour: "blue"


		},
		{
			id: "2",
			name: "Element 2",
			visibility: 0.75,
			maturity: 0.25
		}
	],
	links: [
		{
			start: "1",
			end: "2"
		}
	],
        arrow: [
        {start: "1", maturity: "0.8" , reverse: "true"}
        ]

}; */

var padding = 20;

var visToY = function (visibility, mapHeight) {
	return (1-visibility)*mapHeight;
};

var matToX = function (maturity, mapWidth) {
	return maturity*mapWidth;
};

var renderLink = function(startElement, endElement, mapWidth, mapHeight,linkColour) {
	var x1 = matToX(startElement.maturity, mapWidth);
	var x2 = matToX(endElement.maturity, mapWidth);
	var y1 = visToY(startElement.visibility, mapHeight);
	var y2 = visToY(endElement.visibility, mapHeight);
	if(!linkColour){
		linkColour="grey";
	}
	return '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+linkColour+'"  stroke-width="2" />';

};

var getElementById = function(elements, id) {
	var hasId = function(element) {
		return element.id === id;
	};
	return elements.find(hasId);
};

var renderLinks = function(mapScript, mapWidth, mapHeight) {
	var mapLink = function(link) {
		return renderLink(getElementById(mapScript.elements,link.start), getElementById(mapScript.elements,link.end), mapWidth, mapHeight, link.colour);
	};
	return mapScript.links.map(mapLink).join('');
};

var renderShape = function(shape, mapWidth, mapHeight) {
	console.log(shape.type);
	if(shape.type == "square"){
		return renderSquare(shape, mapWidth, mapHeight)
	}
	if(shape.type == "eclipse"){
		return renderEllipse(shape, mapWidth, mapHeight)
	}

}


var renderEllipse = function(shape, mapWidth, mapHeight) {
	var cx = matToX(shape.x1, mapWidth);
	var rx = matToX(shape.rx, mapWidth);
	var cy = matToX(shape.y1, mapHeight);
	var ry = visToY(shape.ry, mapHeight);


	//console.log('<rect x="'+x1+'" y="'+y1+'"  width="'+width+'" height="'+height+'"/>');
	return '<ellipse cx="'+cx+'" cy="'+cy+'" rx="'+rx+'" ry="'+ry+'" style="fill:blue;stroke:black;stroke-width:1;opacity:0.2" />';
	
//return '<line x1="'+x1+'" y1="'+y1+'" x2="'+xx1+'" y2="'+y1+'" stroke="grey" stroke-width="3"/> <polygon points="'+xx1+','+yat+' '+xx1+' ,'+yab+' '+xp+','+y1+'" class="traingle"  />';

};


var renderSquare = function(shape, mapWidth, mapHeight) {
	var x1 = matToX(shape.x1, mapWidth);
	var x2 = matToX(shape.x2, mapWidth);
	var y1 = matToX(shape.y1, mapHeight);
	var y2 = visToY(shape.y2, mapHeight);
	var width=x2-x1;
	var height=y2-y1;

	//console.log('<rect x="'+x1+'" y="'+y1+'"  width="'+width+'" height="'+height+'"/>');
	return '<rect x="'+x1+'" y="'+y1+'" rx="20" ry="20" width="'+width+'" height="'+height+'" style="fill:blue;stroke:black;stroke-width:1;opacity:0.2" />';
	
//return '<line x1="'+x1+'" y1="'+y1+'" x2="'+xx1+'" y2="'+y1+'" stroke="grey" stroke-width="3"/> <polygon points="'+xx1+','+yat+' '+xx1+' ,'+yab+' '+xp+','+y1+'" class="traingle"  />';

};


var renderShapes = function(mapScript, mapWidth, mapHeight) {
	var mapShape = function(shape) {
		return renderShape(getElementById(mapScript.shapes,shape.start), mapWidth, mapHeight);
	};
	return mapScript.shapes.map(mapShape).join('');
};

var renderMan = function(element, mapWidth, mapHeight) {
	var x = matToX(element.maturity, mapWidth);
	var y = visToY(element.visibility, mapHeight);
	var mancolour="black";
	if(element.mancolour) { 
		mancolour=element.mancolour; 
	}
	var manheadcolour="white";
	if(element.manheadcolour){
		manheadcolour=element.manheadcolour;
	}
	var headsize=4;
	var ManY=y-18;
	var YBodyTop=ManY+headsize;
	var YBody=ManY+11;
	var MansArmsY=ManY+8;
	var ManArmsX1=x-5;
	var ManArmsX2=x+5;
	var LegY=YBody+6;
	var Leg1X=x+4;
	var Leg2X=x-4;
	var TextX=x+10;
	var TextY=y-5;
		var elementSvg =
	'<g id="'+element.name+'"">' +
											'<circle cx="'+x+'" cy="'+ManY+'" r="'+headsize+'" stroke="'+mancolour+'" fill="'+manheadcolour+'"/>'+
											'<line x1="'+x+'" y1="'+YBodyTop+'" x2="'+x+'" y2="'+YBody+'" stroke="'+mancolour+'" stroke-width="1"/>' + 
														'<line x1="'+ManArmsX1+'" y1="'+MansArmsY+'" x2="'+ManArmsX2+'" y2="'+MansArmsY+'" stroke="'+mancolour+'" stroke-width="1"/>' +
														'<line x1="'+x+'" y1="'+YBody+'" x2="'+Leg1X+'" y2="'+LegY+'" stroke="'+mancolour+'" stroke-width="1"/>' +
											'<line x1="'+x+'" y1="'+YBody+'" x2="'+Leg2X+'" y2="'+LegY+'" stroke="'+mancolour+'" stroke-width="1"/>' +
						'<text x="'+TextX+'" y="'+TextY+'">' +
					element.name +
			  '</text>  ' +
					'</g></g>';

	return elementSvg;
}

var renderArrorMaturity =function(element, mapWidth, mapHeight) {
	var ArrowSVG="";
	if(element.arrowmaturity){
		var x = matToX(element.maturity, mapWidth);
		var y = visToY(element.visibility, mapHeight);
		var yat = y-10;
		var yab = y+10;
		var xx1= matToX(element.arrowmaturity, mapWidth);
		var arrowline='<line x1="'+x+'" y1="'+y+'" x2="'+xx1+'" y2="'+y+'" stroke="red" stroke-width="3" stroke-dasharray="4 4"/>';

		if(element.arrowreverse){
			var xb = x+10;	
			ArrowSVG=arrowline +
					'<polygon points="'+xb+','+yat+' '+xb+' ,'+yab+' '+x+','+y+'" class="traingle" style="fill:red" />';						
		}else{
			var xp = xx1+10;
			ArrowSVG=arrowline + 
					'<polygon points="'+xx1+','+yat+' '+xx1+' ,'+yab+' '+xp+','+y+'" class="traingle"  style="fill:red" />';
		}
	}
	return ArrowSVG;
	}

var renderoutercirclecolour= function(element){
	if(element.outercirclecolour){
	var outerCircleColour='<circle cx="0" cy="0" r="10" stroke="black" fill="' +
	element.outercirclecolour + '" />';
	return outerCircleColour;
	}
	return "";
}

var renderinertiasvg = function(element, mapWidth, mapHeight){
	var inertiasvg="";
	if(element.inertiamaturity)
	{
		var y = visToY(element.visibility, mapHeight);
		var xxinertia=matToX(element.inertiamaturity, mapWidth)-7.5;
		var yat = y-15;
		inertiasvg='<rect x="'+xxinertia+'" y="'+yat+'" width="10" height="30" style="fill:black"/>';
	}
	return inertiasvg;
}

var rendercirclecolour = function(element){
	var ReturnColour="white";
	if(element.circlecolour){
		 ReturnColour=element.circlecolour;
	}
	return ReturnColour;
};

var renderElement = function(element, mapWidth, mapHeight) {
	var x = matToX(element.maturity, mapWidth);
	var y = visToY(element.visibility, mapHeight);
	
	if(element.man){
			return renderMan(element, mapWidth, mapHeight);
	}
	var	outerCircleColour=renderoutercirclecolour(element);
	var circleColour=rendercirclecolour(element);
	var	ArrowSVG=renderArrorMaturity(element, mapWidth, mapHeight);
	var inertiasvg=renderinertiasvg(element, mapWidth, mapHeight);
	var elementSvg =
		'<g id="'+element.name+'" transform="translate('+x+','+y+')">' +
					outerCircleColour +
					'<circle cx="0" cy="0" r="5" stroke="black" fill="' +
					circleColour + '" />' + 
          '<text x="10" y="-5" text-anchor="start">' + 
          	element.name +
          '</text>  ' + 
		'</g></g>'+
		'<g id="arrowbits">' + ArrowSVG + inertiasvg;
    return elementSvg;
};

var renderElements = function(mapScript, mapWidth, mapHeight){
	var mapElement = function (element) {
		return renderElement(element, mapWidth, mapHeight);
	};
	return mapScript.elements.map(mapElement).join('');
};

var renderMap = function(mapScript, mapWidth, mapHeight) {

	var mapSvg =
		'<g id="map">' +
		'<g id="links">' +
		renderLinks(mapScript, mapWidth, mapHeight) +
		'</g>' +
		'<g id="shapes">' +
		renderShapes(mapScript, mapWidth, mapHeight) +
		'</g></g>' +
		'<g id="elements">' +
	    renderElements(mapScript, mapWidth, mapHeight) +
		'</g></g>';

	return mapSvg;
};

var renderSvg = function(mapScript, mapWidth, mapHeight) {
	var svgWidth = mapWidth+2*padding;
	var svgHeight = mapHeight+4*padding;
	var vbWidth = mapWidth+padding;
	var vbHeight = mapHeight+padding;
	var custMark = mapWidth/4;
	var prodMark = mapWidth/2;
	var commMark = mapWidth/4*3;
	var visMark = mapHeight/2;
	var svgHeader =
		'<svg width="'+svgWidth+'" height="'+svgHeight+'" viewbox="-'+padding+' 0 '+vbWidth+' '+vbHeight+'" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' +
			'<g id="grid">' +
				'<g id="value chain" transform="translate(0,'+mapHeight+') rotate(270)">' +
					'<line x1="0" y1="0" x2="'+mapHeight+'" y2="0" stroke="black"/>' +
					'<line x1="-2em" y1="'+custMark+'" x2="'+mapHeight+'" y2="'+custMark+'" stroke="black" stroke-dasharray="5,5"/>' +
					'<line x1="-2em" y1="'+prodMark+'" x2="'+mapHeight+'" y2="'+prodMark+'" stroke="black" stroke-dasharray="5,5"/>' +
					'<line x1="-2em" y1="'+commMark+'" x2="'+mapHeight+'" y2="'+commMark+'" stroke="black" stroke-dasharray="5,5"/>' +
					'<text x="0" y="-0.2em" text-anchor="start">' +
						'Invisible' +
					'</text>' +
					'<text x="'+visMark+'" y="-0.2em" text-anchor="middle" font-weight="bold">' +
						'Value Chain' +
					'</text>' +
					'<text x="'+mapHeight+'" y="-0.2em" text-anchor="end">' +
						'Visible' +
					'</text>' +
				'</g>' +
				'<g id="Evolution" transform="translate(0,'+mapHeight+')">' +
					'<line x1="0" y1="0" x2="'+mapWidth+'" y2="0" stroke="black"/>' +
					'<text x="0" y="1em" text-anchor="start">' +
						'Activity: Genesis' +
					'</text>' +
					'<text x="0" y="2em" text-anchor="start">' +
					'Practice: Novel' +
					'</text>' +
				//	'<text x="0" y="3em" text-anchor="start">' +
				//	'Data: Unmodelled' +
				//	'</text>'  +
				//	'<text x="0" y="4em" text-anchor="start">' +
				//	'Knowledge: Concept' +
				//	'</text>' +
					'<text x="'+custMark+'" y="1em" text-anchor="start">' +
						'&nbsp;Activity: Custom (built)' +
					'</text>' +
					'<text x="'+custMark+'" y="2em" text-anchor="start">' +
					'&nbsp;Practice: Emerging' +
					'</text>' +
				//	'<text x="'+custMark+'" y="3em" text-anchor="start">' +
				//	'&nbsp;Data: Divergent' +
				//	'</text>' +
				//	'<text x="'+custMark+'" y="4em" text-anchor="start">' +
				//	'&nbsp;Knowledge: Hypothesis' +
				//	'</text>' +
					'<text x="'+prodMark+'" y="1em" text-anchor="start">' +
						'&nbsp;Activity: Product/Rental' +
					'</text>' +
					'<text x="'+prodMark+'" y="2em" text-anchor="start">' +
						'&nbsp;Practice: Good' +
					'</text>' +
				//	'<text x="'+prodMark+'" y="3em" text-anchor="start">' +
				//		'&nbsp;Data: Convergent' +
				//	'</text>' +
				//	'<text x="'+prodMark+'" y="4em" text-anchor="start">' +
				//		'&nbsp;Knowledge: Theory' +
				//	'</text>' +
					'<text x="'+commMark+'" y="1em" text-anchor="start">' +
						'&nbsp;Activity: Commodity/Utility' +
					'</text>' +
					'<text x="'+commMark+'" y="2em" text-anchor="start">' +
						'&nbsp;Practice: Best' +
					'</text>' +
				//	'<text x="'+commMark+'" y="3em" text-anchor="start">' +
				//		'&nbsp;Data: Moddlled' +
				//	'</text>' +
				//		'<text x="'+commMark+'" y="4em" text-anchor="start">' +
				//	'&nbsp;Knowledge: Universally Accepted' +
				//	'</text>' +
					'<text x="'+mapWidth+'" y="2em" text-anchor="end" font-weight="bold">' +
						'Evolution' +
					'</text>' +
					
				'</g>' +
			'</g>';

	var svgFooter =
			'</g>' +
		'</svg> ';

	return svgHeader + renderMap(mapScript, mapWidth, mapHeight) + svgFooter;
};


function parse_query_string(query) {
	var vars = query.split("&");
	var query_string = {};
	for (var i = 0; i < vars.length; i++) {
	  var pair = vars[i].split("=");
	  var key = decodeURIComponent(pair[0]);
	  var value = decodeURIComponent(pair[1]);
	  // If first entry with this name
	  if (typeof query_string[key] === "undefined") {
		query_string[key] = decodeURIComponent(value);
		// If second entry with this name
	  } else if (typeof query_string[key] === "string") {
		var arr = [query_string[key], decodeURIComponent(value)];
		query_string[key] = arr;
		// If third or later entry with this name
	  } else {
		query_string[key].push(decodeURIComponent(value));
	  }
	}
	return query_string;
  }


function draw() {
	//get the query strings that are provided to the http request. 
	//console.log( window.location.search.substring(1));
	var qs= parse_query_string(window.location.search.substring(1))
	console.log("Test")
	//console.log(qs);
	//console.log(qs.url);
	//console.log(qs.height)
	var mapHeight = 600;
	var mapWidth = 900;
	
	if(qs.height){
		mapHeight=qs.height;
	} 
	if(qs.width){
		mapWidth=qs.width;
	}
	//console.log(qs);
	var svg = renderSvg(mapScript, mapWidth, mapHeight);
	var newSvg = document.getElementById('wardley-map');

	newSvg.outerHTML += svg;

}



window.onload = draw;
