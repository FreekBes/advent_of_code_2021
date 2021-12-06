/* ************************************************************************** */
/*                                                                            */
/*                                                        ::::::::            */
/*   main.js                                            :+:    :+:            */
/*                                                     +:+                    */
/*   By: fbes <fbes@student.codam.nl>                 +#+                     */
/*                                                   +#+                      */
/*   Created: 2021/12/06 20:35:43 by fbes          #+#    #+#                 */
/*   Updated: 2021/12/06 20:35:43 by fbes          ########   odam.nl         */
/*                                                                            */
/* ************************************************************************** */

// THIS METHOD IS SLOW AS FUCK AND REQUIRES LOTS OF MEMORY
// IT DOES NOT WORK FOR 256 DAYS
// USE main.js INSTEAD

const path = require("path");
const fs = require("fs");

const simulateDays = 256;
let createdFiles = 0;
let files, input;
let day, i, j;
let population;

function clearPopu() {
	files = fs.readdirSync(path.join(__dirname, "temp"));
	// > 1 because we want to skip the one and only folder inside
	// actually, it is handled in the for loop, we just don't want to log it
	if (files.length > 1) {
		console.log("Cleaning up popu folder...");
	}
	for (i = 0; i < files.length; i++) {
		fs.unlinkSync(path.join(__dirname, "temp", files[i]));
	}
}

// check if temp dir exists
if (!fs.existsSync(path.join(__dirname, "temp"))) {
	console.log("popu dir does not exist, creating...");
	fs.mkdirSync(path.join(__dirname, "temp"));
}
else {
	clearPopu();
}

// copy initial population to temp
fs.copyFileSync(path.join(__dirname, "..", "example.txt"), path.join(__dirname, "temp", "popu-0000000000.txt"));

function sim(popu, thisFile, createdFiles) {
	let popuSize = popu.length;
	for (let i = 0; i < popuSize; i++) {
		popu[i]--;
		if (popu[i] < 0) {
			popu[i] = 6;
			popu.push(8);
		}
	}
	if (popu.length >= 70000000) {
		let splicedPopu = popu.splice(35000000);
		createdFiles++;
		fs.writeFileSync(path.join(__dirname, "temp", "popu-" + createdFiles.toString().padStart(10, "0") + ".txt"), splicedPopu.join(","));
	}
	fs.writeFileSync(path.join(__dirname, "temp", thisFile), popu.join(","));
	return (createdFiles);
}

// simulate days
for (day = 0; day < simulateDays; day++) {
	console.log("Simulating day " + (day + 1) + "...");
	files = fs.readdirSync(path.join(__dirname, "temp"));
	for (i = 0; i < files.length; i++) {
		input = fs.readFileSync(path.join(__dirname, "temp", files[i]));
		population = input.toString().split(",");
		for (j = 0; j < population.length; j++) {
			population[j] = parseInt(population[j]);
		}
		//console.log(population);
		createdFiles = sim(population, files[i], createdFiles);
	}
}

// get total population
let finalPopuSize = 0;
files = fs.readdirSync(path.join(__dirname, "temp"));
for (i = 0; i < files.length; i++) {
	input = fs.readFileSync(path.join(__dirname, "temp", files[i]));
	finalPopuSize += input.toString().match(/,/g).length + 1;
}
console.log("Final population size: " + finalPopuSize);

// clearPopu();