var map;
var markerList = [];
let defaultIcon;
let selectedIcon;
var infoWindow;
const placesMap = getPlaces();

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -23.555878, lng: -46.629069 },
        zoom: 13,
        mapTypeControl: false
    });

    defaultIcon = makeMarkerIcon('7f3123');
    selectedIcon = makeMarkerIcon('ff6347');
    infoWindow = new google.maps.InfoWindow();

    placesMap().forEach(place => {
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
            selectPlaceInList(this.title);
        });
        markerList.push(marker);
    });
}

function updateMarkers() {
    markerList.forEach(marker => {
        placesMap().forEach(place => {
            if(place.title() === marker.title){
                if(place.visible()){
                    marker.setMap(map);
                }else{
                    marker.setMap(null);
                }
            }
        });
    });
    resetAllMarkers();
    centerMarkers();
}

function showInfoWindow(marker, infoWindow) {
    if (infoWindow.marker != marker) {
        infoWindow.marker = marker;
        infoWindow.setContent('<div>' + marker.title + '</div>');
        infoWindow.open(map, marker);
        infoWindow.addListener('closeclick', function () {
            infoWindow.marker = null;
            marker.clicked = false;
            marker.setIcon(defaultIcon);
        });
    }
}

function centerMarkers() {
    var bounds = new google.maps.LatLngBounds();
    markerList.forEach(marker => {
        bounds.extend(marker.position);
    });
    map.fitBounds(bounds);
}

function resetAllMarkers() {
    markerList.forEach(marker => {
        marker.clicked = false;
        marker.setIcon(defaultIcon);
    });
    infoWindow.marker = null;
    infoWindow.close();
}

function selectMarkerFromList(title) {
    markerList.forEach(marker => {
        if (marker['title'] === title) {
            google.maps.event.trigger(marker, 'click');
        }
    })
}

function selectPlaceInList(title) {
    placesMap().forEach(place => {
        if(place.title() === title) {
            place.selected(true);
        }else {
            place.selected(false);
        }
    });
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
