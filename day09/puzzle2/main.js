/* ************************************************************************** */
/*                                                                            */
/*                                                        ::::::::            */
/*   main.js                                            :+:    :+:            */
/*                                                     +:+                    */
/*   By: fbes <fbes@student.codam.nl>                 +#+                     */
/*                                                   +#+                      */
/*   Created: 2021/12/10 17:44:30 by fbes          #+#    #+#                 */
/*   Updated: 2021/12/10 18:28:59 by fbes          ########   odam.nl         */
/*                                                                            */
/* ************************************************************************** */

const path = require("path");
const fs = require("fs");

const input = fs.readFileSync(path.join(__dirname, "..", "input.txt"));
const lines = input.toString().split("\n");
const lineCount = lines.length;

let i, j, k, l;
let temp, temp2;
let map = new Array();
let mapLowPoints = new Array();
let emptyMap;

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
// for some reason, Array.from returns a shallow copy instead of a deep copy
// so we use this hacky method instead.
// emptyMap = Array.from(mapLowPoints);
emptyMap = JSON.parse(JSON.stringify(mapLowPoints));

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

function setBasinNeighbors(basinMap, h, w) {
	if (basinMap[h][w] !== true) {
		return (false);
	}

	let anythingChanged = false;
	if (w > 0 && map[h][w] < map[h][w - 1] && map[h][w - 1] != 9 && !basinMap[h][w - 1]) {
		basinMap[h][w - 1] = true;
		anythingChanged = true;
	}
	if (h > 0 && map[h][w] < map[h - 1][w] && map[h - 1][w] != 9 && !basinMap[h - 1][w]) {
		basinMap[h - 1][w] = true;
		anythingChanged = true;
	}
	if (w < map[0].length - 1 && map[h][w] < map[h][w + 1] && map[h][w + 1] != 9 && !basinMap[h][w + 1]) {
		basinMap[h][w + 1] = true;
		anythingChanged = true;
	}
	if (h < map.length - 1 && map[h][w] < map[h + 1][w] && map[h + 1][w] != 9 && !basinMap[h + 1][w]) {
		basinMap[h + 1][w] = true;
		anythingChanged = true;
	}
	return (anythingChanged);
}

// get lowest points of map
for (i = 0; i < map.length; i++) {
	for (j = 0; j < map[i].length; j++) {
		if (isLowerThanNeighbors(i, j)) {
			mapLowPoints[i][j] = true;
		}
	}
}

// get all the basins
let basinMaps = new Array();
let basinSizes = new Array();
temp = -1;
let anythingChanged;
for (i = 0; i < map.length; i++) {
	for (j = 0; j < map[i].length; j++) {
		if (mapLowPoints[i][j] === true) {
			basinMaps.push(JSON.parse(JSON.stringify(emptyMap)));
			basinSizes.push(0);
			temp++;
			basinMaps[temp][i][j] = true;
			while (true) {
				anythingChanged = false;
				for (k = 0; k < map.length; k++) {
					for (l = 0; l < map[k].length; l++) {
						if (setBasinNeighbors(basinMaps[temp], k, l)) {
							anythingChanged = true;
						}
					}
				}
				if (anythingChanged === false) {
					break;
				}
			}
		}
	}
}

// get size of all basins
console.log("Amount of basins:", temp);
for (temp = 0; temp < basinMaps.length; temp++) {
	for (i = 0; i < basinMaps[temp].length; i++) {
		for (j = 0; j < basinMaps[temp][i].length; j++) {
			if (basinMaps[temp][i][j] === true) {
				basinSizes[temp]++;
			}
		}
	}
}

// get the largest three by sorting the sizes but keeping the indexes
let sortedBasinIndexes = new Array(basinSizes.length);
for (i = 0; i < sortedBasinIndexes.length; i++) {
	sortedBasinIndexes[i] = i;
}

sortedBasinIndexes.sort(function(a, b) {
	if (basinSizes[a] < basinSizes[b]) {
		return (1);
	}
	if (basinSizes[a] > basinSizes[b]) {
		return (-1);
	}
	return (0);
});

console.log("Sizes of basins:", basinSizes);
console.log("Sorted basin indexes by their size:", sortedBasinIndexes);

// output the sum of the largest three
console.log("Answer: ", basinSizes[sortedBasinIndexes[0]] * basinSizes[sortedBasinIndexes[1]] * basinSizes[sortedBasinIndexes[2]]);
