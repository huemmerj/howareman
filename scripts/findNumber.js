import fs from 'fs';
import readline from 'readline';
import iconv from 'iconv-lite';

const filePath = '/home/jens/projects/howareman/Datanorm/GC/5STAMM/datanorm.001';
const fileEncoding = 'CP852'; // Use the correct code page, like CP852

let lines = 0;

let found = false;
let foundLine = [];
// Create a readable stream from the file
const fileStream = fs.createReadStream(filePath);

// Create a decoding stream using iconv-lite
const decoderStream = iconv.decodeStream(fileEncoding);

// Pipe the file stream through the decoding stream
const decodedFileStream = fileStream.pipe(decoderStream);

// Create a readline interface
const rl = readline.createInterface({
	input: decodedFileStream,
	crlfDelay: Infinity
});

rl.on('line', (line) => {
	const splitted = line.split(';');

	if (splitted[0] === 'A' || splitted[0] === 'P') {
		console.log(line);
		console.log('Category: ', splitted[10]);
		throw new Error('Found A or P');
	}
	console.log(lines, ': ', line);
	lines++;
});

rl.on('close', () => {
	console.log('File processed.');
	console.log(filePath);
	console.log(found);
	console.log(foundLine);
});
