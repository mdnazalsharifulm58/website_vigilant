(function($) {
  'use strict';

  function initialize() {

    var mobile = 320;

    var windowWidth = window.innerWidth;

    //replace these variables with you new numbers
    var latitude = 33.9195276,
      longitude = -84.3493754;

    var loc1 = new google.maps.LatLng(latitude,longitude);

    //define the basic color of your map, plus a value for saturation and brightness
    var main_color = '#453600',
      saturation_value= -20,
      brightness_value= 5;

    //we define here the style of the map
    var styles= [
      {
        //set saturation for the labels on the map
        elementType: "labels",
        stylers: [
          {saturation: saturation_value}
        ]
      },
      {   //poi stands for point of interest - don't show these lables on the map
        featureType: "poi",
        elementType: "labels",
        stylers: [
          {visibility: "off"}
        ]
      },
      {
        //don't show highways lables on the map
        featureType: 'road.highway',
        elementType: 'labels',
        stylers: [
          {visibility: "off"}
        ]
      },
      {
        //don't show local road lables on the map
        featureType: "road.local",
        elementType: "labels.icon",
        stylers: [
          {visibility: "off"}
        ]
      },
      {
        //don't show arterial road lables on the map
        featureType: "road.arterial",
        elementType: "labels.icon",
        stylers: [
          {visibility: "off"}
        ]
      },
      {
        //don't show road lables on the map
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [
          {visibility: "off"}
        ]
      },
      //style different elements on the map
      {
        featureType: "transit",
        elementType: "geometry.fill",
        stylers: [
          { hue: main_color },
          { visibility: "on" },
          { lightness: brightness_value },
          { saturation: saturation_value }
        ]
      },
      {
        featureType: "poi",
        elementType: "geometry.fill",
        stylers: [
          { hue: main_color },
          { visibility: "on" },
          { lightness: brightness_value },
          { saturation: saturation_value }
        ]
      },
      {
        featureType: "poi.government",
        elementType: "geometry.fill",
        stylers: [
          { hue: main_color },
          { visibility: "on" },
          { lightness: brightness_value },
          { saturation: saturation_value }
        ]
      },
      {
        featureType: "poi.sport_complex",
        elementType: "geometry.fill",
        stylers: [
          { hue: main_color },
          { visibility: "on" },
          { lightness: brightness_value },
          { saturation: saturation_value }
        ]
      },
      {
        featureType: "poi.attraction",
        elementType: "geometry.fill",
        stylers: [
          { hue: main_color },
          { visibility: "on" },
          { lightness: brightness_value },
          { saturation: saturation_value }
        ]
      },
      {
        featureType: "poi.business",
        elementType: "geometry.fill",
        stylers: [
          { hue: main_color },
          { visibility: "on" },
          { lightness: brightness_value },
          { saturation: saturation_value }
        ]
      },
      {
        featureType: "transit",
        elementType: "geometry.fill",
        stylers: [
          { hue: main_color },
          { visibility: "on" },
          { lightness: brightness_value },
          { saturation: saturation_value }
        ]
      },
      {
        featureType: "transit.station",
        elementType: "geometry.fill",
        stylers: [
          { hue: main_color },
          { visibility: "on" },
          { lightness: brightness_value },
          { saturation: saturation_value }
        ]
      },
      {
        featureType: "landscape",
        stylers: [
          { hue: main_color },
          { visibility: "on" },
          { lightness: brightness_value },
          { saturation: saturation_value }
        ]

      },
      {
        featureType: "road",
        elementType: "geometry.fill",
        stylers: [
          { hue: main_color },
          { visibility: "on" },
          { lightness: brightness_value },
          { saturation: saturation_value }
        ]
      },
      {
        featureType: "road.highway",
        elementType: "geometry.fill",
        stylers: [
          { hue: main_color },
          { visibility: "on" },
          { lightness: brightness_value },
          { saturation: saturation_value }
        ]
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [
          { hue: main_color },
          { visibility: "on" },
          { lightness: brightness_value },
          { saturation: saturation_value }
        ]
      }
    ];


    var mapOptions = {
      center: loc1,
      zoom: 15,
      draggable: true,
      scrollwheel: false,
      panControl: false,
      streetViewControl: true,
      zoomControl: true,
      minZoom: 10,
      styles: styles
    };

    var map = new google.maps.Map(document.getElementById('sv-google-map'),
      mapOptions);


    var marker1 = new google.maps.Marker({
      position: loc1,
      map: map,
      animation: google.maps.Animation.DROP,
      visible: true
    });

    function toggleBounce() {
      if (marker1.getAnimation() !== null) {
        marker1.setAnimation(null);
      } else {
        marker1.setAnimation(google.maps.Animation.BOUNCE);
      }
    }

    //Set active on load
    function activeLoad(){

      setTimeout(function(){
        myOffice.open(map,marker1);
        map.panTo(loc1);
      }, 1800);

    }

    function buildLat( location ){
      var myLocation = location.G;
      myLocation += "," + location.K;

      var myLink = "https://maps.google.com?saddr=Current+Location&daddr=" + myLocation;

      return myLink;
    }

    if(windowWidth <= mobile){
      //no modal popup on mobile

    }else{

      // INFO WINDOWS - POPUP MODAL
      // Edit Office Location
      var officeDetails = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h1 id="firstHeading" class="firstHeading">The Shave</h1>'+
        '<div id="bodyContent">'+
        '<p>2355 Two Bits St.' +
        '<br>Grooming, CA 30003</p>'+
        '<a class="tel" href="tel:123-456-7890">123.456.7890</a>'+
        '<a class="btn book-now-btn get-directions" href="' + buildLat(loc1) + '" target="_blank">Get Directions</a>'+
        '</div>'+
        '</div>';


      var myOffice = new google.maps.InfoWindow({
        content: officeDetails
      });

      google.maps.event.addListener(marker1, 'click', function() {
        toggleBounce();
        myOffice.open(map,marker1);
      });

      activeLoad();

    }

  }

  google.maps.event.addDomListener(window, 'load', initialize);

})(jQuery);

