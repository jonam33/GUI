/* Manoj Malipeddu
email: Manoj_Malipeddu@student.uml.edu
Enrolled in GUI Programming I, COMP 4610
12/5/18
This javascript file validates inputs, outputs tables dynamically,
allows for the user of sliders to change the inputs and creates
a tab section to store tables.
*/

var index = 0;

// call functions when document is ready to initiate
$( document ).ready(function() {
  sliders();
  validate();
  validate_dynamically();
});

// validate form dynamically
function validate_dynamically() {
  // enables and disables button based on form validity
  if ($("#forms").valid() == true) {
    $("#submit").prop("disabled", false);
  } else {
    $("#submit").prop("disabled", true);
  }
  // checks if forms are valid, and if so creates table
  if ($("#forms").valid() == true) {
    $("#forms").submit(); // calls submitHandler
  }
}

function validate() {
  // Create the rules for each form input
  // required: there must be an input
  // number: input must be a number
  // min: lowest value of input
  // max: highest value of input
  $("#forms").validate({
    rules: {
      multiplicandFirst: {
        required: true,
        number: true,
        min: -25,
        max: 25
      },
      multiplicandSecond: {
        required: true,
        number: true,
        min: -25,
        max: 25
      },
      multiplierFirst: {
        required: true,
        number: true,
        min: -25,
        max: 25
      },
      multiplierSecond: {
        required: true,
        number: true,
        min: -25,
        max: 25
      }
    },
    // messages for error inputs
    messages: {
      multiplicandFirst: {
        required: "Make sure to enter a number.",
        number: "Must be a valid number.",
        min: "Number must be at least -25.",
        max: "Number must be less than or equal 25."
      },
      multiplicandSecond: {
        required: "Make sure to enter a number.",
        number: "Must be a valid number.",
        min: "Number must be at least -25.",
        max: "Number must be less than or equal 25."
      },
      multiplierFirst: {
        required: "Make sure to enter a number.",
        number: "Must be a valid number.",
        min: "Number must be at least -25.",
        max: "Number must be less than or equal 25."
      },
      multiplierSecond: {
        required: "Make sure to enter a number.",
        number: "Must be a valid number.",
        min: "Number must be at least -25.",
        max: "Number must be less than or equal 25."
      }
    },

    // if valid createTable is called
    submitHandler: function() {
      createTable();
      return false;
    },

    // if there is an error in the input, empty table and error div
    invalidHandler: function() {
      $("#error").empty();
      $("#table").empty();
    },

    // when user stops pressing a key, submit form
    // this is to dynamically update the table
    onkeyup: function(element, event) {
      validate_dynamically();
    },
  });
}

/* createTable function - creates html code for table, puts it in appropriate div*/
function createTable() {
  var f = document.getElementById("forms"); // Variable for form element
  var mrf = Number(document.getElementById("multiplierFirst").value); // Gets string value of multiplier lower boundary from form
  var mrs = Number(document.getElementById("multiplierSecond").value); // Gets string value of multiplier upper boundary from form
  var mdf = Number(document.getElementById("multiplicandFirst").value); // Gets string value of multiplicand lower boundary from form
  var mds = Number(document.getElementById("multiplicandSecond").value); // Gets string value of multiplicand upper boundary from form
  // Variables
  var tablehtml = "<table class=\"table table-bordered\"><thead class=\"thead-dark\"><tr><th scope=\"col\"></th>"; // String used to create table html

  $("#error").empty();
  if (mrf > mrs) {
    var temp;
    temp = mrs;
    mrs = mrf;
    mrf = temp;
  }
  if (mdf > mds) {
    var temp;
    temp = mds;
    mds = mdf;
    mdf = temp;
  }

  var i,j; // Counter variables
  // Increment from mdf to mds, add a table header for each value
  for (i = mdf; i <= mds; i++){
    tablehtml+="<th scope=\"col\">" + i + "</th>";
  }

  // Close the table header section, open up the body section
  tablehtml+="</tr></thead><tbody>";

  // Outer for loop is to increment to each row
  for(i = mrf; i <= mrs; i++){
    // Make header for each row dark, make each one value i
    tablehtml+="<tr><th scope=\"row\" class=\"table-dark\">" + i + "</th>";
    // Inner for loop to increment each column
    for (j = mdf; j <= mds; j++){
      // Add a table cell with value row * column
      tablehtml+="<td>" + (i*j) + "</td>";
    }
    // Close the table row element
    tablehtml+="</tr>";
  }

  // Close the table body and table
  tablehtml+="</tbody></table>";

  // Find the div for table and set it's inner html to tablehtml
  document.getElementById("table").innerHTML = tablehtml;

  return false;
}

