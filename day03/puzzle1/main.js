/* ************************************************************************** */
/*                                                                            */
/*                                                        ::::::::            */
/*   main.js                                            :+:    :+:            */
/*                                                     +:+                    */
/*   By: fbes <fbes@student.codam.nl>                 +#+                     */
/*                                                   +#+                      */
/*   Created: 2021/12/04 00:19:46 by fbes          #+#    #+#                 */
/*   Updated: 2021/12/04 00:19:46 by fbes          ########   odam.nl         */
/*                                                                            */
/* ************************************************************************** */

const path = require("path");
const fs = require("fs");

const input = fs.readFileSync(path.join(__dirname, "..", "input.txt"));
const lines = input.toString().split("\n");
const lineCount = lines.length;

function bitsToInt(bits) {
	let num = 0;
	let left = bits.length - 1;
	let i = 0;
	let amountOfBits = bits.length;

	while (i < amountOfBits) {
		num += bits[i] * Math.pow(2, left);
		left--;
		i++;
	}
	return (num);
}

let values = [];
let i = 0;
let j = 0;

for (i = 0; i < lines[0].length; i++) {
	values.push({
		ones: 0,
		zeroes: 0
	});
}

for (i = 0; i < lineCount; i++) {
	for (j = 0; j < lines[i].length; j++) {
		if (lines[i][j] == "1") {
			values[j].ones++;
		}
		else if (lines[i][j] == "0") {
			values[j].zeroes++;
		}
		else {
			continue;
		}
	}
}

let gammaBinary = "";
for (i = 0; i < values.length - 1; i++) {
	if (values[i].ones > values[i].zeroes) {
		gammaBinary += "1";
	}
	else {
		gammaBinary += "0";
	}
}

let epsilonBinary = gammaBinary.replace(/0/g, 'A').replace(/1/g, '0').replace(/A/g, '1');
let gammaRate = bitsToInt(gammaBinary);
let epsilonRate = bitsToInt(epsilonBinary);


console.log("Gamma rate: " + gammaBinary + " (" + gammaRate + ")");
console.log("Epsilon rate: " + epsilonBinary + " (" + epsilonRate + ")");
console.log("Power consumption: " + (gammaRate * epsilonRate));