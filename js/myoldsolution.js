
$(function(){



  /*--- GET USER INPUT --*/
  $('#search-term').submit(function(event){
    event.preventDefault();
    searchTerm = $('#query').val();
    getRequest(searchTerm);
    $('#query').val('');
  });


});



/*--- PROCESS DATA FOR SEARCH TERM --*/
function getRequest(searchTerm){
  var params = {
    zip: searchTerm,
    radius: "10",
    order: "members",
    key: '661c4a3330618024684c2867765ee14',
  };
  url = 'https:/api.meetup.com/find/groups?callback=?';

  $.getJSON(url, params, function(data){
    console.log(data.data[0]);
    showResults(data.data);
  });
}

var x = 40.698446;
var y = -73.782097;


/*--- SHOW RESULTS: --*/
function showResults(results){
  $("li").remove();
  $.each(results, function(index, value){
    $("ul").append("<li>" + value.lat + value.lon + "</li>")
    setMarker(value.lat, value.lon, value.name, value.description, value);
  });
};


var map;
var marker;
var infowindow;


  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 40.698446, lng: -73.782097},
      zoom: 8
    });

    marker = new google.maps.Marker({
      position: {lat: x, lng: y},
      map: map,
      title: 'Hello World!'
    });
  }



  function setMarker(lat, lng, name, description, value) {
      marker = new google.maps.Marker({
        position: {lat: lat, lng: lng},
        map: map,
        title: name
      });

      var contentString = description;
      console.log(value.length);

        var infowindow = new google.maps.InfoWindow({
            content: contentString,
            maxWidth: 600,
            maxHeight: 50,
        });


        marker.addListener('click', function() {
            infowindow.open(map, marker);
        });


  }



/*
use getPosition()
*/