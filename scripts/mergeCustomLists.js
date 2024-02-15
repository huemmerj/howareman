import fs, { read } from 'fs';
import readline from 'readline';
import iconv from 'iconv-lite';

const fileEncoding = 'utf-8';

const stockTakingFromAppFilePath =
	'/home/jens/projects/howareman/Stocktaking/stockTakingFromApp.csv';
const stockTaking2FilePath =
	'/home/jens/projects/howareman/Stocktaking/LagerbestandZum31.12.2023.csv';

const stockTaking = new Map();
const stockTaking2 = new Map();

const stockTakingFinal = [];

let datensätze = 0;
let doppelt = 0;
const readStockTaking1 = async () => {
	const fileStream = fs.createReadStream(stockTakingFromAppFilePath);

	const decoderStream = iconv.decodeStream(fileEncoding);

	const decodedFileStream = fileStream.pipe(decoderStream);
	return new Promise((resolve) => {
		const rl = readline.createInterface({
			input: decodedFileStream,
			crlfDelay: Infinity
		});

		rl.on('line', (line) => {
			datensätze++;
			const splitted = line.split(';');
			const article = {};
			article.articleNumber = splitted[0];
			article.count = splitted[2];
			article.name = splitted[1];
			article.warehouse = splitted[3];
			article.discountGroup = splitted[5];
			stockTaking.set(article.articleNumber, article);
		});

		rl.on('close', () => {
			console.log('File processed.');
			resolve();
		});
	});
};

const readStockTaking2 = async () => {
	const fileStream = fs.createReadStream(stockTaking2FilePath);

	const decoderStream = iconv.decodeStream(fileEncoding);

	const decodedFileStream = fileStream.pipe(decoderStream);
	return new Promise((resolve) => {
		const rl = readline.createInterface({
			input: decodedFileStream,
			crlfDelay: Infinity
		});

		rl.on('line', (line) => {
			datensätze++;
			const splitted = line.split(';');
			const articleNumber = splitted[2];
			const count = splitted[0];
			const name = splitted[3];

			const article = {};
			article.name = name;
			article.count = count;
			article.articleNumber = articleNumber;
			article.nettoPrice = splitted[4];

			if (stockTaking2.has(articleNumber)) {
				doppelt++;
				console.log(articleNumber);
				article.count = parseInt(stockTaking2.get(articleNumber).count) + parseInt(count);
			}
			stockTaking2.set(articleNumber, article);
			// console.log(splitted);
		});

		rl.on('close', () => {
			resolve();
		});
	});
};

readStockTaking1().then(() => {
	readStockTaking2().then(() => {
		console.log(stockTaking.size);
		console.log(stockTaking2.size);
		stockTaking.forEach((value, key) => {
			if (stockTaking2.has(key)) {
				// console.log('doppelt:' + key);
				doppelt++;
				value.count = parseInt(stockTaking2.get(key).count) + parseInt(value.count);
				value.nettoPrice = stockTaking2.get(key).nettoPrice;
			}
			stockTakingFinal.push(value);
		});
		stockTaking2.forEach((value, key) => {
			if (!stockTaking.has(key)) {
				doppelt++;
				stockTakingFinal.push(value);
			}
		});
		console.log(stockTakingFinal.length);
		console.log(doppelt);
		const csv = stockTakingFinal.map((article) => {
			return `${article.articleNumber};${article.name};${article.count};${article.warehouse};;${article.nettoPrice}`;
		});
		fs.writeFile(
			'/home/jens/projects/howareman/Stocktaking/mergedStockTaking.csv',
			csv.join('\n'),
			(err) => {
				if (err) {
					console.error(err);
					return;
				}
				//file written successfully
			}
		);
	});
});
