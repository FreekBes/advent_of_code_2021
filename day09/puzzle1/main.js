/* ************************************************************************** */
/*                                                                            */
/*                                                        ::::::::            */
/*   main.js                                            :+:    :+:            */
/*                                                     +:+                    */
/*   By: fbes <fbes@student.codam.nl>                 +#+                     */
/*                                                   +#+                      */
/*   Created: 2021/12/10 17:32:47 by fbes          #+#    #+#                 */
/*   Updated: 2021/12/10 18:03:10 by fbes          ########   odam.nl         */
/*                                                                            */
/* ************************************************************************** */

const path = require("path");
const fs = require("fs");

const input = fs.readFileSync(path.join(__dirname, "..", "input.txt"));
const lines = input.toString().split("\n");
const lineCount = lines.length;

let i, j;
let temp, temp2;
let map = new Array();
let mapLowPoints = new Array();

for (i = 0; i < lineCount; i++) {
	if (lines[i].length == 0) {
		continue;
	}
	temp = lines[i].split("");
	temp2 = new Array(temp.length);
	for (j = 0; j < temp.length; j++) {
		temp[j] = parseInt(temp[j]);
		temp2[j] = false;
	}
	map.push(temp);
	mapLowPoints.push(temp2);
}

function isLowerThanNeighbors(h, w) {
	let isLower = true;

	if (w > 0 && map[h][w] >= map[h][w - 1]) {
		isLower = false;
	}
	if (h > 0 && map[h][w] >= map[h - 1][w]) {
		isLower = false;
	}
	if (w < map[0].length - 1 && map[h][w] >= map[h][w + 1]) {
		isLower = false;
	}
	if (h < map.length - 1 && map[h][w] >= map[h + 1][w]) {
		isLower = false;
	}
	return (isLower);
}

let riskLevel = 0;
for (i = 0; i < map.length; i++) {
	for (j = 0; j < map[i].length; j++) {
		if (isLowerThanNeighbors(i, j)) {
			mapLowPoints[i][j] = true;
			riskLevel += map[i][j] + 1;
		}
	}
}

console.log("Risk Level:", riskLevel);
