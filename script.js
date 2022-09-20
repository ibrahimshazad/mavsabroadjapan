//This file not used for final version.
//Mapbox Trip Guide
//May or may not be implemeted
mapboxgl.accessToken = 'INSERT HERE';
navigator.geolocation.getCurrentPosition(successLocation, errorLocation,{
  enableHighAccuracy: true
})

function successLocation(position){
  console.log(position)
  setupMap([position.coords.longitude, position.coords.latitude])
}
function errorLocation(position){
  setupMap9([-97.1152,32.7292])
}
var map = new mapboxgl.Map({
container: "map",
style: "mapbox://styles/mapbox/streets-v11"
});

function setupMap(center){
  var map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    center: center,
    zoom: 15
  })
  var directions = new MapboxDirections({
    accessToken: 'pk.eyJ1Ijoic2hhd25mcm9zdDE0IiwiYSI6ImNrdTR2NG5rMjA1bGgyb21sc3hjdnR0dnEifQ.mV6ODeVDlgCXHBc8vVKHKg',
  });
  const nav = new mapboxgl.NavigationControl()
  map.addControl(nav);
  map.addControl(directions, 'top-left');

  const geojson = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [138.7274,35.3606]
      },
      properties: {
        title: 'Mapbox',
        description: 'Mount Fuji'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [138.2529,36.2048]
      },
      properties: {
        title: 'Mapbox',
        description: 'Tokyo Tower'
      }
    }
  ]
};

// add markers to map
for (const { geometry, properties } of geojson.features) {
  // create a HTML element for each feature
  const el = document.createElement('div');
  el.className = 'marker';

  // make a marker for each feature and add to the map
  new mapboxgl.Marker(el)
  .setLngLat(geometry.coordinates)
  new mapboxgl.Marker(el)
  .setLngLat(geometry.coordinates)
  .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
  .setHTML(`<h3>${properties.title}</h3><p>${properties.description}</p>`))
  .addTo(map);
}

}
