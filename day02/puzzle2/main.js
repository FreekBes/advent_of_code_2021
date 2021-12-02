/* ************************************************************************** */
/*                                                                            */
/*                                                        ::::::::            */
/*   main.js                                            :+:    :+:            */
/*                                                     +:+                    */
/*   By: fbes <fbes@student.codam.nl>                 +#+                     */
/*                                                   +#+                      */
/*   Created: 2021/12/03 00:10:06 by fbes          #+#    #+#                 */
/*   Updated: 2021/12/03 00:10:06 by fbes          ########   odam.nl         */
/*                                                                            */
/* ************************************************************************** */

const path = require("path");
const fs = require("fs");
const { exit } = require("process");

const input = fs.readFileSync(path.join(__dirname, "..", "input.txt"));
const lines = input.toString().split("\n");
const lineCount = lines.length;

let horiz = 0;
let depth = 0;
let aim = 0;

for (let i = 0; i < lineCount; i++) {
	if (lines[i].indexOf("forward ") == 0) {
		horiz += parseInt(lines[i].substr(lines[i].indexOf(" ") + 1));
		depth += aim * parseInt(lines[i].substr(lines[i].indexOf(" ") + 1));
	}
	else if (lines[i].indexOf("up ") == 0) {
		aim -= parseInt(lines[i].substr(lines[i].indexOf(" ") + 1));
	}
	else if (lines[i].indexOf("down ") == 0) {
		aim += parseInt(lines[i].substr(lines[i].indexOf(" ") + 1));
	}
	else {
		console.warn("Invalid input on line " + (i + 1) + ": " + lines[i]);
		exit();
	}
}

console.log("Horiz: " + horiz);
console.log("Depth: " + depth);
console.log("Aim: " + depth);
console.log("Result: " + (horiz * depth));