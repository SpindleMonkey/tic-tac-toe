console.log("ready. set. go.");

var xIsCurrent;

var numMoves;

//each sub-array contains the indices for a winning board
var winningBoards = [
  [0, 4, 8],
  [2, 4, 6],
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8]
];

// flat representation of the tic-tac-toe gameboard
// the indices will be used to check for a winner
// if a cell has an x, currentBoard = 1
// if a cell has an 0, currentBoard = -1
// the initial board has all elements = 0
var currentBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0];

var gameStatus = [0, 0, 0, 0, 0, 0, 0, 0];

function initBoard() {
  xIsCurrent = true;

  numMoves = 0;

  // clear all cells of the game board, as well as
  // all cells of the currentBoard
  for (var i = 0; i < currentBoard.length; i++) {
    cell = document.getElementById('square' + i);
    cell.removeAttribute("className");
    cell.textContent = "";
    cell.style.background = "rgba(0, 136, 136, .2)";
    currentBoard[i] = 0;
  }

  for (var j = 0; j < gameStatus.length; j++) {
    gameStatus[j] = 0;
  }

  if (!gameboard.hasAttribute("hasEvent")) {
    gameboard.addEventListener('click', makeMove);
    gameboard.setAttribute("hasEvent", true);
  }
}


function updateGameStatus(player) {
  // there are 8 possible winning boards:
  // - the 2 diagonals
  // - the 3 verticals
  // = the 3 horizontals
  // gameStatus is an array showing status of the 8
  // possibilities; if any of the 8 combos produces
  // a sum of 3 or -3, we have a winner (3: x; -3: o)
  for (var i = 0; i < gameStatus.length; i++) {
    gameStatus[i] = 0;
    for (var j = 0; j < winningBoards[i].length; j++) {
      gameStatus[i] += currentBoard[winningBoards[i][j]];
    }
    if (gameStatus[i] === 3 * player)
      return true;
  }
  return false;
}

function isWinner() {
  // update game status
  var player = xIsCurrent ? 1 : -1;
  var winner = updateGameStatus(player);

  return winner;
}

function makeMove(event) {
  var myId = document.getElementById(event.srcElement.id);
  var cellNumber = event.srcElement.id[6];
  if (myId.hasAttribute("className")) {
    // this cell has already been used!
    alert("nope.");
  } else {
    numMoves++;

    if (xIsCurrent) {
      myId.setAttribute("className", "xOwnsThis");
      myId.textContent = 'x';

      currentBoard[cellNumber] = 1;
    } else {
      myId.setAttribute("className", "oOwnsThis");
      myId.textContent = 'o';

      currentBoard[cellNumber] = -1;
    }
    //myId.style.background = "rgba(0, 136, 136, .4)";


    if (isWinner()) {
      alert("you did it! woohoo!");
      removeEvent();
    } else if (numMoves === 9) {
      alert("no winner this time!");
      gameboard.removeEventListener('click', makeMove);
    } else {
      xIsCurrent = !xIsCurrent;
    }
  }
}

function removeEvent() {
  if (gameboard.hasAttribute("hasEvent")) {
    gameboard.removeEventListener('click', makeMove);
    gameboard.removeAttribute("hasEvent");
  }
}

// set up the event listener for the 'clear board' button so we can reset/restart the game
var clearBoard = document.getElementById('clear');
clearBoard.addEventListener('click', initBoard);

// now set up the event listener for the gameboard (listening to the full table)
// note: the addEventListener call is made in initBoard, since we remove and re-add
// the event listener to signal end/beginning of game
var gameboard = document.getElementById('gameboard');

// Initialize the game (clear the board, set the first move to X)
initBoard();


// we're ready to play!