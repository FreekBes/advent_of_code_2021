/* ************************************************************************** */
/*                                                                            */
/*                                                        ::::::::            */
/*   main.js                                            :+:    :+:            */
/*                                                     +:+                    */
/*   By: fbes <fbes@student.codam.nl>                 +#+                     */
/*                                                   +#+                      */
/*   Created: 2021/12/04 23:01:35 by fbes          #+#    #+#                 */
/*   Updated: 2021/12/04 23:01:35 by fbes          ########   odam.nl         */
/*                                                                            */
/* ************************************************************************** */

const path = require("path");
const fs = require("fs");

const input = fs.readFileSync(path.join(__dirname, "..", "input.txt"));
const lines = input.toString().split("\n");
const lineCount = lines.length;

const randomNums = lines[0].split(",");
let boards = [];
let boardsBingo = [];
let i, j, k;
let boardIndex = -1;
let tempNums,  tempBoardRow, tempBoardRowBingo;

for (i = 0; i < randomNums.length; i++) {
	randomNums[i] = parseInt(randomNums[i]);
}

for (i = 1; i < lineCount; i++) {
	if (lines[i].length == 1) {
		boardIndex++;
		boards.push(new Array());
		boardsBingo.push(new Array());
		continue;
	}
	tempBoardRow = new Array();
	tempBoardRowBingo = new Array();
	tempNums = lines[i].split(' ');
	for (j = 0; j < tempNums.length; j++) {
		if (tempNums[j].length == 0) {
			continue;
		}
		tempBoardRow.push(parseInt(tempNums[j]));
		tempBoardRowBingo.push(false);
	}
	boards[boardIndex].push(tempBoardRow);
	boardsBingo[boardIndex].push(tempBoardRowBingo);
}

function checkForBingo(boardBingo) {
	let expectedLen = boardBingo[0].length;
	let tempVertic, i, j;

	for (i = 0; i < boardBingo.length; i++) {
		if (boardBingo[i].every(Boolean)) {
			return true;
		}
	}
	for (i = 0; i < expectedLen; i++) {
		tempVertic = new Array();
		for (j = 0; j < boardBingo.length; j++) {
			tempVertic.push(boardBingo[j][i]);
		}
		if (tempVertic.every(Boolean)) {
			return true;
		}
	}
	return false;
}

let won = new Array(boards.length);
let wonAt = new Array(boards.length);
let amountWon = 0;
for (i = 0; i < boards.length; i++) {
	won[i] = -1;
	wonAt[i] = -1;
}

for (i = 0; i < randomNums.length; i++) {
	for (boardIndex = 0; boardIndex < boards.length; boardIndex++) {
		for (j = 0; j < boards[boardIndex].length && won[boardIndex] === -1; j++) {
			for (k = 0; k < boards[boardIndex][j].length; k++) {
				if (boards[boardIndex][j][k] === randomNums[i]) {
					boardsBingo[boardIndex][j][k] = true;
					if (checkForBingo(boardsBingo[boardIndex])) {
						won[boardIndex] = amountWon;
						wonAt[boardIndex] = randomNums[i];
						amountWon++;
						break;
					}
				}
			}
		}
	}
}

let lastWinner = won.indexOf(Math.max.apply(Math, won));
if (lastWinner > -1) {
	console.log("We have the last winner! Calculating scores...");
	let score = 0;
	for (i = 0; i < boards[lastWinner].length; i++) {
		for (j = 0; j < boards[lastWinner][i].length; j++) {
			if (boardsBingo[lastWinner][i][j] === false) {
				score += boards[lastWinner][i][j];
			}
		}
	}
	score *= wonAt[lastWinner];
	console.log("Score: " + score);
}
else {
	console.log("We don't have a winner at this time.");
}