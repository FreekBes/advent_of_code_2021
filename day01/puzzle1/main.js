/* ************************************************************************** */
/*                                                                            */
/*                                                        ::::::::            */
/*   main.js                                            :+:    :+:            */
/*                                                     +:+                    */
/*   By: fbes <fbes@student.codam.nl>                 +#+                     */
/*                                                   +#+                      */
/*   Created: 2021/12/02 22:59:45 by fbes          #+#    #+#                 */
/*   Updated: 2021/12/02 22:59:45 by fbes          ########   odam.nl         */
/*                                                                            */
/* ************************************************************************** */

const path = require("path");
const fs = require("fs");

const input = fs.readFileSync(path.join(__dirname, "..", "input.txt"));
const lines = input.toString().split("\n");
const lineCount = lines.length;
let timesIncreased = 0;

for (let i = 1; i < lineCount; i++) {
	if (parseInt(lines[i]) > parseInt(lines[i - 1])) {
		timesIncreased++;
	}
}

console.log("Times increased: " + timesIncreased);