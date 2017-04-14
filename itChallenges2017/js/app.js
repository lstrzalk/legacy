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

/*******************************
*********APP THEME CONFIG*******
*******************************/

app.config(function($mdThemingProvider) {
$mdThemingProvider.theme('default')
    .dark()
    .primaryPalette('green')
    .accentPalette('brown');
});

/*******************************
*********GLOBAL VARAIBLES*******
*******************************/

cracov = new google.maps.LatLng(50.021, 19.885);
readyToCompute = false;
computed = true;
lastChoosed = true;
/*******************************
**********APP CONTROLLER********
*******************************/
app.controller('mainController', function($scope, $window, $mdDialog, Markers){
    infoWindow = new google.maps.InfoWindow;// Info window for start marker
    infoWindow2 = new google.maps.InfoWindow;//Info window for end marker
    geocoder = new google.maps.Geocoder//Geocoder for getting addresses
    lastChoosen = [];//To mark again with proper color
    $scope.markers = Markers.loadMarkers();//loading markers
    /*******************************
    ************CREATE MAP**********
    *******************************/
    $window.map = new google.maps.Map(document.getElementById('map'), {
        center: cracov,
        zoom: 15,
        scaleControl: true,
        // Place maps components in places where they will not colision bars
        streetViewControl: true,
        streetViewControlOptions: {
            position: google.maps.ControlPosition.LEFT_CENTER
        },
        fullscreenControl: true,
        fullscreenControlOptions: {
            position: google.maps.ControlPosition.RIGHT_CENTER
        },
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
            position: google.maps.ControlPosition.LEFT_CENTER
        },
        zoomControl: true,
        zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_CENTER
        }
    });
    // Creating line creator
    geodesicPoly = new google.maps.Polyline({
          strokeColor: '#AA00FF',
          strokeOpacity: 3.0,
          strokeWeight: 3,
          geodesic: true,
          map: window.map
        });
    // Creating thin creator
    geodesicPolyThin = new google.maps.Polyline({
          strokeColor: '#424242',
          strokeOpacity: 1.0,
          strokeWeight: 1,
          geodesic: true,
          map: window.map
        });
    // Structure to hold old markers as Google Markers
    $scope.markersObjects = {};
    // Autocomplete for search box
    topAutocomplete = new google.maps.places.Autocomplete(
           /** @type {!HTMLInputElement} */(document.getElementById('topInput')),
      {types: ['geocode']});
    topAutocomplete.addListener('place_changed', function(){
        placeFromSearchBox($scope, this, Markers, $window.map)
    });
    //Loading exisiting Markers
    loadMarkers($window.map, $scope, Markers, infoWindow);
    // Adding events on map to create new marker
    google.maps.event.addListener($window.map, 'click', function(event) {
        if (readyToCompute)
        {
            $mdDialog.show(
                $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Can\'t add new Marker')
                    .textContent('You must close calculating window')
                    .ok('Got it!')
                    .targetEvent(event)
                );
            return ;
        }
        var newMarker = placeMarker($scope, event.latLng, Markers, $window.map, infoWindow);
        $scope.markersObjects[newMarker.label] = newMarker;
        $scope.$apply();
    });
    //Action when user choose a marker
    $scope.markerChoosed = function(marker){
        if($scope.topSelected >=0 && $scope.bottomSelected >= 0){// If both are selected
            computed = false;
            geodesicPoly.setMap(null)//clear last line
            if(lastChoosen.length == 2){
                hideResult();//hide last result
                lastChoosen[0].setIcon({//set last result icon to standard
                    path: MAP_PIN,
                    fillColor: '#03A9F4',
                    fillOpacity: 1,
                    strokeColor: '',
                    strokeWeight: 0,
                    labelOrigin: new google.maps.Point(0,-25)
                });
                lastChoosen[1].setIcon({//set last result icon to standard
                    path: MAP_PIN,
                    fillColor: '#03A9F4',
                    fillOpacity: 1,
                    strokeColor: '',
                    strokeWeight: 0,
                    labelOrigin: new google.maps.Point(0,-25)
                });
            }
            var choosed = [$scope.markers[$scope.topSelected],$scope.markers[$scope.bottomSelected]]//get choosed markers
            focusMap(choosed, $window.map);//focus map on them
            readyToCompute = true;//flag for dispaly info
            showComputingWindow();//show computing window manager
            geodesicPolyThin.setMap($window.map);//print thin line between cities
            var start = $scope.markersObjects[choosed[0].name]//specify start
            var end = $scope.markersObjects[choosed[1].name]//specify end
            start.setIcon({//Set green icon for start
                path: MAP_PIN,
                fillColor: '#8BC34A',
                fillOpacity: 1,
                strokeColor: '',
                strokeWeight: 0,
                labelOrigin: new google.maps.Point(0,-25)
            });
            end.setIcon({//Set red icon for end
                path: MAP_PIN,
                fillColor: '#F44336',
                fillOpacity: 1,
                strokeColor: '',
                strokeWeight: 0,
                labelOrigin: new google.maps.Point(0,-25)
            });
            lastChoosen = [start, end];//set las choosen
            geodesicPolyThin.setPath([start.getPosition(), end.getPosition()]);//print line between cities
            putInfo(geocoder, infoWindow, choosed[0].location, start, $window.map);//open info window for start
            putInfo(geocoder, infoWindow2, choosed[1].location, end, $window.map);//open info window for end

        }else{//if not both are secified
            decode(geocoder, infoWindow, marker.location, $scope.markersObjects[marker.name], $window.map)//display info window
            $window.map.setCenter(marker.location);
        }
    }
    //function to rename marker title, you can call it as e.g. home, school, best parking
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
    //function for delete marker
    $scope.delete = function(marker, index){
        //case when two markers are choosen
        if($scope.topSelected != undefined && $scope.topSelected != -1 && $scope.bottomSelected != undefined && $scope.bottomSelected != -1){
            if(index == $scope.topSelected || index == $scope.bottomSelected){//Dialog that you can't delete marker if it is selected
                $mdDialog.show(
                $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Can\'t Delete selected marker')
                    .textContent('You must unselect marker')
                    .ok('Got it!')
                );
            }else{//You can delete marker
                var topVal = $scope.markers[$scope.topSelected];
                var bottomVal = $scope.markers[$scope.bottomSelected]
                delete $scope.topSelected;
                delete $scope.bottomSelected
                $scope.markersObjects[marker.name].setMap(null);
                delete $scope.markersObjects[marker.name];
                $scope.markers = Markers.deleteMarker(marker.name);
            }
        }
        else if($scope.topSelected != undefined && $scope.topSelected != -1){//If only top marker is selected
            if(index == $scope.topSelected){//Dialog that you can't delete marker if it is selected
                $mdDialog.show(
                $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Can\'t Delete selected marker')
                    .textContent('You must unselect marker')
                    .ok('Got it!')
                );
            }else{//You can delete marker
                var topVal = $scope.markers[$scope.topSelected];
                delete $scope.topSelected;
                $scope.markersObjects[marker.name].setMap(null);
                delete $scope.markersObjects[marker.name];
                $scope.markers = Markers.deleteMarker(marker.name);
            }
        }else if($scope.bottomSelected != undefined && $scope.bottomSelected != -1){//If only bottom marker is selected
            if(index == $scope.bottomSelected){//Dialog that you can't delete marker if it is selected
                $mdDialog.show(
                $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Can\'t Delete selected marker')
                    .textContent('You must unselect marker')
                    .ok('Got it!')
                );
            }else{//You can delete marker
                var bottomVal = $scope.markers[$scope.bottomSelected]
                delete $scope.bottomSelected
                $scope.markersObjects[marker.name].setMap(null);
                delete $scope.markersObjects[marker.name];
                $scope.markers = Markers.deleteMarker(marker.name);
            }
        }else{//There are no any restriction if any marker is select
            $scope.markersObjects[marker.name].setMap(null);
            delete $scope.markersObjects[marker.name];
            $scope.markers = Markers.deleteMarker(marker.name);
        }
    }
    //Function for deleting all markers, lines, reset local storage
    $scope.deleteAll = function(){
        delete $scope.topSelected;
        delete $scope.bottomSelected;
        readyToCompute = false;
        hideComputingWindow()
        localStorage.clear();
        for(var marker in $scope.markersObjects){
            $scope.markersObjects[marker].setMap(null);
            delete $scope.markersObjects[marker.label];

        }
        geodesicPolyThin.setMap(null);
        geodesicPoly.setMap(null);
        $scope.markers.splice(0,$scope.markers.length)
        $scope.markers = Markers.loadMarkers();
        $scope.markersObjects = {};

    }
    $scope.adjustMap = function(){//Holder of real function to adjust map to all tags
        focusMap($scope.markers, $window.map);
    }
    //Stop distance computing process 
    $scope.cancel = function(){
        if(lastChoosen.length == 2){
            hideResult();//hide last result
            lastChoosen[0].setIcon({//set last result icon to standard
                path: MAP_PIN,
                fillColor: '#03A9F4',
                fillOpacity: 1,
                strokeColor: '',
                strokeWeight: 0,
                labelOrigin: new google.maps.Point(0,-25)
            });
            lastChoosen[1].setIcon({//set last result icon to standard
                path: MAP_PIN,
                fillColor: '#03A9F4',
                fillOpacity: 1,
                strokeColor: '',
                strokeWeight: 0,
                labelOrigin: new google.maps.Point(0,-25)
            });
        }
        readyToCompute = false;
        geodesicPoly.setMap(null);
        geodesicPolyThin.setMap(null);
        delete $scope.topSelected;
        delete $scope.bottomSelected;
        hideComputingWindow();
        focusMap($scope.markers, $window.map);
    }
    //Function print distance to user
    $scope.getResults = function(){
        computed = true;
        var choosed = [$scope.markers[$scope.topSelected],$scope.markers[$scope.bottomSelected]]
        var dist = prepareDistance(google.maps.geometry.spherical.computeDistanceBetween($scope.markersObjects[choosed[0].name].getPosition(), $scope.markersObjects[choosed[1].name].getPosition()))
        printDistance(dist)
        geodesicPoly.setPath([$scope.markersObjects[choosed[0].name].getPosition(), $scope.markersObjects[choosed[1].name].getPosition()]);
        geodesicPolyThin.setMap(null);
        geodesicPoly.setMap($window.map);
    }
});
/*******************************
**********CONTROLLER END********
*******************************/

