$(function(){
    /*---------------------------------------------------------------------------------
    Get user input, convert into geocode lat & lon and fire getRequest from Meetup API
    ---------------------------------------------------------------------------------*/
    $('#search-term').submit(function(event){
      event.preventDefault();
      searchTerm = $('#query').val();
      var geocoder =  new google.maps.Geocoder();
      geocoder.geocode( { 'address': searchTerm}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          var latLocation = (results[0].geometry.location.lat());
          var lonLocation = (results[0].geometry.location.lng());
          getRequest(latLocation, lonLocation);
        } else {
          alert("Please use a valid city name.");
        }
      });
      $('#query').val('');
    });
    /*---------------------------------------------------------------------------------
        Show Overlay when Info is clicked
    ---------------------------------------------------------------------------------*/
    $("#info").on("click", function(){
      $("#infoOverlay").show();
      $("#map").hide();
      $(".searchWrapper").hide();
    })
    /*---------------------------------------------------------------------------------
        Show Map Window when Got it is clicked
    ---------------------------------------------------------------------------------*/
    $("#gotit").on("click", function(){
      $("#infoOverlay").hide();
      $(".searchWrapper").show();
      $("#map").show();
      initMap();
    })
});   /* End of document ready */


/*---------------------------------------------------------------------------------
    INITMAP TO LEAD GOOGLE MAP CENTERED ON WORLD
---------------------------------------------------------------------------------*/
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 0, lng: 0},
      zoom: 3
    });
}


/*---------------------------------------------------------------------------------
    GET REQUEST FUNCTION TO GET GROUP DATA FROM MEETUP API
---------------------------------------------------------------------------------*/
function getRequest(latLocation, lonLocation){
  var params = {
    lat: latLocation,
    lon: lonLocation,
    radius: "10",
    order: "members",
    key: '661c4a3330618024684c2867765ee14',
  };
  url = 'https://api.meetup.com/find/groups?callback=?';

  $.getJSON(url, params, function(data){
    LoadMap(data.data);
  });
}


/*---------------------------------------------------------------------------------
    LOAD MAP FUNCTION TO DISPLAY MARKERS AND INFOWINDOWS ON THE MAP
---------------------------------------------------------------------------------*/
function LoadMap(markers) {
  //Check for empty markers and display alert
  if (markers == false) {
    alert("Please use a valid city name.");
  } else {
    //Create variable mapOptions to center on the queried city
    var mapOptions = {
      center: new google.maps.LatLng(markers[0].lat, markers[0].lon),
      zoom: 10,
      MapTypeId: google.maps.MapTypeId.ROADMAP
    };
    
    //Create variable map to display the Map in the DOM
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
   
    //Create and open InfoWindow
    var infoWindow = new google.maps.InfoWindow();

    //Conditional to check if US/GB/CA and then either display markers from API or show link to Meetup
    if (markers[0].country == "US" || markers[0].country == "GB" || markers[0].country == "CA") {
      //loop to create markers & info window
      for (var i = 0; i < markers.length; i++) {
        var data = markers[i];
        var myLatlng = new google.maps.LatLng(data.lat, data.lon);
        var marker = new google.maps.Marker({
          position: myLatlng,
          map: map,
          title: data.name
        });
        //Function to set the content of infowindow when a marker is clicked
        function infoWindows(marker, data) {
          //Event listener for when a marker i clicked
          google.maps.event.addListener(marker, "click", function (e) {
            //Wrap the content inside an HTML DIV in order to set height and width of InfoWindow.
            infoWindow.setContent("<div id='infodisplay' style = 'max-height:300px'>" + '<p style="font-size: 1.5em; text-decoration: underline;"><strong><a href="' + data.link + '" target="blank">' + data.name + '</a></strong></p>' + "<br><p>" + data.description + "</p></div>");
            //Open the markers infowindow
            infoWindow.open(map, marker);
          });
        };
        //Call the previous infowindow function and pass the marker and data variables inside
        infoWindows(marker, data);
      }
    //For other countries than US/GB/CA 
    } else {
      //loop to create markers & info window
      for (var i = 0; i < markers.length; i++) {
        var data = markers[i];
        var myLatlng = new google.maps.LatLng(data.lat, data.lon);
        var marker = new google.maps.Marker({
          position: myLatlng,
          map: map,
          title: data.name
        });
        //Function to set the content of infowindow when a marker is clicked
        function infoWindows(marker, data) {
          //Event listener for when a marker i clicked        
          google.maps.event.addListener(marker, "click", function (e) {
            //Wrap the content inside an HTML DIV in order to set height and width of InfoWindow.
            infoWindow.setContent("<div id='infodisplay' style = 'max-height:300px'>" + "<p style='font-size: 1.5em; text-color: red;'><strong>Meetup only supports location accuracy by zip code within the USA, Canda and GB</strong></p><br><p style='font-size: 18px;'>Here is a list of all the Meetups in the city of " + data.city + ':' + '</p><br><a style="font-size: 18px;" href="http://www.meetup.com/cities/'+data.country+'/'+data.city+'" target="blank">List of all Meetups in '+data.city+'</a></div>');
            //Open the markers infowindow
            infoWindow.open(map, marker);
          });
        };
        //Call the previous infowindow function and pass the marker and data variables inside
        infoWindows(marker, data);
      }
    }
  }
}

