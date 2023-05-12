// a. Make a 2D matrix.
let cellMatrix = [];
function create2DMatrix(rows, columns) {
	for (let i = 0; i < rows; i++) {
		cellMatrix[i] = [];
		let divGrid = document.getElementById("table");
		divGrid.innerHTML += `<br>`;
		for (let j = 0; j < columns; j++) {
			// b. Assign life/death to each cell randomly
			cellMatrix[i][j] = Math.round(Math.random());
			divGrid.innerHTML += `<div class="grid">${cellMatrix[i][j]}</div>`;
		}
	}
	console.table(cellMatrix);
}
create2DMatrix(3, 3);

// c. Check neighbor life status
function logLifeInNeighborCells(xValue, yValue) {
	let selectedCell = cellMatrix[xValue][yValue];
	let neighborCells = [
		cellMatrix[yValue - 1][xValue - 1],
		cellMatrix[yValue - 1][xValue],
		cellMatrix[yValue - 1][xValue + 1],
		cellMatrix[yValue][xValue - 1],
		cellMatrix[yValue][xValue],
		cellMatrix[yValue][xValue + 1],
		cellMatrix[yValue + 1][xValue - 1],
		cellMatrix[yValue + 1][xValue],
		cellMatrix[yValue + 1][xValue + 1]
	];
	const livingNeighborAmount = neighborCells.reduce((a, c) => a + c, 0);
	console.log("total living neighbors=", livingNeighborAmount);
	console.log("selected cell status=", selectedCell);
	updateCell(selectedCell, livingNeighborAmount);

}

logLifeInNeighborCells(1, 1);

function updateCell(selectedCell, livingNeighborAmount) {
	if (selectedCell === 1) {
		console.log("it's 1");
		switch (livingNeighborAmount) {
			case 0:
			case 1:
				console.log("died of loneliness")
				selectedCell = 0
				break;
			case 2:
			case 3:
				console.log("keep it alive");
				selectedCell = 1
				break;
			case 4:
			case 5:
			case 6:
			case 7:
			case 8:
				console.log("died of overpopulation");
				selectedCell = 0
				break;
		}
	} else {
		console.log("it's 0");
		switch (livingNeighborAmount) {
			case 0:
			case 1:
			case 2:
				console.log("dead");
				selectedCell = 0
				break;
			case 3:
				console.log("its alive!");
				selectedCell = 1
				break;
			case 4:
				console.log("dead");
				selectedCell = 0
				break;
		}
	}
	console.log("selected cell status=", selectedCell);
}
/*
  1. Create a function to update the grid.
	  a. Loop through 2d array, updating all values.
  2. Create a function that takes in the two values, and implements the logic of conway's rules.
	  a. Check if selected cell is dead/alive
	  b. If cell is dead, then:
		  if, 3 neighbors are alive, then resurrect it.
		  else, leave it dead
	  c. If cell is alive, then:
		  if 4 or more neighbors are alive, then kill it.
		  if less than two neighbors are alive, then kill it.
		  if 2-3 neighbors are alive, then resurrect it.
 */

//setInterval(incrementOneGeneration, 3000);
