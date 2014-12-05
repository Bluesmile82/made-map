


var 
 tileServer = 'http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.png',
 //tileServer = 'Stamen.Watercolor',
   tileAttribution = 'Map data: <a href="http://www.openstreetmap.org/-28.3&layers=T">OSM</a>';

var map = L.map("map",{bounceAtZoomLimits:false, worldCopyJump:true, zoomAnimationThreshold:7}).setView([20, 0], 2);

  L.tileLayer(tileServer, {attribution: tileAttribution,  maxZoom: 4,minZoom:2}).addTo(map);
var markers = L.markerClusterGroup({showCoverageOnHover:false});

var markerMap = {};
var popUpMap = {};
d3.csv("datosGFMD.csv", function(data) {
	for (var i = 1; i < data.length; i++) {

			var title = data[i].Name;

	//	if (i===data.lenght-1)console.log("final");
		if (!isNaN(parseFloat(data[i].lon))){var marker = L.marker([parseFloat(data[i].lon), parseFloat(data[i].lat)],{title:title});
		markerMap[i] = marker;
		popUpMap[i] = markerMap[i].bindPopup(title);
		printMarker(marker,title,i);
		}else (console.log(i));

			
			markers.addLayer(marker);
		// marker.openPopup();

	};
	map.addLayer(markers);

var seleccion = leyenda.selectAll("p");


seleccion.on('mouseover', function() { 
	d3.select(this).style("background-color", "lightblue");
});
seleccion.on('mouseout', function() { 
	d3.select(this).style("background-color", "white");
});


seleccion.on('click', function() { 
	var m = markerMap[d3.select(this).attr("id")];
	markers.zoomToShowLayer(m, function () { m.openPopup();});

});




});

markers.on('click', function(m) {  console.log(m.layer.options.title)});


var leyenda = d3.select("#leyenda");
	

	function printMarker(mark,tit,i){
		
	leyenda.append("p").attr("id",i).text(tit);

	}


//.on("click",function(){ console.log("lala");});


/*
L.tileLayer('http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.png', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	minZoom: 1,
	maxZoom: 16
});
*/
