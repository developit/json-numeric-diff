#!/usr/bin/env node

var fs = require('fs'),
	chalk = require('chalk'),
	diff = require('.'),
	args = require('yargs').argv;

var changes = diff(
	readJson(args._[0]),
	readJson(args._[1])
);

var colors = args.colors ? args.colors.split(/\s*,\s*/) : [args.color1 || 'green', args.color2 || 'red'];

if (args.invert || args.inverse) colors.reverse();

var format = 'ratio';
if (args.percent) format = 'percent';
if (args.format) format = args.format;		// ratio, percent, delta, difference

if (args.sort || args.sortby) {
	changes = changes.sort(function(a, b){ return a[args.sortby || 'ratio'] - b[args.sortby || 'ratio']; });
	if (String(args.sort).match(/(asc|inver(t|se))/gi)) changes.reverse();
}

process.stdout.write(
	'{\n'+
	changes.map(function(change) {
		var color = change.ratio > 1 ? colors[0] : colors[1];
		return '  ' + JSON.stringify(change.key) + ': ' + chalk[color](JSON.stringify(change[format]));
	}).join(',\n')+
	'\n}\n'
);

function readJson(file) {
	var data = fs.readFileSync(file, 'utf8'),
		obj;
	if (!data) throw new Error('File not found: '+file);
	try {
		obj = JSON.parse(data);
	} catch(err) {
		throw new Error('Invalid JSON: '+file);
	}
	return obj;
}
