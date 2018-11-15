document.getElementById("submit").onclick = function() {validate()};
function validate() {
  var f = document.getElementById("forms");
  var mrl = document.getElementById("multiplierLow").value;
  var mrh = document.getElementById("multiplierHigh").value;
  var mdl = document.getElementById("multiplicandLow").value;
  var mdh = document.getElementById("multiplicandHigh").value;
  if (!Number.isInteger(Number(mrl)) || mrl.localeCompare("") == 0) {
    window.alert("Lower boundary for multiplier must be an integer.");
    document.getElementById("multiplierLow").value = "";
    return;
  } else if(!Number.isInteger(Number(mrh)) || mrh.localeCompare("") == 0) {
    window.alert("Upper boundary for multiplier must be an integer.");
    document.getElementById("multiplierHigh").value = "";
    return;
  } else if(!Number.isInteger(Number(mdl)) || mdl.localeCompare("") == 0) {
    window.alert("Lower boundary for multiplicand must be an integer.");
    document.getElementById("multiplicandLow").value = "";
    return;
  } else if(!Number.isInteger(Number(mdh)) || mdh.localeCompare("") == 0) {
    window.alert("Upper boundary for multiplicand must be an integer.");
    document.getElementById("multiplicandHigh").value = "";
    return;
  } else if(Number(mrl) > Number(mrh)) {
    window.alert("The upper bound of multiplier must be higher.");
    document.getElementById("multiplierHigh").value = "";
    return;
  } else if(Number(mdl) > Number(mdh)) {
    window.alert("The upper bound of multiplicand must be higher.");
    document.getElementById("multiplicandHigh").value = "";
    return;
  } else if((Number(mdh) - Number(mdl)) > 1000) {
    window.alert("Please keep the difference between multiplicand boundaries under 1000.")
    document.getElementById("multiplicandHigh").value = "";
    document.getElementById("multiplicandLow").value = "";
    return;
  } else if((Number(mrh) - Number(mrl)) > 1000) {
    window.alert("Please keep the difference between multiplier boundaries under 1000.")
    document.getElementById("multiplierHigh").value = "";
    document.getElementById("multiplierLow").value = "";
    return;
  } else {
    createTable(Number(mrl), Number(mrh), Number(mdl), Number(mdh));
  }
}
function createTable(mrl, mrh, mdl, mdh) {
  var tablehtml = "<table class=\"table table-bordered\"><thead class=\"thead-dark\"><th scope=\"col\"></th>";
  var i,j;

  for (i = mdl; i <= mdh; i++){
    tablehtml+="<th scope=\"col\">" + i + "</th>";
  }
  tablehtml+="</tr></thead><tbody>";
  for(i = mrl; i <= mrh; i++){
    tablehtml+="<tr><th scope=\"row\" class=\"table-dark\">" + i + "</th>";
    for (j = mdl; j <= mdh; j++){
      tablehtml+="<td>" + (i*j) + "</td>";
    }
    tablehtml+="</tr>";
  }
  tablehtml+="</tbody></table>";
  document.getElementById("table").innerHTML = tablehtml;
  document.getElementById("footer").style.bottom = "0px";
}
