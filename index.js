
  let SudokuSolver = function () {
    let solver;
  
    // PUBLIC FUNCTIONS
    function solve(boardString) {
      let boardArray = boardString.split("");
      if (boardIsInvalid(boardArray)) {
        return false;
      }
      return recursiveSolve(boardString);
    }
  
    function solveAndPrint(boardString) {
      let solvedBoard = solve(boardString);
      console.log(toString(solvedBoard.split("")));
      return solvedBoard;
    }
  
    function recursiveSolve(boardString) {
      let boardArray = boardString.split("");
      if (boardIsSolved(boardArray)) {
        return boardArray.join("");
      }
      let cellPossibilities = getNextCellAndPossibilities(boardArray);
      let nextUnsolvedCellIndex = cellPossibilities.index;
      let possibilities = cellPossibilities.choices;
      for (let i = 0; i < possibilities.length; i++) {
        boardArray[nextUnsolvedCellIndex] = possibilities[i];
        let solvedBoard = recursiveSolve(boardArray.join(""));
        if (solvedBoard) {
          return solvedBoard;
        }
      }
      return false;
    }
  
    function boardIsInvalid(boardArray) {
      return !boardIsValid(boardArray);
    }
  
    function boardIsValid(boardArray) {
      return allRowsValid(boardArray) && allColumnsValid(boardArray) && allBoxesValid(boardArray);
    }
  
    function boardIsSolved(boardArray) {
      for (let i = 0; i < boardArray.length; i++) {
        if (boardArray[i] === "-") {
          return false;
        }
      }
      return true;
    }
  
    function getNextCellAndPossibilities(boardArray) {
      for (let i = 0; i < boardArray.length; i++) {
        if (boardArray[i] === "-") {
          let existingValues = getAllIntersections(boardArray, i);
          let choices = ["1", "2", "3", "4", "5", "6", "7", "8", "9"].filter(function (num) {
            return existingValues.indexOf(num) < 0;
          });
          return { index: i, choices: choices };
        }
      }
    }
  
    function getAllIntersections(boardArray, i) {
      return getRow(boardArray, i).concat(getColumn(boardArray, i)).concat(getBox(boardArray, i));
    }
  
    function allRowsValid(boardArray) {
      return [0, 9, 18, 27, 36, 45, 54, 63, 72].map(function (i) {
        return getRow(boardArray, i);
      }).reduce(function (validity, row) {
        return collectionIsValid(row) && validity;
      }, true);
    }
  
    function getRow(boardArray, i) {
      let startingEl = Math.floor(i / 9) * 9;
      return boardArray.slice(startingEl, startingEl + 9);
    }
  
    function allColumnsValid(boardArray) {
      return [0, 1, 2, 3, 4, 5, 6, 7, 8].map(function (i) {
        return getColumn(boardArray, i);
      }).reduce(function (validity, row) {
        return collectionIsValid(row) && validity;
      }, true);
    }
  
    function getColumn(boardArray, i) {
      let startingEl = Math.floor(i % 9);
      return [0, 1, 2, 3, 4, 5, 6, 7, 8].map(function (num) {
        return boardArray[startingEl + num * 9];
      });
    }
  
    function allBoxesValid(boardArray) {
      return [0, 3, 6, 27, 30, 33, 54, 57, 60].map(function (i) {
        return getBox(boardArray, i);
      }).reduce(function (validity, row) {
        return collectionIsValid(row) && validity;
      }, true);
    }
  
    function getBox(boardArray, i) {
      let boxCol = Math.floor(i / 3) % 3;
      let boxRow = Math.floor(i / 27);
      let startingIndex = boxCol * 3 + boxRow * 27;
      return [0, 1, 2, 9, 10, 11, 18, 19, 20].map(function (num) {
        return boardArray[startingIndex + num];
      });
    }
  
    function collectionIsValid(collection) {
      let numCounts = {};
      for(let i = 0; i < collection.length; i++) {
        if (collection[i] != "-") {
          if (numCounts[collection[i]] === undefined) {
            numCounts[collection[i]] = 1;
          } else {
            return false;
          }
        }
      }
      return true;
    }
  
    function toString(boardArray) {
      return [0, 9, 18, 27, 36, 45, 54, 63, 72].map(function (i) {
        return getRow(boardArray, i).join(" ");
      }).join("\n");
    }
  
  
      solver = { 
        solve: solve,
        solveAndPrint: solveAndPrint,
        recursiveSolve: recursiveSolve,
        boardIsInvalid: boardIsInvalid,
        boardIsValid: boardIsValid,
        boardIsSolved: boardIsSolved,
        getNextCellAndPossibilities: getNextCellAndPossibilities,
        getAllIntersections: getAllIntersections,
        allRowsValid: allRowsValid,
        getRow: getRow,
        allColumnsValid: allColumnsValid,
        getColumn: getColumn,
        allBoxesValid: allBoxesValid,
        getBox: getBox,
        collectionIsValid: collectionIsValid,
        toString: toString
       };
    return solver;
  }();
