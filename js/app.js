var ViewModel = function () {
    self = this;
    this.places = placesMap;
    this.query = ko.observable("");

    this.searchPlaces = function () {
        const query = self.query().toLowerCase();
        let matchList = [];
        self.places().forEach(place => {
            const pos = place.title().toLowerCase().search(query);
            if (pos >= 0) {
                place.visible(true);
            } else {
                place.visible(false);
            }
            place.selected(false);
        });
        updateMarkers();
        
    }
}

var vm = new ViewModel();
vm.query.subscribe(vm.searchPlaces);
ko.applyBindings(vm);