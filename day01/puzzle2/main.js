/* ************************************************************************** */
/*                                                                            */
/*                                                        ::::::::            */
/*   main.js                                            :+:    :+:            */
/*                                                     +:+                    */
/*   By: fbes <fbes@student.codam.nl>                 +#+                     */
/*                                                   +#+                      */
/*   Created: 2021/12/02 23:46:24 by fbes          #+#    #+#                 */
/*   Updated: 2021/12/02 23:46:24 by fbes          ########   odam.nl         */
/*                                                                            */
/* ************************************************************************** */

const path = require("path");
const fs = require("fs");

const input = fs.readFileSync(path.join(__dirname, "..", "input.txt"));
const lines = input.toString().split("\n");
const lineCount = lines.length;
let timesIncreased = 0;
let summedP;
let summedC;
let i;

for (i = 0; i < lineCount; i++) {
	lines[i] = parseInt(lines[i]);
}

for (i = 1; i < lineCount - 2; i++) {
	summedP = lines[i - 1] + lines[i] + lines[i + 1];
	summedC = lines[i] + lines[i + 1] + lines[i + 2];
	// console.log("prev: " + summedP.toString() + ", cur: " + summedC.toString());
	if (summedC > summedP) {
		timesIncreased++;
	}
}

console.log("Times increased: " + timesIncreased);