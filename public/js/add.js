// when user clicks add-btn
$("#add-btn").on("click", function(event) {
  event.preventDefault();

  // make a newProfile obj
  var newProfile = {
    // name from name input
    name: $("#name").val().trim(),
    // bio from bio input
    bio: $("#bio").val().trim(),

    //location from location input
    location: $("#location").val().trim(),

    // restaurant1 from restaurant1 input
    restaurant1: $("#restaurant1").val().trim(),
    // restaurant2 from restaurant2 input
    restaurant2: $("#restaurant2").val().trim(),
    // restaurant3 from restaurant3 input
    restaurant3: $("#restaurant3").val().trim(),
    // points from emailContact input
    email: $("#emailContact").val().trim()
  };

  // send an AJAX POST-request with jQuery
  $.post("/api/new", newProfile)
    // on success, run this callback
    .then(function(data) {
      // log the data we found
      console.log(data);
      window.location = data.redirectUrl;
      // tell the user we're adding a Profile with an alert window
      //alert("Adding Profile...");
      
    });

  // empty each input box by replacing the value with an empty string
  $("#name").val("");
  $("#bio").val("");
  $("#restaurant1").val("");
  $("#restaurant2").val("");
  $("#restaurant3").val("");
  $("#emailContact").val("");
  //console.log(this + "its working");


});
