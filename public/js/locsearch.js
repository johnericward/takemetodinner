// .NAME
//  locsearch.js
// .WHAT
//  Autocomplete Javascript front-end logic for Location Search.
///////////////////////////////////////////////////////////////////////////////
$( document ).ready( function() {

  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt !== x[i] && elmnt !== inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) {
      return false;
    }
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) {
      currentFocus = 0;
    }
    if (currentFocus < 0) {
      currentFocus = (x.length - 1);
    }
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function() {
      var a, b, val = this.value;
      //console.log (`val is ${val}`);
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) {
        return false;
      }
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /* Make the ajax call to the api to get the city names that matched the current value (stored in val). */
      /* The data received from the api is an array of city objects, the city names are pushed into array    */
      /* arr[] */
      var queryURL = "http://geodb-free-service.wirefreethought.com/v1/geo/cities?limit=5&offset=0&namePrefix=" + val;

      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        var results=response.data;
        var regionString = "";
        for (var i = 0; i < results.length; i++) {
          console.log (`region is ${results[i].region}`);
          if (typeof results[i].region === "undefined") {
            regionString = "";
          } else {
            regionString = ", " + results[i].region;
          }
          arr.push(results[i].city + regionString );
        }
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if (arr[i].substr(0, val.length).toUpperCase() === val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
            b.addEventListener("click", function() {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
                        (or any other open lists of autocompleted values:*/
              closeAllLists();
            });
            a.appendChild(b);
          }
        }
      }).catch(function(error) {
        console.log (error);
      });

    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) {
        x = x.getElementsByTagName("div");
      }
      if (e.keyCode === 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode === 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode === 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
        /*and simulate a click on the "active" item:*/
          if (x) {
            x[currentFocus].click();
          }
        }
      }
    });

    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
      closeAllLists(e.target);
    });
  }

  var cityNames = []; // Pass empty array.  It will be filled dynamically in the function.
  autocomplete(document.getElementById("location"), cityNames);

});


