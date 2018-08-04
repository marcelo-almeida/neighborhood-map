var map;

function initMap() {
    // Constructor creates a new map - only center and zoom are required.
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -23.555878, lng: -46.629069 },//-23.6431999,-46.8294279{ lat: 40.7413549, lng: -73.9980244 }
        zoom: 13
    });

    const places = getPlaces();
    places().forEach(function(place){
        const location = place.location;
        const title = place.title;
        const marker = new google.maps.Marker({
            position: location,
            map: map,
            title: title
          });
    });
}