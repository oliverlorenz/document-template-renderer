#!/usr/bin/env node

import { Command } from 'commander';
import { writeFileSync, accessSync } from 'fs';
import {} from 'yaml';
import * as carbone from 'carbone';
import { read } from 'yaml-import';

const command = new Command()
	.requiredOption('-t, --template <template>', 'template file')
	.requiredOption('-i, --input <file>', 'input file')
	.requiredOption('-o, --output <file>', 'output file')
	.option('-l, --language <language>', 'language')
	.version('0.0.1')
	.parse(process.argv);

carbone.set({
	lang: command.language || 'en-us',
});

try {
	accessSync(command.input);
	accessSync(command.template);
} catch (err) {
	console.log(err.message);
	process.exit(1);
}

carbone.render(
	command.template,
	read(command.input),
	{
		lang: command.language || 'en-us',
	},
	function (err, result) {
		if (err) {
			return console.log(err);
		}
		writeFileSync(command.output, result);
		console.log('done');
	}
);
