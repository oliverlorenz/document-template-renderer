import { Command } from 'commander';
import { writeFileSync, accessSync } from 'fs';
import {} from 'yaml';
import { render, set } from 'carbone';
import { read } from 'yaml-import';

const command = new Command()
	.requiredOption('-t, --template <template>', 'template file')
	.requiredOption('-i, --input <file>', 'input file')
	.requiredOption('-o, --output <file>', 'output file')
	.option('-l, --language <language>', 'language')
	.version('0.0.1')
	.parse(process.argv);

set({
	lang: command.lang || 'en-us',
});

try {
	accessSync(command.input);
	accessSync(command.template);
} catch (err) {
	console.log(err.message);
	process.exit(1);
}

render(command.template, read(command.input), {}, function (err, result) {
	if (err) {
		return console.log(err);
	}
	writeFileSync(command.output, result);
	console.log('done');
});
