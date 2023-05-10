// I.  Start game
// const startButton = document.getElementById("startButton");

// a. Make a 2D matrix, capable of holding random values
let cellMatrix = [];
const create2DMatrix = (rows, columns) => {
  //let value = 0;
  for (let i = 0; i < rows; i++) {
    cellMatrix[i] = [];
    let divGrid = document.getElementById("table");
    divGrid.innerHTML += `<br>`;
    for (let j = 0; j < columns; j++) {
      //cellMatrix[i][j] = value++;
      cellMatrix[i][j] = Math.round(Math.random()); // This sets 0/1, randomly, to represent alive or dead.
      divGrid.innerHTML += `<div class="grid">${cellMatrix[i][j]}</div>`;
    }
  }
};
create2DMatrix(3, 3);
console.table(cellMatrix);

/* startButton.addEventListener("click", () => {
  // b. Randomly assign life/death state to each square.
  if (isGameOn === true) {
    // Only if game isn't already running.
    // Randomly assign some cells as alive, and others as dead.
  } else {
    const grid = document.getElementsByClassName("grid");
    for (element of grid) {
      const randomValue = Math.round(Math.random());
      if (randomValue === 1) {
        element.style.backgroundColor = "black";
      }
    }
  }
  isGameOn = true;
}); */

function logLifeInNeighborCells(xValue, yValue) {
  const selectedCell = cellMatrix[xValue][yValue];
  /* If neighbor is not undefined, push cell life-value to variable. */
  console.log(selectedCell);
  //let totalLifeValue = []

  console.log(cellMatrix[yValue - 1][xValue - 1]);
  console.log(cellMatrix[yValue - 1][xValue]);
  console.log(cellMatrix[yValue - 1][xValue + 1]);
  console.log(cellMatrix[yValue][xValue - 1]);
  //console.log(cellMatrix[yValue][xValue]); // Original
  console.log(cellMatrix[yValue][xValue + 1]);
  console.log(cellMatrix[yValue + 1][xValue - 1]);
  console.log(cellMatrix[yValue + 1][xValue]);
  console.log(cellMatrix[yValue + 1][xValue + 1]);
}

logLifeInNeighborCells(1, 1);

//setInterval(incrementOneGeneration, 3000);

/* HOW TO REFERENCE divs by number
let el = document.getElementsByTagName("div")[2]
console.log(el);
el.style.backgroundColor = "red"; 

// How to grab text content of individual div
// console.log(document.getElementsByClassName("grid")[0].innerText);

*/
