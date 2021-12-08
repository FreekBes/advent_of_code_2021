/* ************************************************************************** */
/*                                                                            */
/*                                                        ::::::::            */
/*   main.js                                            :+:    :+:            */
/*                                                     +:+                    */
/*   By: fbes <fbes@student.codam.nl>                 +#+                     */
/*                                                   +#+                      */
/*   Created: 2021/12/08 21:06:29 by fbes          #+#    #+#                 */
/*   Updated: 2021/12/08 22:40:53 by fbes          ########   odam.nl         */
/*                                                                            */
/* ************************************************************************** */

const path = require("path");
const fs = require("fs");

const input = fs.readFileSync(path.join(__dirname, "..", "expected.txt"));
const lines = input.toString().split("\n");
const lineCount = lines.length;

let segments = {
	a: [],
	b: [],
	c: [],
	d: [],
	e: [],
	f: [],
	g: []
};
let segmentsClone = segments;
let finalNumPatterns = new Array(10);
let temp, patterns, output, tempPattern, tempPattern2, candidates, usedPatterns;
let diff, diff2, diff3;
let nums = new Array();
let i, j, k;

function mostOccurringElement(array) {
	var max = array[0],
	counter = {},
	i = array.length,
	element;

	while (i--) {
		element = array[i];
		if (!counter[element]) {
			counter[element] = 0;
		}
		counter[element]++;
		if (counter[max] < counter[element]) {
			max = element;
		}
	}
	return max;
}

function getArrayDifferences(arr1, arr2) {
	return (arr1.filter(function(x) {
		return (!arr2.includes(x));
	}).concat(arr2.filter(function(x) {
		return (!arr1.includes(x));
	})));
}

function getItemsNotInOtherArray(arr, other) {
	let not = [];
	for (let i = 0; i < arr.length; i++) {
		if (other.indexOf(arr[i]) == -1) {
			not.push(arr[i]);
		}
	}
	return (not);
}

function getPatternsOfLength(patterns, len, excludeIndexes) {
	let indexes = [];

	for (let j = 0; j < 10; j++) {
		if (excludeIndexes && excludeIndexes.indexOf(j) > -1) {
			continue;
		}
		if (patterns[j].length == len) {
			indexes.push(j);
		}
	}
	return (indexes);
}

let answer = 0;
for (i = 0; i < lineCount; i++) {
	if (lines[i].length == 0) {
		continue;
	}
	usedPatterns = new Array();
	segments = segmentsClone;
	temp = lines[i].split(" | ");
	patterns = temp[0].split(" ");
	for (j = 0; j < 10; j++) {
		patterns[j] = patterns[j].split("");
	}
	output = temp[1].split(" ");
	finalNumPatterns.fill([]);

	// number 1
	candidates = getPatternsOfLength(patterns, 2, null);
	finalNumPatterns[1] = patterns[candidates[0]];
	usedPatterns.push(candidates[0]);

	// number 7
	candidates = getPatternsOfLength(patterns, 3, usedPatterns);
	finalNumPatterns[7] = patterns[candidates[0]];
	usedPatterns.push(candidates[0]);

	// number 4
	candidates = getPatternsOfLength(patterns, 4, usedPatterns);
	finalNumPatterns[4] = patterns[candidates[0]];
	usedPatterns.push(candidates[0]);

	// number 8
	candidates = getPatternsOfLength(patterns, 7, usedPatterns);
	finalNumPatterns[8] = patterns[candidates[0]];
	usedPatterns.push(candidates[0]);

	// number 5 and number 6
	// BROKEN
	candidates = getPatternsOfLength(patterns, 5, usedPatterns);
	let cand2 = getPatternsOfLength(patterns, 6, usedPatterns);
	loop1:
	for (j = 0; j < candidates.length; j++) {
		tempPattern = patterns[candidates[j]];
		for (k = 0; k < cand2.length; k++) {
			tempPattern2 = patterns[cand2[k]];
			if (getArrayDifferences(tempPattern, tempPattern2).length == 1) {
				if (tempPattern.length > tempPattern2.length) {
					finalNumPatterns[5] = tempPattern2;
					finalNumPatterns[6] = tempPattern;
				}
				else {
					finalNumPatterns[5] = tempPattern;
					finalNumPatterns[6] = tempPattern2;
				}
				usedPatterns.push(candidates[j]);
				usedPatterns.push(cand2[k]);
				break loop1;
			}
		}
	}

	// number 2 and 3
	// BROKEN
	// check which segments do appear in both 4 and 5
	// if they all appear then we got 2, if else we got 3
	candidates = getPatternsOfLength(patterns, 5, usedPatterns);
	diff = getItemsNotInOtherArray(patterns[candidates[0]], finalNumPatterns[5]);
	diff2 = getItemsNotInOtherArray(patterns[candidates[0]], finalNumPatterns[4]);
	diff3 = getItemsNotInOtherArray(diff, diff2);
	if (diff3.length == 0) {
		finalNumPatterns[2] = patterns[candidates[0]];
		finalNumPatterns[3] = patterns[candidates[1]];
	}
	else {
		finalNumPatterns[2] = patterns[candidates[1]];
		finalNumPatterns[3] = patterns[candidates[0]];
	}
	usedPatterns.push(candidates[0]);
	usedPatterns.push(candidates[1]);

	// number 0 and 9
	// BROKEN
	// check which segments do appear in both 8 and 6
	// if they all appear then we got 9, if else we got 0
	candidates = getPatternsOfLength(patterns, 6, usedPatterns);
	diff = getItemsNotInOtherArray(patterns[candidates[0]], finalNumPatterns[8]);
	diff2 = getItemsNotInOtherArray(patterns[candidates[0]], finalNumPatterns[6]);
	diff3 = getItemsNotInOtherArray(diff, diff2);
	if (diff3.length == 0) {
		finalNumPatterns[0] = patterns[candidates[0]];
		finalNumPatterns[9] = patterns[candidates[1]];
	}
	else {
		finalNumPatterns[0] = patterns[candidates[1]];
		finalNumPatterns[9] = patterns[candidates[0]];
	}

	console.log("finalNumPatterns: ", finalNumPatterns);
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
