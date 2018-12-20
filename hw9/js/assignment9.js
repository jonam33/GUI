/* Manoj Malipeddu
email: Manoj_Malipeddu@student.uml.edu
Enrolled in GUI Programming I, COMP 4610
12/19/18
This javascript file holds the functions to play scrabble.
*/
var activetiles = 0;
var total_score = 0;
var word = new Array(8); //the board where you put the tiles. this is for tracking the word
var scores = [];

// when document is ready
$(document).ready(function () {
  resetScores();    // set scores array
  populateBoard();  // randomly populates the board with tiles
  JQueryDragDrop(); // initializes the draggables and droppables
  printTileCount(); // print table of tile count
});

// submit a word
function submitWord(){
  // add to total score
  total_score += parseInt($("#score").html());
  // print total score
  $("#totalscore").html("Total Score: " + total_score);
  // reset board and get new tiles
  populateBoard();
  printTileCount();
  enableDroppables();
  word = new Array(8);
  $("#score").html(0);
  $("#word").html("Current Word: ");
  activetiles = 7;
}

// calculates score of current word each time tile is dropped
function updateScore(word) {
  var totalScore = 0;
  var scoreToAdd = 0;
  var doublescore = 0;
  // look through the array
  for (var i = 0; i < word.length; i++) {
    // find the letter in the scores array
    for (var j = 0; j < scores.length; j++) {
      // if there is a letter at i
      if (word[i] != "" && (word[i] == scores[j].letter)) {
        // double value if i = 2 or 5
        if (i == 2 || i == 5) {
          doublescore += 2;
          totalScore += scores[j].score;
        }
        // otherwise add score
        else {
          totalScore += scores[j].score;
        }
      }
    }
  }
  // if players uses doublescore tile
  if(doublescore != 0)
  {
    totalScore = totalScore * doublescore;
  }
  //put it in the score div
  $("#score").html(totalScore.toString());
}

// draggable and droppable
function JQueryDragDrop() {

  // Doesn't work without this, not sure why
  function Letters(event, ui) {
  }

  // letters can snap to board, revert if not dropped correctly
  $(".letters").draggable({snap: ".board", snapMode: "inner", revert: 'invalid'});

  // update current word when dragged
  function Drag(event, ui) {
    if (ui.draggable.attr("id") == word[$(this).attr("id")]) {
      word[$(this).attr("id")] = "";
    }
    updateWord(word);
  }

  // make board droppable
  $(".board").droppable({accept: '.letters', drop: Drop, out: Drag});

  // when letter tile is dropped
  function Drop(event, ui) {
    var letter = ui.draggable.prop('id');            // get letter of dropped tile
    var element = $(this).attr("id");                // get tile element
    var number = parseInt(element);                  // get value of tile
    ui.draggable.draggable({disabled: true});        // disable tile after dropping it
    $(this).droppable("option", "disabled", true);   // disable board spot that tile was dropped on
    activetiles--;                                   // decrease amount of active tiles
    word[number] = letter;
    updateWord(word);
  }
}

// reset game if user wants
function newGame()
{
  restart();
  printTileCount();
}

// put new tiles on board
function populateBoard() {
  var letter;
  var random;
  var newcount = 7 - activetiles;

  // remove tiles on board currently
  clearBoard();
  // make sure there are 7 letter tiles
  for (var i = 0; i < newcount; i++) {
    // random letter
    random = Math.floor((Math.random() * 25));
    // check if there are no more of that letter
    if (scores[random].amount != 0) {
      // get letter
      letter = scores[random].letter;
      // add new tile
      $("#rack").append(" <img id=\"" + letter + "\" class=\"letters\" src=\"images/" + letter + ".jpg\">");
      // increase number of tiles
      activetiles++;
      // decrease from count of overall tiles
      decreaseAmount(letter);
    } else {
      i--;
    }
  }
  // refresh the draggable code
  JQueryDragDrop();
}

// clears the board
function clearBoard() {
  for (var i = 0; i <= word.length; i++) {
    // remove tiles on board if they exist
    if (typeof word[i] !== 'undefined') {
      $("#" + word[i]).remove();
    }
  }
}

// updates word
function updateWord(varDraggableId) {
  var currentword = "";
  // update word to what is on the board
  for (var i = 0; i < varDraggableId.length; i++) {
    if (typeof varDraggableId[i] !== 'undefined') {
      currentword += varDraggableId[i];
    }
  }
  // if there is currently a word
  if (currentword) {
    $("#word").html("Current Word: " + currentword);
    updateScore(word);
  }
}

// restart the game
function restart()
{
  resetScores();             // reset scores array
  $('.letters').remove();    // remove letter tiles
  word = new Array(8);       // reset word array
  activetiles = 0;           // reset active tiles
  total_score = 0;           // reset total score
  populateBoard();           // populate board with new letters

  //refresh the draggable code
  JQueryDragDrop();

  // reset text in other divs
  $("#score").html("0");
  $("#word").html("Current Word: ");
  $("#totalscore").html("Total Score: 0");
}

// prints a table with the current tile count
function printTileCount() {
  var string = "<table class=\"table table-bordered\"><thead class=\"thead-dark\"><tr><th scope=\"col\"></th>";
  for (i = 0; i < 26; i++) {
    string += "<th scope=\"col\">" + scores[i].letter + "</th>";
  }
  string += "</tr></thead><tbody>";
  string += "<tr><th scope=\"row\">Amount</th>";
  for (i = 0; i < 26; i++) {
    string += "<td>" + scores[i].amount + "</td>";
  }
  string += "</tr></tbody></table>";
  $("#tilecount").html(string);
}

// resets the score array to original value
function resetScores() {
  scores = [
    {"letter": "A", "score": 1, "amount": 9},
    {"letter": "B", "score": 3, "amount": 2},
    {"letter": "C", "score": 3, "amount": 2},
    {"letter": "D", "score": 2, "amount": 4},
    {"letter": "E", "score": 1, "amount": 12},
    {"letter": "F", "score": 4, "amount": 2},
    {"letter": "G", "score": 2, "amount": 3},
    {"letter": "H", "score": 4, "amount": 2},
    {"letter": "I", "score": 1, "amount": 9},
    {"letter": "J", "score": 8, "amount": 1},
    {"letter": "K", "score": 5, "amount": 1},
    {"letter": "L", "score": 1, "amount": 4},
    {"letter": "M", "score": 3, "amount": 2},
    {"letter": "N", "score": 1, "amount": 5},
    {"letter": "O", "score": 1, "amount": 8},
    {"letter": "P", "score": 3, "amount": 2},
    {"letter": "Q", "score": 10, "amount": 1},
    {"letter": "R", "score": 1, "amount": 6},
    {"letter": "S", "score": 1, "amount": 4},
    {"letter": "T", "score": 1, "amount": 6},
    {"letter": "U", "score": 1, "amount": 4},
    {"letter": "V", "score": 4, "amount": 2},
    {"letter": "W", "score": 4, "amount": 2},
    {"letter": "X", "score": 8, "amount": 1},
    {"letter": "Y", "score": 4, "amount": 2},
    {"letter": "Z", "score": 10, "amount": 1}
  ]
}

// decrease amount remaining when a tile is generated
function decreaseAmount(letter) {
  for (i = 0; i < scores.length; i++) {
    if (scores[i].letter === letter) {
      scores[i].amount--;
    }
  }
}

// reenable board after new tiles are brought on
function enableDroppables() {
  for (i = 0; i < 8; i++) {
    $("#" + i).droppable("option", "disabled", false);
  }
}
