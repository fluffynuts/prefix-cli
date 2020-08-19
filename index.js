#!/usr/bin/env node
const
  readline = require("readline"),
  colors = require("ansi-colors");

let prefix = process.argv[2] || "";
const color = process.argv[3] || "white";

prefix += process.env.PREFIX_SPACER || " > ";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let colorFn = colors[color];
if (colorFn === undefined) {
  console.error(`color ${color} is not known! pick one from the following:`);
  Object.keys(colors).forEach(k => console.log(` - ${k}`));
  colorFn = (s => s);
}

rl.on('line', function(line){
    console.log(`${colors[color](prefix)} ${line}`);
})

