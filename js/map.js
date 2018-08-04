var map;

function initMap() {
    // Constructor creates a new map - only center and zoom are required.
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -23.555878, lng: -46.629069 },//-23.6431999,-46.8294279{ lat: 40.7413549, lng: -73.9980244 }
        zoom: 13,
        mapTypeControl: false
    });

    const defaultIcon = makeMarkerIcon('ff6347');
    const places = getPlaces();
    places().forEach(function(place){
        const location = place.location;
        const title = place.title;
        const marker = new google.maps.Marker({
            position: location,
            map: map,
            title: title,
            animation: google.maps.Animation.DROP,
            icon: defaultIcon
          });
    });
}

function makeMarkerIcon(markerColor) {
    var markerImage = new google.maps.MarkerImage(
      'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
      '|40|_|%E2%80%A2',
      new google.maps.Size(21, 34),
      new google.maps.Point(0, 0),
      new google.maps.Point(10, 34),
      new google.maps.Size(21,34));
    return markerImage;
  }