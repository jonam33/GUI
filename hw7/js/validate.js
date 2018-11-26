/* Manoj Malipeddu
email: Manoj_Malipeddu@student.uml.edu
Enrolled in GUI Programming I, COMP 4610
11/25/18
This is how it validates the numbers. I couldn't figure out how
how to disable and enable the submit button so I left it enabled.
*/

$(function() {
  // Validator defaults, (get the error messages to stand out)
  $.validator.setDefaults({
    highlight: function(element) {
      $(element).closest(".form-group").addClass("bg-warning");
    },
    unhighlight: function(element) {
      $(element).closest(".form-group").removeClass("bg-warning");
    }
  });

  // Makes sure lower is less than or equal to upper
  $.validator.addMethod( "greater", function( lower, element, upper ) {
    var up = $(upper);

    return Number(lower) >= Number(up.val());
  }, "Please enter a greater value." );
  // Create the rules for each form input
  // greater checks that the lower bound is <= greater bound
  $("#forms").validate({
    rules: {
      multiplicandLow: {
        required: true,
        number: true,
      },
      multiplicandHigh: {
        required: true,
        number: true,
        greater: "#multiplicandLow",
      },
      multiplierLow: {
        required: true,
        number: true,
      },
      multiplierHigh: {
        required: true,
        number: true,
        greater: "#multiplierLow",
      }
    },
    // messages for inputs
    messages: {
      multiplicandLow: {
        required: "<b>Please make sure to enter a number</b>",
        number: "<b>Please enter a number, you have entered something else.</b>"
      },
      multiplicandHigh: {
        required: "<b>Please make sure to enter a number</b>",
        number: "<b>Please enter a number, you have entered something else.</b>",
        greater: "<b>Please make sure that this value is larger than the previous one.</b>",
      },
      multiplierLow: {
        required: "<b>Please make sure to enter a number</b>",
        number: "<b>Please enter a number, you have entered something else.</b>"
      },
      multiplierHigh: {
        required: "<b>Please make sure to enter a number</b>",
        number: "<b>Please enter a number, you have entered something else.</b>",
        greater: "<b>Please make sure that this value is larger than the previous one.</b>",
      }
    }
  });

  console.log($("#forms").valid());
});
