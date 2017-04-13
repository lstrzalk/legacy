var app = angular.module('itChallenges',['ngMaterial']);

/*******************************
**********MARKES SERVICE********
*******************************/
app.service('Markers',function(){
    this.getID = function(){
        var id = localStorage.getItem("id");
        if(!id){
            id = "0";
            localStorage.setItem("id",id);
        }
        localStorage.removeItem("id")
        localStorage.setItem("id", JSON.stringify(parseInt(id) + 1));
		return id

    }
	this.loadMarkers = function(){
	    var markers = localStorage.getItem("markers");
	    if(!markers){
            localStorage.setItem("markers",JSON.stringify([]))
	    	return [];
	    }
	    return JSON.parse(markers);
	}
	this.getMarkerByName = function(value){//To easier mocking campaigns objects
		var markers = this.loadMarkers();	
    	for(var i=0;i<markers.length;i++){
    		if(markers[i].name === value){
    			return markers[i];
    		}
    	}
	}
	this.createMarker = function(name, title, location){
		var markers = JSON.parse(localStorage.getItem("markers"));
		markers.push({name: name, title:title, location: location});
        localStorage.removeItem("markers");
		localStorage.setItem("markers", JSON.stringify(markers));
		return markers;
	}
    this.deleteMarker = function(name){
        var markers = this.loadMarkers();
        var i = this.getMarkerPositionByName(name)
        markers.splice(i,1);
        localStorage.removeItem("markers");
        localStorage.setItem("markers", JSON.stringify(markers));
        return markers;
    }
    this.getMarkerPositionByName = function(name){//To Check if Campaign is on Campaings list
    	var markers = this.loadMarkers();
    	for(var i=0;i<markers.length;i++){
    		if(markers[i].name === name){
    			return i;
    		}
    	}
    	return -1;
    }
    this.update = function(marker, newTitle){
        var marker = this.getMarkerByName(marker.name)
        this.deleteMarker(marker.name)
        marker.title = newTitle;
        this.createMarker(marker.name, marker.title, marker.location);
        return this.loadMarkers();
    }	
});

app.config(function($mdThemingProvider) {
$mdThemingProvider.theme('default')
    .dark()
    .primaryPalette('green')
    .accentPalette('brown');
});

/**
 * TODO LIST
 * Add Info Windows to tags - Today
 * Put address below marker tab when hover - Today/Tomorow
 * Explain what every button does when hover on him - Tomorow
 * Make calculate functionality !important - Today
 * Add categories to markers - Tomorow
 * Add fancy icons to markers - Tomorow/Today
*/

app.controller('mainController', function($scope, $window, $mdDialog, Markers){
    topAutocomplete = new google.maps.places.Autocomplete(
           /** @type {!HTMLInputElement} */(document.getElementById('topInput')),
      {types: ['geocode']});
    topAutocomplete.addListener('place_changed', doSomeAction);
    function doSomeAction(){
        var place = topAutocomplete.getPlace();
        var newMarker = placeMarker($scope, place.geometry.location, Markers);
        $scope.markersObjects[newMarker.label] = newMarker;
        $scope.$apply();
        map.setCenter(place.geometry.location);
    }
    var geocoder = new google.maps.Geocoder;
    var infowindow = new google.maps.InfoWindow;
    $scope.markers = Markers.loadMarkers();
    var cracov = new google.maps.LatLng(50.021, 19.885);
    $window.map = new google.maps.Map(document.getElementById('map'), {
        center: cracov,
        zoom: 15
    });
    $scope.markersObjects = {};
    loadMarkers($window.map, $scope, Markers);
    google.maps.event.addListener($window.map, 'click', function(event) {
        var newMarker = placeMarker($scope, event.latLng, Markers);
        $scope.markersObjects[newMarker.label] = newMarker;
        decode(geocoder, infowindow, event.latLng, newMarker);
        $scope.$apply();
    });

    $scope.markerChoosed = function(marker){
        map.setCenter(marker.location);
    }

    $scope.decode = function(geocoder, infowindow, location, marker){
        geocoder.geocode({'location': location}, function(results, status) {
          if (status === 'OK') {
            if (results[1]) {
              map.setZoom(11);
              infowindow.setContent(results[1].formatted_address);
              infowindow.open(map, marker);
            } else {
              window.alert('No results found');
            }
          } else {
            window.alert('Geocoder failed due to: ' + status);
          }
        });
    }

    $scope.rename = function(marker){
        var confirm = $mdDialog.prompt()
        .title('Rename place')
        .textContent('Put new place name')
        .placeholder('place name')
        .ariaLabel('place name')
        .initialValue(marker.name)
        .ok('change')
        .cancel('cancel');
        $mdDialog.show(confirm).then(function(result) {
            $scope.markers = Markers.update(marker, result);
            $scope.markersObjects[marker.name].title = result;
            $scope.markersObjects[marker.name].setMap(null);
            $scope.markersObjects[marker.name].setMap($window.map);
            }, function() {
        });
    }
    $scope.delete = function(marker, index){
        $scope.markersObjects[marker.name].setMap(null);
        delete $scope.markersObjects[marker.name];
        $scope.markers = Markers.deleteMarker(marker.name);
        index == 0 ? delete $scope.topSelected : delete $scope.bottomSelected
        //Add determining if it is top or bottom selected and delete it
    }
    $scope.deleteAll = function(){
        localStorage.clear();
        for(var marker in $scope.markersObjects){
            $scope.markersObjects[marker].setMap(null);
            delete $scope.markersObjects[marker];

        }
        $scope.markers.splice(0,$scope.markers.length)
        $scope.markers = Markers.loadMarkers();
        $scope.markersObjects = {};
    }
    $scope.adjustMap = function(){
        var bounds = new google.maps.LatLngBounds();
        for (var i = 0; i < $scope.markers.length; i++) {
        bounds.extend($scope.markers[i].location);
        }
        map.fitBounds(bounds);
    }
});

app.directive('ngRightClick', function($parse) {
    return function(scope, element, attrs) {
        var fn = $parse(attrs.ngRightClick);
        element.bind('contextmenu', function(event) {
            scope.$apply(function() {
                event.preventDefault();
                fn(scope, {$event:event});
            });
        });
    };
});
function findIndex(list, node){
    for(var i = 0; i < list.length;i++){
        console.log(list[i].name +" "+ node + " t/f  "+ (list[i].name == node));
        if(list[i].name == node){
            return i;
        }
    }
    return -1;
}
function placeMarker($scope, location, Markers) {
    var id = Markers.getID();
    var marker = new google.maps.Marker({
        position: location,
        title:id,
        label: id,
        map: map
    })
    $scope.markers = Markers.createMarker(marker.label, marker.title, location);
    marker.addListener('dblclick', function(){
        $scope.delete(Markers.getMarkerByName(this.label))
        $scope.$apply();
    });
    map.setCenter(location);
    return marker;
}
function loadMarkers(map, $scope, Markers){
    for(var i = 0; i< $scope.markers.length ; i = i +1){
        var marker = new google.maps.Marker({
        position: $scope.markers[i].location,
        title: $scope.markers[i].title,
        label: $scope.markers[i].name,
        map: map
    })
    $scope.markersObjects[$scope.markers[i].name] = marker;
    $scope.markersObjects[$scope.markers[i].name].addListener('dblclick', function(){
        $scope.delete(Markers.getMarkerByName(this.label))
        $scope.$apply();
        });
    }
}