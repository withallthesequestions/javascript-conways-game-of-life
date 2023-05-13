// Assign your matrix dimensions here
const XVALUE = 3
const YVALUE = 3

// a. Make a 2D matrix, of specified size.
let binaryMatrix = [];
function generateMatrix(rows, columns) {
	for (let i = 0; i < rows; i++) {
		binaryMatrix[i] = [];
 		// let divGrid = document.getElementById("matrixTable");
		// divGrid.innerHTML += `<br>`; 
		for (let j = 0; j < columns; j++) {
			assignInitialValues(i, j)
		}
	}
	console.log("This is the initial grid:");
	console.table(binaryMatrix);
	renderHTMLGrid(XVALUE, YVALUE) 
}

generateMatrix(XVALUE, YVALUE);

// b. Assign life/death value to each cell randomly
function assignInitialValues(xIndex, yIndex){
	binaryMatrix[xIndex][yIndex] = Math.round(Math.random());
}
// c. Insert matrix into HTML
function renderHTMLGrid(rows, columns) {
	for (let i = 0; i < rows; i++) {
 		let divGrid = document.getElementById("matrixTable");
		divGrid.innerHTML += `<br>`; 
		for (let j = 0; j < columns; j++) {
			let parentGrid = document.getElementById("matrixTable");
			parentGrid.innerHTML += `<div class="matrixCell">${binaryMatrix[i][j]}</div>`;
		
		}
	}
}

// d. Check neighbor life status
function logLivingNeighbors(xValue, yValue) {
	let selectedCell = binaryMatrix[xValue][yValue];
	let neighborCells = [
		binaryMatrix[yValue - 1][xValue - 1],
		binaryMatrix[yValue - 1][xValue],
		binaryMatrix[yValue - 1][xValue + 1],
		binaryMatrix[yValue][xValue - 1],
		binaryMatrix[yValue][xValue],
		binaryMatrix[yValue][xValue + 1],
		binaryMatrix[yValue + 1][xValue - 1],
		binaryMatrix[yValue + 1][xValue],
		binaryMatrix[yValue + 1][xValue + 1]
	];
	const livingNeighborAmount = neighborCells.reduce((a, c) => a + c, 0);
	console.log("selected cell value=", selectedCell);
	console.log("number of living neighbors=", livingNeighborAmount);
	updateCell(selectedCell, livingNeighborAmount);
}
logLivingNeighbors(1, 1);

// e. Update selected cell according to rules.
function updateCell(selectedCell, livingNeighborAmount) {
	if (selectedCell === 1) {
		console.log("starting state: 1");
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
		console.log("starting state: 0");
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
			case 5:
			case 6:
			case 7:
			case 8:
				console.log("dead");
				selectedCell = 0
				break;
		}
	}
	console.log("updated cell status=", selectedCell);
}

/* Next: Generate new grid, with empty values, and push the new values in.
 * 
 */

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
