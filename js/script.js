


var 
 tileServer = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
 //tileServer = 'Stamen.Watercolor',
   tileAttribution = 'Map data: <a href="http://www.openstreetmap.org/-28.3&layers=T">OSM</a>';

var map = L.map("map").setView([20, 0], 2);

  L.tileLayer(tileServer, {attribution: tileAttribution,  maxZoom: 13,minZoom:2}).addTo(map);
var markers = L.markerClusterGroup();
//var marker = [];
d3.csv("datosGFMD.csv", function(data) {
	for (var i = 1; i < data.length; i++) {

			var title = data[i].Name;

	//	if (i===data.lenght-1)console.log("final");
		if (!isNaN(parseFloat(data[i].lon))){var marker = L.marker([parseFloat(data[i].lon), parseFloat(data[i].lat)],{title:title});
		marker.bindPopup(title);
		printMarker(marker,title);
		}else (console.log(i));

			
			markers.addLayer(marker);


	};
	map.addLayer(markers);

	
});

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 10, 20, 50, 100, 200, 500, 1000],
        labels = [];

    return div;
};

legend.addTo(map);



var leyenda = d3.select("#leyenda");
	function printMarker(mark,tit){
	leyenda.append("p").text(tit).on("click",nothing);
	}
function nothing(){};

/*
L.tileLayer('http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.png', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	minZoom: 1,
	maxZoom: 16
});
*/
