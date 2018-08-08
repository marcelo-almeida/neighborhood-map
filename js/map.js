var map;
var markerList = [];
let defaultIcon;
let selectedIcon;
const placesMap = getPlaces();

function initMap() {
    // Constructor creates a new map - only center and zoom are required.
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -23.555878, lng: -46.629069 },//-23.6431999,-46.8294279{ lat: 40.7413549, lng: -73.9980244 }
        zoom: 13,
        mapTypeControl: false
    });

    defaultIcon = makeMarkerIcon('7f3123');
    selectedIcon = makeMarkerIcon('ff6347');
    var infoWindow = new google.maps.InfoWindow();

    placesMap().forEach(function (place) {
        const location = place.location();
        const title = place.title();
        const marker = new google.maps.Marker({
            position: location,
            map: map,
            title: title,
            animation: google.maps.Animation.DROP,
            icon: defaultIcon
        });

        marker.addListener('click', function () {
            resetAllMarkers();
            this.setIcon(selectedIcon);
            showInfoWindow(this, infoWindow);
            centerMarkers();
        });
        markerList.push(marker);
    });
}

function showInfoWindow(marker, infoWindow) {
    if (infoWindow.marker != marker) {
        infoWindow.marker = marker;
        infoWindow.setContent('<div>' + marker.title + '</div>');
        infoWindow.open(map, marker);
        infoWindow.addListener('closeclick', function () {
            infoWindow.marker = null;
        });
    }
}

function centerMarkers() {
    var bounds = new google.maps.LatLngBounds();
    markerList.forEach(function(marker){
        bounds.extend(marker.position);
    });
    map.fitBounds(bounds);
}

function resetAllMarkers() {
    markerList.forEach(function (maker) {
        maker.clicked = false;
        maker.setIcon(defaultIcon);
    })
}

function selectMarkerFromList(title) {
    markerList.forEach(function (marker) {
        if (marker['title'] === title) {
            google.maps.event.trigger(marker, 'click');
        }
    })
}

function makeMarkerIcon(markerColor) {
    var markerImage = new google.maps.MarkerImage(
        'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|' + markerColor +
        '|40|_|%E2%80%A2',
        new google.maps.Size(21, 34),
        new google.maps.Point(0, 0),
        new google.maps.Point(10, 34),
        new google.maps.Size(21, 34));
    return markerImage;
}
