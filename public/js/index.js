// .NAME 
//  index.js
// .WHAT
//  Front-end logic for index.hbs page
///////////////////////////////////////////////////////////////////////////////
$( document ).ready( function() {
  // when user clicks "Search" button under "Location" dropdown:
  $("#location-search").on("click", function(event) {
    event.preventDefault();
    //Get the value in the search input text field:
    var locationSearch = $("#locationSearchTerm").val().trim();
    $("#locSearchTermTxt").text(locationSearch);
    //Make the ajax call to call the "/location/:location-string" route:
    $.get("/locfilter/"+ locationSearch).then(function(data) {
      console.log ("/"+locationSearch+" called.");
      $("#eaterData").html(data);
    });
  });

  // when user clicks "Clear Filter" button under "Location" dropdown:
  $("#location-clear").on("click", function(event) {
    event.preventDefault();
    //Get the value in the search input text field:
    $("#locationSearchTerm").val("");
    $("#locSearchTermTxt").text("");
  });


  console.log ("index.js loaded."); 
});


