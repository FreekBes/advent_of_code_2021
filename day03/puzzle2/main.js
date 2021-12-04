/* ************************************************************************** */
/*                                                                            */
/*                                                        ::::::::            */
/*   main.js                                            :+:    :+:            */
/*                                                     +:+                    */
/*   By: fbes <fbes@student.codam.nl>                 +#+                     */
/*                                                   +#+                      */
/*   Created: 2021/12/04 00:46:14 by fbes          #+#    #+#                 */
/*   Updated: 2021/12/04 00:46:14 by fbes          ########   odam.nl         */
/*                                                                            */
/* ************************************************************************** */

const path = require("path");
const fs = require("fs");

const input = fs.readFileSync(path.join(__dirname, "..", "input.txt"));
const lines = input.toString().split("\n");
const lineCount = lines.length;

function bitsToInt(bits) {
	bits = bits.trim();
	let temp = NaN;
	let num = 0;
	let left = bits.length - 1;
	let i = 0;
	let amountOfBits = bits.length;

	while (i < amountOfBits) {
		num += parseInt(bits[i]) * Math.pow(2, left);
		left--;
		i++;
	}
	return (num);
}

let values = [];
let i = 0;
let j = 0;
let requirement = "";
let oxygen;
let co2;

for (i = 0; i < lines[0].length; i++) {
	values.push({
		counted: 0,
		ones: 0,
		zeroes: 0
	});
}

// search for oxygen levels
for (j = 0; j < values.length; j++) {
	for (i = 0; i < lineCount; i++) {
		if (!lines[i].startsWith(requirement)) {
			continue;
		}
		if (lines[i][j] == "1") {
			values[j].ones++;
			values[j].counted++;
		}
		else if (lines[i][j] == "0") {
			values[j].zeroes++;
			values[j].counted++;
		}
	}
	if (values[j].counted > 1) {
		if (values[j].ones >= values[j].zeroes) {
			requirement += "1";
		}
		else {
			requirement += "0";
		}
	}
	else {
		// only one value left, retrieve that value
		for (i = 0; i < lineCount; i++) {
			if (lines[i].startsWith(requirement)) {
				oxygen = lines[i];
				break;
			}
		}
		break;
	}
}

// reset values and requirements
requirement = "";
for (i = 0; i < lines[0].length; i++) {
	values[i].counted = 0;
	values[i].ones = 0;
	values[i].zeroes = 0;
}

// search for co2 levels
for (j = 0; j < values.length; j++) {
	for (i = 0; i < lineCount; i++) {
		if (!lines[i].startsWith(requirement)) {
			continue;
		}
		if (lines[i][j] == "1") {
			values[j].ones++;
			values[j].counted++;
		}
		else if (lines[i][j] == "0") {
			values[j].zeroes++;
			values[j].counted++;
		}
	}
	if (values[j].counted > 1) {
		if (values[j].ones >= values[j].zeroes) {
			requirement += "0";
		}
		else {
			requirement += "1";
		}
	}
	else {
		// only one value left, retrieve that value
		for (i = 0; i < lineCount; i++) {
			if (lines[i].startsWith(requirement)) {
				co2 = lines[i];
				break;
			}
		}
		break;
	}
}

// get decimal values
let oxygenDeci = bitsToInt(oxygen);
let co2Deci = bitsToInt(co2);

console.log("Oxygen level (binary): " + oxygen);
console.log("Oxygen level (decimal): " + oxygenDeci);
console.log("CO2 level (binary): " + co2);
console.log("CO2 level (decimal): " + co2Deci);
console.log("Life support rating: " + (oxygenDeci * co2Deci));