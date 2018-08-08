const placesJson = [
    {
        location : {lat: -23.5874113, lng: -46.6598223},
        title : 'Parque Ibirapuera'
    },
    {
        location: {lat: -23.5423627, lng: -46.6297896},
        title: 'Mercado Municipal'
    },
    {
        location: {lat: -23.556524, lng: -46.686644},
        title: 'Beco do Batman'
    },
    {
        location: {lat: -23.584067, lng: -46.609842},
        title: 'Parque Independência'
    },
    {
        location: {lat: -23.593325, lng: -46.614028},
        title: 'Aquário de São Paulo'
    },
    {
        location: {lat: -23.545506, lng: -46.658767},
        title: 'Parque Buenos Aires'
    },
    {
        location: {lat: -23.547536, lng: -46.664922},
        title: 'Museu do Futebol'
    }
];

var Place = function(place){
    this.location = ko.observable(place.location);
    this.title = ko.observable(place.title);
    this.selectByTitle = function(){
        selectMarkerFromList(this.title());
    }
}

function getPlaces(){
    let places = ko.observableArray([]);
    placesJson.forEach(function(place){
        places.push(new Place(place));
    });
    return places;
}