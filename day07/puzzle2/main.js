/* ************************************************************************** */
/*                                                                            */
/*                                                        ::::::::            */
/*   main.js                                            :+:    :+:            */
/*                                                     +:+                    */
/*   By: fbes <fbes@student.codam.nl>                 +#+                     */
/*                                                   +#+                      */
/*   Created: 2021/12/07 17:55:39 by fbes          #+#    #+#                 */
/*   Updated: 2021/12/07 18:11:19 by fbes          ########   odam.nl         */
/*                                                                            */
/* ************************************************************************** */

const path = require("path");
const fs = require("fs");

const input = fs.readFileSync(path.join(__dirname, "..", "input.txt"));
let crabPos = input.toString().split(",");
let crabPosCopy = new Array(crabPos.length);
let i, j, k;

for (i = 0; i < crabPos.length; i++) {
	crabPos[i] = parseInt(crabPos[i]);
}

const maxHori = Math.max.apply(Math, crabPos);
const minHori = Math.min.apply(Math, crabPos);
let answers = new Array(maxHori - minHori);

for (i = minHori; i <= maxHori; i++) {
	answers[i] = 0;
	for (j = 0; j < crabPos.length; j++) {
		crabPosCopy[j] = crabPos[j];
		if (crabPos[j] > i) {
			for (k = 0; crabPosCopy[j] >= i; k++) {
				answers[i] += k;
				crabPosCopy[j]--;
			}
		}
		else {
			for (k = 0; crabPosCopy[j] <= i; k++) {
				answers[i] += k;
				crabPosCopy[j]++;
			}
		}
	}
}

console.log(answers);
let lowestFuel = Math.min.apply(Math, answers);
let moveTo = answers.indexOf(lowestFuel) + minHori;
console.log("Lowest fuel consume: move to " + moveTo + ", costs " + lowestFuel);
