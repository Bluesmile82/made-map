
var tileServer = 'http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.png'

var tileAttribution = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';

var map = L.map("map",{bounceAtZoomLimits:false, worldCopyJump:true, zoomAnimationThreshold:7}).setView([20, 0], 2);

 		  L.tileLayer(tileServer, {attribution: tileAttribution,  maxZoom: 4,minZoom:2, noWrap:true}).addTo(map);

var markers = L.markerClusterGroup({showCoverageOnHover:false});

var markerMap = {};
var popUpMap = {};
var webMap = {};




d3.csv("datos.csv", function(data) {

		for (var i = 1; i < data.length; i++) {

			var title = data[i].Name;
			var web = data[i].web; 
			var country = data[i].country;
			var city = data[i].city;


				if (!isNaN(parseFloat(data[i].lon))){

					var marker = L.marker([parseFloat(data[i].lon), parseFloat(data[i].lat)],{title:title},{alt:title});
					
					marker.id = i;
					marker.web = web;
					marker.country = country;
					marker.city = city;
					markerMap[i] = marker;
					popUpMap[i] = markerMap[i].bindPopup(title);
					printMarker(marker,i);
					webMap[i] = web;


				}else {(console.log(i));}

			markers.addLayer(marker);


			};

	map.addLayer(markers);


var seleccion = leyenda.selectAll("p");


seleccion.on('mouseover', function() { 

	d3.select(this).style("background-color", "lightblue");

	d3.select(".info").transition().style("height","150px");

	info(d3.select(this).attr("id"));

});


seleccion.on('mouseout', function() { 

	d3.select(this).style("background-color", "white");

});


seleccion.on('click', function() { 

	// map.zoomOut(3);

    var i = d3.select(this).attr("id");
	var m = markerMap[i];

	markers.zoomToShowLayer(m, function () { m.openPopup();});

    info(i);
	

});

});



markers.on('click', function(m) { 

	info(m.layer.id);

});

var leyenda = d3.select("#leyenda");
	



function printMarker(mark,i){
	
	leyenda.append("p").attr("id",i).text(mark.options.title);


}



function info(id){

	d3.select(".info").style("padding","20px").transition().style({height:"150px"});

	// console.log("i"+i+"Nweb"+Nweb);

	var muestraInfo = d3.select("#info").text("");
	var web = markerMap[id].web;
	var country = markerMap[id].country;
	var city = markerMap[id].city;

	muestraInfo.append("p").text(markerMap[id].options.title)
			   .append("p").append("a").attr("href","http://" + web).text(web);
	muestraInfo.append("p").text(country);
	muestraInfo.append("p").text(city);

;}

