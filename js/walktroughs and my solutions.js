
$(function(){


  /*--- Get Data from API, pass it along in variable data and console log the whole array --*/
  $.getJSON('http://www.omdbapi.com/?s=Star%20Wars&r=json', function(data){
    console.log(data);
  });


  /*--- Alternative solution where Json is the 3rd parameter in the get function. Could also be replaced my xml  --*/
  $.get('http://www.omdbapi.com/?s=Star%20Wars&r=json', function(data){
    console.log(data);
  }, 'json')


  /*--- Creating variable out of the Search array and calling it --*/
  $.getJSON('http://www.omdbapi.com/?s=Star%20Wars&r=json', function(data){
    var myData = data.Search;
    console.log(myData[1].Title);
  });


  /*--- Show all the titles in the console. index = to index the array by numbers and value is variable: see here: https://api.jquery.com/each/ --*/
  $.getJSON('http://www.omdbapi.com/?s=Star%20Wars&r=json', function(data){
    var myData = data.Search;
    $.each(myData, function(index, value){
      console.log(value.Title);
    });
  });

  /*--- Get Part of the App - Must be separated from show data part of the app --*/
  $.getJSON('http://www.omdbapi.com/?s=Star%20Wars&r=json', function(data){
    showResults(data.Search);
  });


  $("#submit").on("click", function(e){
    e.preventDefault();
    var query = $("#submit").val();
    console.log(query);
  });


});


  /*--- Show Data Part of the App --*/
  function showResults(results){
    $.each(results, function(index,value){
      $("div").append(value.Title);
    });
  }

  /*--- Better way to do it more formatted --*/
   function showResults(results){
    var html = "";
    $.each(results, function(index,value){
      html += "<p>" + value.Title + "</p>";
    });
    $("#search-results").html(html);
  }




  /*--- Alternative way of writing with result first (similar to https://api.jquery.com/each/) --*/
    function showResults(results){
    $(results).each(function(index,value){
      $("div").append(value.Poster);
    });
  }
  



  /*--- My Solution with <li> to get data. See app.js to see Thinkfuls solution. It is probably industrie standard to use html --*/
$(function(){


  $("#submit").on("click", function(e){
    e.preventDefault();
    var userEntry = $("#query").val();
    $("#query").val("");
    console.log(userEntry);
    $.getJSON('http://www.omdbapi.com/?s='+userEntry+'&r=json', function(data){
      showResults(data.Search);
    })

  });


});


function showResults(results){
  $.each(results, function(index, value){
    $("ul").append("<li>" + value.Title + "</li>")
  });

};
