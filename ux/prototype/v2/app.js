var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('google-maps'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8,
    styles: [
        {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
        {
          featureType: 'administrative.locality',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [{color: '#263c3f'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [{color: '#6b9a76'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{color: '#38414e'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [{color: '#212a37'}]
        },
        {
          featureType: 'road',
          elementType: 'labels.text.fill',
          stylers: [{color: '#9ca5b3'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{color: '#746855'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [{color: '#1f2835'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'labels.text.fill',
          stylers: [{color: '#f3d19c'}]
        },
        {
          featureType: 'transit',
          elementType: 'geometry',
          stylers: [{color: '#2f3948'}]
        },
        {
          featureType: 'transit.station',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{color: '#17263c'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [{color: '#515c6d'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.stroke',
          stylers: [{color: '#17263c'}]
        }
      ]
  });
}

if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(function (location) {
        map.setCenter(new google.maps.LatLng(location.coords.latitude, location.coords.longitude))
    });
} else {
    console.log('Geolocation API not supported.');
}
window.onload = function(){
    var carousel = document.getElementById('main-carousel');
    var cellButtonGroup = document.getElementById('footer-navigation');
    console.log(cellButtonGroup.children);
}

let infoShow = {
  0: false,
  1: false,
  2: false
}

const buttonClick = (event, i) => {
  infoShow[i] = !infoShow[i];
  console.log(event)
  if(infoShow[i]){
    event.style.height="100%";
    event.children[1].style.display="block";
    event.children[0].style.display="none";
    event.children[3].style.display="block";
  } else {
    event.style.height="33%";
    event.children[0].style.display="block";
    event.children[1].style.display="none";
    event.children[3].style.display="none";
  }
}



// var $carousel = $('.carousel').flickity({
//     prevNextButtons: false,
//     pageDots: false
//   });
//   // Flickity instance
//   var flkty = $carousel.data('flickity');
//   // elements
//   var $cellButtonGroup = $('.button-group--cells');
//   var $cellButtons = $cellButtonGroup.find('.button');
  
//   // update selected cellButtons
//   $carousel.on( 'select.flickity', function() {
//     $cellButtons.filter('.is-selected')
//       .removeClass('is-selected');
//     $cellButtons.eq( flkty.selectedIndex )
//       .addClass('is-selected');
//   });
  
//   // select cell on button click
//   $cellButtonGroup.on( 'click', '.button', function() {
//     var index = $(this).index();
//     $carousel.flickity( 'select', index );
//   });
//   // previous
//   $('.button--previous').on( 'click', function() {
//     $carousel.flickity('previous');
//   });
//   // next
//   $('.button--next').on( 'click', function() {
//     $carousel.flickity('next');
//   });
  
  