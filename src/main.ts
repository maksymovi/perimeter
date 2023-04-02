import './style.css'

import * as L from 'leaflet'

let map = L.map('map', {
  crs: L.CRS.Simple,
  zoomSnap: 0,
  minZoom: -10,
  wheelPxPerZoomLevel: 10
}).setView([4000, 4000], -4);

L.imageOverlay('./erangel/grid_erangel.jpg', [[0, 0],[8000, 8000]]).addTo(map);

//janky way of getting minzoom apropriate
map.fitBounds([[0 , 0], [8000, 8000]]);
map.setMinZoom(map.getZoom());

let mortarIcon = L.icon({
  iconUrl: './mortar.png',
  iconSize: [32, 32]
});

let shellIcon = L.icon({
  iconUrl: './shell.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

let mortar: L.Marker | null;
let mortarCircle: L.Circle | null;
let target: L.Marker | null;


map.on('click', e => {  
  if(mortar == null) {
    //if mortar isn't set, set the mortar, otherwise set the firing position
    mortar = L.marker(e.latlng, {icon: mortarIcon}).addTo(map);
    mortarCircle = L.circle(e.latlng, {radius: 700, color: '#FF3C69'}).addTo(map);

    //remove everything from map if mortar itself is clicked on
    mortar.on('click', _ => {
      mortar!.removeFrom(map);
      mortar = null;
      mortarCircle!.removeFrom(map)
      mortarCircle = null;
      target!.removeFrom(map);
      target = null;
    });
  } else {
    if (target == null) {
      target = L.marker(e.latlng, {icon: shellIcon}).addTo(map);
    } else {
      target.setLatLng(e.latlng);
    }
    target.bindTooltip("Distance is "
    + map.distance(mortar.getLatLng(), target.getLatLng()).toFixed(1)
    + " meters."
    + " Current coordinate is "
    + e.latlng.toString()
    ).openTooltip();
  }
});