function findIndex(list, node){
    for(var i = 0; i < list.length;i++){
        if(list[i].name == node){
            return i;
        }
    }
    return -1;
}
//Placing marker on map
function placeMarker($scope, location, Markers, map, infoWindow) {
    var id = Markers.getID();
    var marker = createMarkerObject(Markers, $scope, location, id, id, map, infoWindow)
    $scope.markers = Markers.createMarker(marker.label, marker.title, location);
    map.setCenter(location);
    return marker;
}
//Loading markers from simple, avaliable to string parse, to Google marks format, unable to string parse
function loadMarkers(map, $scope, Markers, infoWindow){
    for(var i = 0; i< $scope.markers.length ; i = i +1){
        $scope.markersObjects[$scope.markers[i].name] = createMarkerObject(Markers, $scope, $scope.markers[i].location, $scope.markers[i].title, $scope.markers[i].name, map, infoWindow);
    }
    
}
//Process of creating Google Marker from Simple format
function createMarkerObject(Markers, $scope, location, title, label, map, infoWindow){
    var marker = new google.maps.Marker({
        position: location,
        title: title,
        label: label,
        map: map,
        icon: {
            path: MAP_PIN,
            fillColor: '#03A9F4',
            fillOpacity: 1,
            strokeColor: '',
            strokeWeight: 0,
            labelOrigin: new google.maps.Point(0,-25)
        }
    })
    return addListenersToMarker(Markers, marker, $scope,  geocoder, infoWindow, map);
}
//Function Adding listeners to marker
function addListenersToMarker(Markers, marker, $scope, geocoder, infoWindow, map){
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
            decode(geocoder, infoWindow, marker.position, marker, map);
        }
        $scope.$apply();
    });
    marker.addListener('dblclick', function(){
        $scope.delete(Markers.getMarkerByName(this.label))
        $scope.$apply();
    });
    return marker
}
//Function adding place found in search box to markers
function placeFromSearchBox($scope, topAutocomplete, Markers, map, infoWindow){
    var place = topAutocomplete.getPlace();
    if(place){
        var newMarker = placeMarker($scope, place.geometry.location, Markers, map, infoWindow);
        $scope.markersObjects[newMarker.label] = newMarker;
        $scope.$apply();
    }
}
//function for centering map on selected marker and print info window about him
function decode(geocoder, infoWindow, location, marker, map){
    geocoder.geocode({'location': location}, function(results, status) {
        if (status === 'OK') {
        if (results[0]) {
            map.setZoom(15);
            map.setCenter(location);
            infoWindow.setContent(printAddress(marker,results[0].formatted_address));
            infoWindow.open(map, marker);
        } else {
            window.alert('No results found');
        }
        } else {
        window.alert('Geocoder failed due to: ' + status);
        }
    });
}
//Function for preparing address to print in pretty way
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
        street = "<div id=\"address\">"+ res[0] +"\n</div>\n"
    }
    region = "<div id=\"address\">"+ res[1] +"\n</div>\n"
    country = "<div id=\"address\"> "+ res[2] +"\n</div>\n"
    var title ="<div id=\"titleHeader\"><b> Title: "+ marker.title +"</b></div>\n"
    var id =  "<div id=\"idHeader\"><b> id: "+ marker.label +"</b></div>\n"
    return title + id + street + region + country;
}
//function to find balance between lengths of two lines with long addresses
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
//function focusing map including all markers
function focusMap(markers, map){
    var bounds = new google.maps.LatLngBounds();
    if(markers.length > 1){
        for (var i = 0; i < markers.length; i++) {
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
//Prepare distance format to print
function prepareDistance(dist){
    dist = Math.round(dist);
    if(Math.floor(dist / 1000) == 0){
        return "<span flex>"+dist.toString()+"</span><span flex> meters</span>"
    }else{
        return "<span flex>"+(dist/1000).toString()+"</span><span flex> kilometers</span>"
    }
}
//put info window into map
function putInfo(geocoder, infoWindow, location, marker, map){
    geocoder.geocode({'location': location}, function(results, status) {
        if (status === 'OK') {
        if (results[0]) {
            infoWindow.setContent(printAddress(marker,results[0].formatted_address));
            infoWindow.open(map, marker);
        } else {
            window.alert('No results found');
        }
        } else {
        window.alert('Geocoder failed due to: ' + status);
        }
    });
}