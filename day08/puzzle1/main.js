/* ************************************************************************** */
/*                                                                            */
/*                                                        ::::::::            */
/*   main.js                                            :+:    :+:            */
/*                                                     +:+                    */
/*   By: fbes <fbes@student.codam.nl>                 +#+                     */
/*                                                   +#+                      */
/*   Created: 2021/12/08 20:39:55 by fbes          #+#    #+#                 */
/*   Updated: 2021/12/08 21:50:21 by fbes          ########   odam.nl         */
/*                                                                            */
/* ************************************************************************** */

const path = require("path");
const fs = require("fs");

const input = fs.readFileSync(path.join(__dirname, "..", "input.txt"));
const lines = input.toString().split("\n");
const lineCount = lines.length;

let finalNumPatterns = new Array(10);
let temp, patterns, output, tempPattern;
let i, j, k;

function getArrayDifferences(arr1, arr2) {
	return (arr1.filter(function(x) {
		return (!arr2.includes(x));
	}).concat(arr2.filter(function(x) {
		return (!arr1.includes(x));
	})));
}

let answer = 0;
for (i = 0; i < lineCount; i++) {
	if (lines[i].length == 0) {
		continue;
	}
	temp = lines[i].split(" | ");
	patterns = temp[0].split(" ");
	output = temp[1].split(" ");
	for (j = 0; j < 10; j++) {
		tempPattern = patterns[j].split("");
		if (tempPattern.length == 2) {		// 1
			finalNumPatterns[1] = tempPattern;
		}
		else if (tempPattern.length == 7) {	// 8
			finalNumPatterns[8] = tempPattern;
		}
		else if (tempPattern.length == 3) {	// 7
			finalNumPatterns[7] = tempPattern;
		}
		else if (tempPattern.length == 4) {	// 4
			finalNumPatterns[4] = tempPattern;
		}
	}
	for (j = 0; j < 4; j++) {
		tempPattern = output[j].split("");
		for (k = 0; k < 10; k++) {
			if (finalNumPatterns[k] === undefined) {
				continue;
			}
			if (getArrayDifferences(tempPattern, finalNumPatterns[k]).length == 0) {
				console.log("pattern " + j + " (" + tempPattern.join("") + ") matches the number " + k);
				answer++;
			}
		}
	}
}

console.log("Answer: " + answer);
