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
 * Put address below marker tab when hover - Today/Tomorow
 * Explain what every button does when hover on him - Tomorow
 * Make calculate functionality !important - Today - in progress
 * Add categories to markers - Tomorow
 * Add fancy icons to markers - Tomorow/Today
 * Cahnge to one geocoder - refactor
 * Make addresses permanent in local storage
 * add two new info windows
 * Delete 48 unused px from bottom bar
*/
cracov = new google.maps.LatLng(50.021, 19.885);
readyToCompute = false;
lastChoosed = true;
app.controller('mainController', function($scope, $window, $mdDialog, Markers){
    InfoWindow = new google.maps.InfoWindow;
    geocoder = new google.maps.Geocoder
    $scope.markers = Markers.loadMarkers();
    $window.map = new google.maps.Map(document.getElementById('map'), {
        center: cracov,
        zoom: 15
    });
    geodesicPoly = new google.maps.Polyline({
          strokeColor: '#CC0099',
          strokeOpacity: 1.0,
          strokeWeight: 3,
          geodesic: true,
          map: window.map
        });
    geodesicPolyThin = new google.maps.Polyline({
          strokeColor: '#424242',
          strokeOpacity: 1.0,
          strokeWeight: 1,
          geodesic: true,
          map: window.map
        });
    $scope.markersObjects = {};
    topAutocomplete = new google.maps.places.Autocomplete(
           /** @type {!HTMLInputElement} */(document.getElementById('topInput')),
      {types: ['geocode']});
    topAutocomplete.addListener('place_changed', function(){
        placeFromSearchBox($scope, this, Markers, $window.map)
    });
    loadMarkers($window.map, $scope, Markers, InfoWindow);
    google.maps.event.addListener($window.map, 'click', function(event) {
        var newMarker = placeMarker($scope, event.latLng, Markers, $window.map, InfoWindow);
        $scope.markersObjects[newMarker.label] = newMarker;
        $scope.$apply();
    });

    $scope.markerChoosed = function(marker){
        if($scope.topSelected >=0 && $scope.bottomSelected >= 0){
            // decode(new google.maps.Geocoder, InfoWindow, marker.location, $scope.markersObjects[marker.name], $window.map)
            var choosed = [$scope.markers[$scope.topSelected],$scope.markers[$scope.bottomSelected]]
            focusMap(choosed, $window.map);
            readyToCompute = true;
            showComputingWindow();
            geodesicPolyThin.setMap($window.map);
            geodesicPolyThin.setPath([$scope.markersObjects[choosed[0].name].getPosition(), $scope.markersObjects[choosed[1].name].getPosition()]);

        }else{
            decode(geocoder, InfoWindow, marker.location, $scope.markersObjects[marker.name], $window.map)
            $window.map.setCenter(marker.location);
        }
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
        //Shold add new value, not delete becouse magic i doing
        if($scope.topSelected != undefined && $scope.topSelected != -1 && $scope.bottomSelected != undefined && $scope.bottomSelected != -1){
            console.log("TODO");
        }else{
            if(index == $scope.topSelected){
                delete $scope.topSelected
                console.log($scope.topSelected)
            }else if(index == $scope.bottomSelected){
                delete $scope.bottomSelected
                console.log($scope.bottomSelected)
            }
        }
        $scope.markersObjects[marker.name].setMap(null);
        delete $scope.markersObjects[marker.name];
        $scope.markers = Markers.deleteMarker(marker.name);
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
        focusMap($scope.markers, $window.map);
    }
    $scope.cancel = function(){
        readyToCompute = false;
        geodesicPoly.setMap(null);
        geodesicPolyThin.setMap(null);
        delete $scope.topSelected;
        delete $scope.bottomSelected;
        hideComputingWindow();
        focusMap($scope.markers, $window.map);
    }
    $scope.getResults = function(){
        var choosed = [$scope.markers[$scope.topSelected],$scope.markers[$scope.bottomSelected]]
        printDistance(prepareDistance(google.maps.geometry.spherical.computeDistanceBetween ($scope.markersObjects[choosed[0].name].getPosition(), $scope.markersObjects[choosed[1].name].getPosition())))
        geodesicPoly.setPath([$scope.markersObjects[choosed[0].name].getPosition(), $scope.markersObjects[choosed[1].name].getPosition()]);
        geodesicPolyThin.setMap(null);
        geodesicPoly.setMap($window.map);
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
        if(list[i].name == node){
            return i;
        }
    }
    return -1;
}
function placeMarker($scope, location, Markers, map, InfoWindow) {
    var id = Markers.getID();
    var marker = createMarkerObject(Markers, $scope, location, id, id, map, InfoWindow)
    $scope.markers = Markers.createMarker(marker.label, marker.title, location);
    map.setCenter(location);
    return marker;
}
function loadMarkers(map, $scope, Markers, InfoWindow){
    for(var i = 0; i< $scope.markers.length ; i = i +1){
        $scope.markersObjects[$scope.markers[i].name] = createMarkerObject(Markers, $scope, $scope.markers[i].location, $scope.markers[i].title, $scope.markers[i].name, map, InfoWindow);
    }
    
}

function createMarkerObject(Markers, $scope, location, title, label, map, InfoWindow){
    var marker = new google.maps.Marker({
        position: location,
        title: title,
        label: label,
        map: map
    })
    return addListenersToMarker(Markers, marker, $scope,  geocoder, InfoWindow, map);
}


function addListenersToMarker(Markers, marker, $scope, geocoder, infowindow, map){
    marker.addListener('click', function(){
        if($scope.topSelected >= 0 && $scope.bottomSelected >= 0){
            if(lastChoosed){
                lastChoosed = !lastChoosed
                if($scope.markers[$scope.topSelected] != $scope.markers[findIndex($scope.markers, marker.label)]){
                    $scope.topSelected = findIndex($scope.markers, marker.label);
                }
                else{
                    $scope.bottomSelected = findIndex($scope.markers, marker.label);
                }
            }else{
                lastChoosed = !lastChoosed
                if($scope.markers[$scope.bottomSelected] != $scope.markers[findIndex($scope.markers, marker.label)]){
                    $scope.bottomSelected = findIndex($scope.markers, marker.label); 
                }
                else{
                    $scope.topSelected = findIndex($scope.markers, marker.label);
                }
            }
            var choosed = [$scope.markers[$scope.topSelected],$scope.markers[$scope.bottomSelected]]
            focusMap(choosed, map);
        }else if($scope.bottomSelected != undefined && $scope.bottomSelected != -1){
            $scope.topSelected = findIndex($scope.markers, marker.label);
            var choosed = [$scope.markers[$scope.topSelected],$scope.markers[$scope.bottomSelected]]
            focusMap(choosed, map);
        }else if($scope.topSelected != undefined && $scope.topSelected != -1){
            $scope.bottomSelected = findIndex($scope.markers, marker.label)
            var choosed = [$scope.markers[$scope.topSelected],$scope.markers[$scope.bottomSelected]]
            focusMap(choosed, map);
        }else {
            $scope.topSelected = findIndex($scope.markers, marker.label)
            decode(geocoder, infowindow, marker.position, marker, map);
        }
        $scope.$apply();
    });
    marker.addListener('dblclick', function(){
        $scope.delete(Markers.getMarkerByName(this.label))
        $scope.$apply();
    });
    return marker
}
function placeFromSearchBox($scope, topAutocomplete, Markers, map, InfoWindow){
    var place = topAutocomplete.getPlace();
    if(place){
        var newMarker = placeMarker($scope, place.geometry.location, Markers, map, InfoWindow);
        $scope.markersObjects[newMarker.label] = newMarker;
        $scope.$apply();
    }
}

function decode(geocoder, infowindow, location, marker, map){
    geocoder.geocode({'location': location}, function(results, status) {
        if (status === 'OK') {
        if (results[0]) {
            map.setZoom(15);
            map.setCenter(location);
            infowindow.setContent(printAddress(marker,results[0].formatted_address));
            infowindow.open(map, marker);
        } else {
            window.alert('No results found');
        }
        } else {
        window.alert('Geocoder failed due to: ' + status);
        }
    });
}
function printAddress(marker, address){
    var res = address.split(",");
    var street;
    var region;
    var country;
    if(res[0].length > 20){
        if(res[0].split(" ").length > 1){
            var temp = res[0].split(" ");
            if(temp.length > 2){
                var bal = balance(temp);
                street = "<div id=\"address\">\n"
                street = street + "<p>\n"
                for(var i = 0 ; i < bal ; i = i + 1){
                    street = street + temp[i] + " "
                }
                street = street + "</p>\n"
                street = street + "<p>\n"
                for(var i = bal ; i < temp.length ; i = i + 1){
                    street = street + temp[i] + " "
                }
                street = street + "</p>\n"
                street = street + "</div>\n"
            }else{
                street = "<div id=\"address\"> <p>"+ res[0] +"</p>\n</div>\n"
            }
        }
    }
    else{
        street = "<div id=\"address\"> <p>"+ res[0] +"</p>\n</div>\n"
    }
    region = "<div id=\"address\"> <p>"+ res[1] +"</p>\n</div>\n"
    country = "<div id=\"address\"> <p>"+ res[2] +"</p>\n</div>\n"
    var title ="<h2 id=\"address\"> Title: "+ marker.title +"</h2>\n"
    var id =  "<h3 id=\"address\"> id: "+ marker.label +"</h3>\n"
    return title + id + street + region + country;
}
function balance(str){
    var index = 0;
    var best = 1;
    var bestDif;
    for(var i = 0; i < str.length - 1; i = i + 1){
        var firstLen = 0;
        var secondLen = 0;
        for(var j = 0; j<i ; j = j + 1){
            firstLen = firstLen + str[j].length
        }
        for(var k = i+1; k < str.length ; k = k +1){
            secondLen = secondLen + str[k].length
        }
        if(bestDif == null){
            bestDif = Math.abs(firstLen - secondLen)
            best = i;
        }else if(bestDif > Math.abs(firstLen - secondLen)){
            bestDif =  Math.abs(firstLen - secondLen)
            best = i;
        }
    }
    return best;
}
function focusMap(markers, map){
    var bounds = new google.maps.LatLngBounds();
    if(markers.length > 1){
        for (var i = 0; i < markers.length; i++) {
            console.log(markers[i].location)
            bounds.extend(markers[i].location);
        }
        map.fitBounds(bounds);
    }else if(markers.length == 1){
        map.setCenter(markers[0].location);
        map.setZoom(15);
    }else{
        map.setCenter(cracov);
        map.setZoom(15);
    }
}
function prepareDistance(dist){
    dist = Math.round(dist);
    if(dist / 1000 == 0){
        return dist.toString() + " meters"
    }else{
        return (dist/1000).toString() + " kilometers"
    }
}