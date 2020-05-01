#!/usr/bin/env node
const
  readline = require("readline"),
  chalk = require("chalk");

let prefix = process.argv[2] || "";
const color = process.argv[3] || "white";

prefix += process.env.PREFIX_SPACER || " > ";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let chalkFn = chalk[color];
if (!chalkFn) {
  console.error("chalk has no color: " + color);
  chalkFn = s => s;
} else {
  chalkFn = chalkFn.bind(chalk);
}

rl.on('line', function(line){
    console.log(`${chalk[color](prefix)} ${line}`);
})

