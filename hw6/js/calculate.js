/* Manoj Malipeddu
email: Manoj_Malipeddu@student.uml.edu
Enrolled in GUI Programming I, COMP 4610
11/15/18
This holds a function to validate the values in the forms, and a function
that creates the html required for the multiplication table based on the
values in the forms.
*/
// Calls the validation function when submit values button is clicked
document.getElementById("submit").onclick = function() {validate()};

// Validate function
function validate() {
  // Variables
  var f = document.getElementById("forms"); // Variable for form element
  var mrl = document.getElementById("multiplierLow").value; // Gets string value of multiplier lower boundary from form
  var mrh = document.getElementById("multiplierHigh").value; // Gets string value of multiplier upper boundary from form
  var mdl = document.getElementById("multiplicandLow").value; // Gets string value of multiplicand lower boundary from form
  var mdh = document.getElementById("multiplicandHigh").value; // Gets string value of multiplicand upper boundary from form

  // Checks that mrl is not the empty string and is an integer
  if (!Number.isInteger(Number(mrl)) || mrl.trim().localeCompare("") == 0) {
    window.alert("Lower boundary for multiplier must be an integer.");
    document.getElementById("multiplierLow").value = "";
    return;
    // Checks that mrh is not the empty string and is an integer
  } else if(!Number.isInteger(Number(mrh)) || mrh.trim().localeCompare("") == 0) {
    window.alert("Upper boundary for multiplier must be an integer.");
    document.getElementById("multiplierHigh").value = "";
    return;
    // Checks that mdl is not the empty string and is an integer
  } else if(!Number.isInteger(Number(mdl)) || mdl.trim().localeCompare("") == 0) {
    window.alert("Lower boundary for multiplicand must be an integer.");
    document.getElementById("multiplicandLow").value = "";
    return;
    // Checks that mdh is not the empty string and is an integer
  } else if(!Number.isInteger(Number(mdh)) || mdh.trim().localeCompare("") == 0) {
    window.alert("Upper boundary for multiplicand must be an integer.");
    document.getElementById("multiplicandHigh").value = "";
    return;
    // Checks that multiplier lower bound is not greater than upper bound
  } else if(Number(mrl) > Number(mrh)) {
    window.alert("The upper bound of multiplier must be higher than the lower bound.");
    document.getElementById("multiplierLow").value = "";
    document.getElementById("multiplierHigh").value = "";
    return;
    // Checks that multiplicand lower bound is not greater than upper bound
  } else if(Number(mdl) > Number(mdh)) {
    window.alert("The upper bound of multiplicand must be higher than the lower bound.");
    document.getElementById("multiplicandLow").value = "";
    document.getElementById("multiplicandHigh").value = "";
    return;
    // Checks that the difference between params for multiplicand is not greater than 1000
    // This is done so the table will not be too large and crash the website
  } else if((Number(mdh) - Number(mdl)) > 1000) {
    window.alert("Please keep the difference between multiplicand boundaries under 1000.")
    document.getElementById("multiplicandHigh").value = "";
    document.getElementById("multiplicandLow").value = "";
    return;
    // Checks that the difference between params for multiplicand is not greater than 1000
    // This is done so the table will not be too large and crash the website
  } else if((Number(mrh) - Number(mrl)) > 1000) {
    window.alert("Please keep the difference between multiplier boundaries under 1000.")
    document.getElementById("multiplierHigh").value = "";
    document.getElementById("multiplierLow").value = "";
    return;
    // If there are no errors call createTable function with parameters
  } else {
    createTable(Number(mrl), Number(mrh), Number(mdl), Number(mdh));
  }
}

/* createTable function - creates html code for table, puts it in appropriate div
mrl - multiplier lower bound as a number
mrh - multiplier upper bound as a number
mdl - multiplicand lower bound as a number
mdh - multiplicand upper bound as a number*/
function createTable(mrl, mrh, mdl, mdh) {
  // Variables
  var tablehtml = "<table class=\"table table-bordered\"><thead class=\"thead-dark\"><tr><th scope=\"col\"></th>"; // String used to create table html
  var i,j; // Counter variables

  // Increment from mdl to mdh, add a table header for each value
  for (i = mdl; i <= mdh; i++){
    tablehtml+="<th scope=\"col\">" + i + "</th>";
  }

  // Close the table header section, open up the body section
  tablehtml+="</tr></thead><tbody>";

  // Outer for loop is to increment to each row
  for(i = mrl; i <= mrh; i++){
    // Make header for each row dark, make each one value i
    tablehtml+="<tr><th scope=\"row\" class=\"table-dark\">" + i + "</th>";
    // Inner for loop to increment each column
    for (j = mdl; j <= mdh; j++){
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
}
