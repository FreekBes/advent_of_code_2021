/* ************************************************************************** */
/*                                                                            */
/*                                                        ::::::::            */
/*   main.js                                            :+:    :+:            */
/*                                                     +:+                    */
/*   By: fbes <fbes@student.codam.nl>                 +#+                     */
/*                                                   +#+                      */
/*   Created: 2021/12/04 22:46:57 by fbes          #+#    #+#                 */
/*   Updated: 2021/12/04 22:46:57 by fbes          ########   odam.nl         */
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

let winningIndex = -1;
let winningNum = NaN;
loop1:
	for (i = 0; i < randomNums.length; i++) {
loop2:
		for (boardIndex = 0; boardIndex < boards.length; boardIndex++) {
loop3:
			for (j = 0; j < boards[boardIndex].length; j++) {
				for (k = 0; k < boards[boardIndex][j].length; k++) {
					if (boards[boardIndex][j][k] === randomNums[i]) {
						boardsBingo[boardIndex][j][k] = true;
						if (checkForBingo(boardsBingo[boardIndex])) {
							winningIndex = boardIndex;
							winningNum = randomNums[i];
							break loop1;
						}
					}
				}
			}
		}
	}

if (winningIndex > -1) {
	console.log("We have a winner! Calculating scores...");
	let score = 0;
	for (i = 0; i < boards[winningIndex].length; i++) {
		for (j = 0; j < boards[winningIndex][i].length; j++) {
			if (boardsBingo[winningIndex][i][j] === false) {
				score += boards[winningIndex][i][j];
			}
		}
	}
	score *= winningNum;
	console.log("Score: " + score);
}
else {
	console.log("We don't have a winner at this time.");
}