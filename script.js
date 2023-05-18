/* PLAN
 * Specify matrix size
 * Implement manual update functionality
 * * ...Hello
 * Create first-generation matrix (blank)
 * * Assign values
 * * Assign to DisplayMatrix
 * Evolve
 * * Create BufferMatrix (blank)
 * * Apply EvolutionLoop to DisplayMatrix, output values to BufferMatrix.
 * * * Replace DisplayMatrix with BufferMatrix
 */

// 1. Generation 1
// a. Assign matrix dimensions here
const X_VALUE = 8;
const Y_VALUE = 8;
const MATRIX_TABLE = document.getElementById("matrixTable");

// Button click
const nextGenerationButton = document.getElementById("generateButton");
nextGenerationButton.addEventListener("click", (event) => {
	MATRIX_TABLE.innerHTML = "";
	evolveLoop(displayMatrix, bufferMatrix, X_VALUE, Y_VALUE);
	renderHTMLGrid(bufferMatrix, X_VALUE, Y_VALUE);
	displayMatrix = bufferMatrix;
	console.log("buffer rendered");
	evolveLoop(displayMatrix, bufferMatrix, X_VALUE, Y_VALUE);
});

// b. Make a blank 2D matrix
function generateEmptyMatrix(rowCount, colCount) {
	const array = [];
	for (let i = 0; i < rowCount; i++) {
		array[i] = [];
		for (let j = 0; j < colCount; j++) {
			array[i][j] = 0;
		}
	}
	return array;
}
let displayMatrix = generateEmptyMatrix(X_VALUE, Y_VALUE);
// /* TEST CONDITION*/
// let displayMatrix = [
// 	[1, 0, 1],
// 	[0, 1, 1],
// 	[1, 1, 0],
// ];
// console.log("TEST MATRIX");
// console.table(displayMatrix);

// c. Assign random values to 2D matrix
function assignRandomValues(array, rowCount, colCount) {
	for (let i = 0; i < rowCount; i++) {
		for (let j = 0; j < colCount; j++) {
			array[i][j] = Math.round(Math.random());
		}
	}
	return array;
}
assignRandomValues(displayMatrix, X_VALUE, Y_VALUE);
console.log("Display Matrix:");
console.table(displayMatrix);

// d. Push matrix to HTML
renderHTMLGrid(displayMatrix, X_VALUE, Y_VALUE);
function renderHTMLGrid(matrix, rowCount, colCount) {
	MATRIX_TABLE.innerHTML = "";
	for (let i = 0; i < rowCount; i++) {
		MATRIX_TABLE.innerHTML += `<br>`;
		for (let j = 0; j < colCount; j++) {
			if (matrix[i][j] === 1) {
				MATRIX_TABLE.innerHTML += `<div class="cellAlive" data-x="${i}" data-y="${j}">${matrix[i][j]}</div>`;
			} else {
				MATRIX_TABLE.innerHTML += `<div class="cellDead" data-x="${i}" data-y="${j}">${matrix[i][j]}</div>`;
			}
		}
	}
}

// 2. Generation 2
// a. Create buffer Matrix (https://www.cs.cornell.edu/courses/cs4620/2019fa/cs4621/lecture07/exhibit01.html)
const bufferMatrix = generateEmptyMatrix(X_VALUE, Y_VALUE);

// Implemented optional chaining, per Z. This checks if the value exists before accessing it. It prevents undefined and other errors.
function countNeighbors(matrix, xValue, yValue) {
	const neighborCells = [
		matrix?.[xValue - 1]?.[yValue - 1],
		matrix?.[xValue - 1]?.[yValue],
		matrix?.[xValue - 1]?.[yValue + 1],
		matrix?.[xValue]?.[yValue - 1],
		/* 		arr?.[xValue]?.[yValue], */
		matrix?.[xValue]?.[yValue + 1],
		matrix?.[xValue + 1]?.[yValue - 1],
		matrix?.[xValue + 1]?.[yValue],
		matrix?.[xValue + 1]?.[yValue + 1],
	];
	// Filter for edge cases: Only numbers enter the .reduce() function, undefineds are treated as zeroes.
	const filteredNeighbors = neighborCells.filter((x) => typeof x === "number");
	const finalValue = filteredNeighbors.reduce((a, c) => a + c, 0);
	return finalValue;
}

// b. evolveLoop over each item in old matrix
function evolveLoop(oldMatrix, newMatrix, rowCount, colCount) {
	for (let i = 0; i < rowCount; i++) {
		for (let j = 0; j < colCount; j++) {
			let prevCellStatus = oldMatrix[i][j];
			let neighborCount = countNeighbors(oldMatrix, i, j);
			let newValue = newCellStatus(prevCellStatus, neighborCount);
			newMatrix[i][j] = newValue;
		}
	}

	return newMatrix;
}
console.log("Buffer Matrix Preview:");
evolveLoop(displayMatrix, bufferMatrix, X_VALUE, Y_VALUE);
console.table(bufferMatrix);

function newCellStatus(prevCellStatus, neighborCount) {
	if (prevCellStatus === 1) {
		if (neighborCount === 2 || neighborCount === 3) {
			return 1;
		} else {
			return 0;
		}
	} else {
		if (neighborCount === 3) {
			return 1;
		} else {
			return 0;
		}
	}
}

document
	.getElementById("matrixTable")
	.addEventListener("click", function (event) {
		// console.log(event.target.className);
		// event.target.className = "cellAlive";
		// event.target.innerHTML = "1";
		// console.log(event.target.attributes);
		/* 		console.log(
			event.target.attributes[1].name,
			event.target.attributes[1].value,
			event.target.attributes[2].name,
			event.target.attributes[2].value
		); */
		let xValue = event.target.attributes[1].value;
		let yValue = event.target.attributes[2].value;
		if (displayMatrix[xValue][yValue] === 1) {
			displayMatrix[xValue][yValue] = 0;
		} else {
			displayMatrix[xValue][yValue] = 1;
		}
		console.log("Current displayMatrix");
		console.table(displayMatrix);
		console.log("Value update:", displayMatrix[xValue][yValue]);
		renderHTMLGrid(displayMatrix, X_VALUE, Y_VALUE);
		console.log("buffermatrix");
		console.table(bufferMatrix);
	});
