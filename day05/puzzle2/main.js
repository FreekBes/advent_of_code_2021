/* ************************************************************************** */
/*                                                                            */
/*                                                        ::::::::            */
/*   main.js                                            :+:    :+:            */
/*                                                     +:+                    */
/*   By: fbes <fbes@student.codam.nl>                 +#+                     */
/*                                                   +#+                      */
/*   Created: 2021/12/06 19:51:29 by fbes          #+#    #+#                 */
/*   Updated: 2021/12/06 19:51:29 by fbes          ########   odam.nl         */
/*                                                                            */
/* ************************************************************************** */

const path = require("path");
const fs = require("fs");

const input = fs.readFileSync(path.join(__dirname, "..", "input.txt"));
const lines = input.toString().split("\n");
const lineCount = lines.length;

let diaWidth = 1;
let diaHeight = 1;
let diagram, i, j;

function consoleLogDiagram() {
	let tempStr;

	for (let w = 0; w < diaWidth; w++) {
		tempStr = "";
		for (let h = 0; h < diaHeight; h++) {
			tempStr += (diagram[h][w] == 0 ? "." : diagram[h][w]) + " ";
		}
		console.log(tempStr);
	}
}

// Bresenham's Line Drawing Algorithm, from Rosetta Code library
// http://rosettacode.org/wiki/Bitmap/Bresenham%27s_line_algorithm#JavaScript
function bline(x0, y0, x1, y1) {
	var dx = Math.abs(x1 - x0), sx = x0 < x1 ? 1 : -1;
	var dy = Math.abs(y1 - y0), sy = y0 < y1 ? 1 : -1; 
	var err = (dx>dy ? dx : -dy)/2;

	while (true) {
		diagram[x0][y0] += 1;
		if (x0 === x1 && y0 === y1) break;
		var e2 = err;
		if (e2 > -dx) { err -= dy; x0 += sx; }
		if (e2 < dy) { err += dx; y0 += sy; }
	}
}

// split up coordinates in lines
for (i = 0; i < lineCount; i++) {
	lines[i] = lines[i].split(" -> ");
	lines[i][0] = lines[i][0].split(",");
	lines[i][1] = lines[i][1].split(",");
	lines[i][0][0] = parseInt(lines[i][0][0]);
	lines[i][0][1] = parseInt(lines[i][0][1]);
	lines[i][1][0] = parseInt(lines[i][1][0]);
	lines[i][1][1] = parseInt(lines[i][1][1]);
}

// get size of diagram
for (i = 0; i < lineCount; i++) {
	if (lines[i][0][0] >= diaWidth) {
		diaWidth = lines[i][0][0] + 1;
	}
	if (lines[i][0][1] >= diaHeight) {
		diaHeight = lines[i][0][1] + 1;
	}
	if (lines[i][1][0] >= diaWidth) {
		diaWidth = lines[i][1][0] + 1;
	}
	if (lines[i][1][1] >= diaHeight) {
		diaHeight = lines[i][1][1] + 1;
	}
}

console.log("Width: " + diaWidth);
console.log("Height: " + diaHeight);

// initialize diagram
diagram = new Array(diaWidth);
for (i = 0; i < diaWidth; i++) {
	diagram[i] = new Array(diaHeight);
	for (j = 0; j < diaHeight; j++) {
		diagram[i][j] = 0;
	}
}

// populate diagram
for (i = 0; i < lineCount; i++) {
	bline(lines[i][0][0], lines[i][0][1], lines[i][1][0], lines[i][1][1]);
}

consoleLogDiagram();

// get answer
let answer = 0;
for (i = 0; i < diaWidth; i++) {
	for (j = 0; j < diaHeight; j++) {
		if (diagram[j][i] > 1) {
			answer++;
		}
	}
}
console.log("Answer: " + answer);