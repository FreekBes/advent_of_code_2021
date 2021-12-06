/* ************************************************************************** */
/*                                                                            */
/*                                                        ::::::::            */
/*   main.js                                            :+:    :+:            */
/*                                                     +:+                    */
/*   By: fbes <fbes@student.codam.nl>                 +#+                     */
/*                                                   +#+                      */
/*   Created: 2021/12/06 21:52:22 by fbes          #+#    #+#                 */
/*   Updated: 2021/12/06 21:52:22 by fbes          ########   odam.nl         */
/*                                                                            */
/* ************************************************************************** */

const path = require("path");
const fs = require("fs");

const input = fs.readFileSync(path.join(__dirname, "..", "input.txt"));
const initPopu = input.toString().split(",");
let day, i;
const simulateDays = 256;
let fishies = new BigUint64Array(9);
let tempFishies = new BigUint64Array(9);
let popuSize = BigInt(0);

for (i = 0; i < initPopu.length; i++) {
	fishies[parseInt(initPopu[i])]++;
}

console.log("Initial state: ", fishies);

for (day = 0; day < simulateDays; day++) {
	tempFishies[8] = fishies[0];
	tempFishies[6] = fishies[0];
	for (i = 1; i < 9; i++) {
		tempFishies[i - 1] += fishies[i];
	}
	fishies = tempFishies;
	tempFishies = new BigUint64Array(9);
}

console.log("Final state: ", fishies);
for (i = 0; i < 9; i++) {
	popuSize += fishies[i];
}
console.log("Final population size: ", popuSize);