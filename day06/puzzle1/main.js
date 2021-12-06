/* ************************************************************************** */
/*                                                                            */
/*                                                        ::::::::            */
/*   main.js                                            :+:    :+:            */
/*                                                     +:+                    */
/*   By: fbes <fbes@student.codam.nl>                 +#+                     */
/*                                                   +#+                      */
/*   Created: 2021/12/06 20:25:12 by fbes          #+#    #+#                 */
/*   Updated: 2021/12/06 20:25:12 by fbes          ########   odam.nl         */
/*                                                                            */
/* ************************************************************************** */

const path = require("path");
const fs = require("fs");

const input = fs.readFileSync(path.join(__dirname, "..", "input.txt"));
let population = input.toString().split(",");
let day, i, popSize;
const simulateDays = 80;

// parse initial population
for (i = 0; i < population.length; i++) {
	population[i] = parseInt(population[i]);
}

console.log("Initial population size: " + population.length);
console.log("Initial state: " + population.join(","));
for (day = 0; day < simulateDays; day++) {
	popSize = population.length;
	for (i = 0; i < popSize; i++) {
		population[i]--;
		if (population[i] < 0) {
			population[i] = 6;
			population.push(8);
		}
	}
	// uncomment line below for debugging only, it slows things down significantly
	// console.log("After " + (day < 10 ? " " : "") + (day + 1) + " day" + (day != 1 ? "s": " ") + ": " + population.join(","));
}
console.log("Final population size: " + population.length);