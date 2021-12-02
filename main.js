/* ************************************************************************** */
/*                                                                            */
/*                                                        ::::::::            */
/*   main.js                                            :+:    :+:            */
/*                                                     +:+                    */
/*   By: fbes <fbes@student.codam.nl>                 +#+                     */
/*                                                   +#+                      */
/*   Created: 2021/12/02 23:31:03 by fbes          #+#    #+#                 */
/*   Updated: 2021/12/02 23:31:03 by fbes          ########   odam.nl         */
/*                                                                            */
/* ************************************************************************** */

const path = require('path');
const fs = require('fs');
const readline = require('readline');
const { exit } = require('process');

function askQuestion(query) {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});

	return new Promise(function(resolve) {
		rl.question(query, function(answer) {
			rl.close();
			resolve(answer);
		});
	});
}

function runPuzzle(puzzlePath) {
	try {
		require(path.join(__dirname, puzzlePath, "main.js"));
	}
	catch (err) {
		console.error(err);
		console.warn("Puzzle at " + path.join(puzzlePath, "main.js") + " not found!");
		exit();
	}
}

askQuestion("Which day to run? ").then(function(answer) {
	const day = parseInt(answer);
	if (isNaN(day)) {
		console.warn("Invalid input!");
		exit();
	}
	if (day < 1) {
		console.warn("Invalid day! Day must be at least 1.");
		exit();
	}
	const dayPath = "day" + (day < 10 ? "0" : "") + day;
	const dayExists = fs.existsSync(dayPath);
	if (dayExists) {
		const folders = fs.readdirSync(dayPath);
		if (folders.length > 1) {
			askQuestion("Which puzzle to run? ").then(function(answer2) {
				const puzzle = parseInt(answer2);
				if (isNaN(puzzle)) {
					console.warn("Invalid input!");
					exit();
				}
				if (puzzle != 1 && puzzle != 2) {
					console.warn("Invalid input! Puzzle can be either 1 or 2.");
					exit();
				}
				if (folders.indexOf("puzzle" + puzzle) > -1) {
					runPuzzle(path.join(dayPath, "puzzle" + puzzle));
					exit(0);
				}
				else {
					console.warn("Puzzle " + puzzle + " for day " + day + " was not solved by Freek");
					exit();
				}
			});
		}
		else {
			runPuzzle(path.join(dayPath, "puzzle1"));
			exit(0);
		}
	}
	else {
		console.warn("No puzzles for day " + day + " exist or have been solved by Freek.");
		exit();
	}
});