// this creates the sliders
function sliders() {
  // found how to change slider to input from: https://stackoverflow.com/questions/12795307/jquery-ui-slider-change-value-of-slider-when-changed-in-input-field

  // slider for multiplicand first
  $("#slider_multiplicandFirst").slider({
    min: -25,
    max: 25,
    slide: function(event, ui) {
      $("#multiplicandFirst").val(ui.value);
      validate_dynamically();
    }
  });
  // if user inputs value change slider
  $("#multiplicandFirst").keyup(function() {
    $("#slider_multiplicandFirst").slider("value", $(this).val())
  });

  // slider for multiplicand second
  $("#slider_multiplicandSecond").slider({
    min: -25,
    max: 25,
    slide: function(event, ui) {
      $("#multiplicandSecond").val(ui.value);
      validate_dynamically();
    }
  });
  // if user inputs value change slider
  $("#multiplicandSecond").keyup(function() {
    $("#slider_multiplicandSecond").slider("value", $(this).val())
  });

  // slider for multiplier first
  $("#slider_multiplierFirst").slider({
    min: -25,
    max: 25,
    slide: function(event, ui) {
      $("#multiplierFirst").val(ui.value);
      validate_dynamically();
    }
  });
  // if user inputs value change slider
  $("#multiplierFirst").keyup(function() {
    $("#slider_multiplierFirst").slider("value", $(this).val())
  });

  // slider for multiplier second
  $("#slider_multiplierSecond").slider({
    min: -25,
    max: 25,
    slide: function(event, ui) {
      $("#multiplierSecond").val(ui.value);
      validate_dynamically();
    }
  });
  // if user inputs value change slider
  $("#multiplierSecond").keyup(function() {
    $("#slider_multiplierSecond").slider("value", $(this).val())
  });
  $("input")
}

// This function saves a new tab
// Got most of the code from: https://jqueryui.com/tabs/#manipulation
function save() {
  // makes sure there are no more than 10 current tabs
  var current_index = $("#tabs li").length;
  if (current_index > 9){
    $("#submit").prop("disabled", true);
    return false;
  }
  // get values from form
  var tabs = $("#tabs").tabs();
  var mrf = Number(document.getElementById("multiplierFirst").value); // Gets string value of multiplier lower boundary from form
  var mrs = Number(document.getElementById("multiplierSecond").value); // Gets string value of multiplier upper boundary from form
  var mdf = Number(document.getElementById("multiplicandFirst").value); // Gets string value of multiplicand lower boundary from form
  var mds = Number(document.getElementById("multiplicandSecond").value); // Gets string value of multiplicand upper boundary from form

  // reverse values if necessary
  if (mrf > mrs) {
    var temp;
    temp = mrs;
    mrs = mrf;
    mrf = temp;
  }
  if (mdf > mds) {
    var temp;
    temp = mds;
    mds = mdf;
    mdf = temp;
  }

  // creates html code for each tab
  var tabTitle = "Multiplier: " + mrf + " - " + mrs + " Multiplicand: " + mdf + " - " + mds;
  var tabContent = $("#table").html();
  var tabTemplate = "<li><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close' role='presentation'>Remove Tab</span></li>";
  var label = tabTitle,
  id = "tabs-" + index,
  li = $( tabTemplate.replace( /#\{href\}/g, "#" + id ).replace( /#\{label\}/g, label ) ),
  tabContentHtml = tabContent;

  // add tab and tab div in correct places
  tabs.find( ".ui-tabs-nav" ).append( li );
  tabs.append( "<div id='" + id + "'><p>" + tabContentHtml + "</p></div>" );
  tabs.tabs( "refresh" );
  index++;

  // Close icon: removing the tab on click
  tabs.on( "click", "span.ui-icon-close", function() {
    var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
    $( "#" + panelId ).remove();
    tabs.tabs( "refresh" );
    $("#submit").prop("disabled", false);
  });

  tabs.on( "keyup", function( event ) {
    if ( event.altKey && event.keyCode === $.ui.keyCode.BACKSPACE ) {
      var panelId = tabs.find( ".ui-tabs-active" ).remove().attr( "aria-controls" );
      $( "#" + panelId ).remove();
      tabs.tabs( "refresh" );
    }
  });
}

// This function deletes all tabs and enables the submit button
// I got this from: https://stackoverflow.com/questions/721927/empty-jquery-ui-tabs
function deleteTabs() {
  $("div#tabs ul li").remove();
  $("div#tabs div").remove();
  $("div#tabs").tabs("refresh");
  $("#submit").prop("disabled", false);
  index = 0;
}
