/* ************************************************************************** */
/*                                                                            */
/*                                                        ::::::::            */
/*   main.js                                            :+:    :+:            */
/*                                                     +:+                    */
/*   By: fbes <fbes@student.codam.nl>                 +#+                     */
/*                                                   +#+                      */
/*   Created: 2021/12/07 17:41:46 by fbes          #+#    #+#                 */
/*   Updated: 2021/12/07 17:56:14 by fbes          ########   odam.nl         */
/*                                                                            */
/* ************************************************************************** */

const path = require("path");
const fs = require("fs");

const input = fs.readFileSync(path.join(__dirname, "..", "input.txt"));
let crabPos = input.toString().split(",");
let i, j;

for (i = 0; i < crabPos.length; i++) {
	crabPos[i] = parseInt(crabPos[i]);
}

const maxHori = Math.max.apply(Math, crabPos);
const minHori = Math.min.apply(Math, crabPos);
let answers = new Array(maxHori - minHori);

for (i = minHori; i <= maxHori; i++) {
	answers[i] = 0;
	for (j = 0; j < crabPos.length; j++) {
		answers[i] += Math.abs(crabPos[j] - i);
	}
}

console.log(answers);
let lowestFuel = Math.min.apply(Math, answers);
let moveTo = answers.indexOf(lowestFuel) + minHori;
console.log("Lowest fuel consume: move to " + moveTo + ", costs " + lowestFuel);
