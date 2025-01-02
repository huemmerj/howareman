import fs from 'fs';
import readline from 'readline';
import iconv from 'iconv-lite';

const fileEncoding = 'utf-8';

const stockTakingFilePath = '/home/jens/projects/howaremanPreise/sanitaerheinze/stockTaking.csv';

const stockTaking = [];
// Heinze
const articlesHeinzeFilePath = '/home/jens/projects/howaremanPreise/sanitaerheinze/datanorm.001';

const nettoPricesHeinzeFilePath =
	'/home/jens/projects/howaremanPreise/sanitaerheinze/HUGE401001_datpreis.001';

const discountGroupHeinzeFilePath =
	'/home/jens/projects/howaremanPreise/sanitaerheinze/HUGE401001_datanorm.rab';

const articlesHeinze = new Map();
const nettoPricesHeinze = new Map();
const discountGroupHeinze = new Map();

const readArticlesHeinze = async () => {
	const fileStream = fs.createReadStream(articlesHeinzeFilePath);

	const decoderStream = iconv.decodeStream(fileEncoding);

	const decodedFileStream = fileStream.pipe(decoderStream);
	return new Promise((resolve) => {
		const rl = readline.createInterface({
			input: decodedFileStream,
			crlfDelay: Infinity
		});

		rl.on('line', (line) => {
			const splitted = line.split(';');
			if (splitted[0] === 'A') {
				const article = {};
				article.articleNumber = splitted[2];
				article.bruttoPrice = splitted[9];
				article.discountGroup = splitted[10];
				articlesHeinze.set(article.articleNumber, article);
				console.log(article);
			}
		});

		rl.on('close', () => {
			console.log('File processed.');
			resolve();
		});
	});
};

const readNettoPricesHeinze = async () => {
	const fileStream = fs.createReadStream(nettoPricesHeinzeFilePath);

	const decoderStream = iconv.decodeStream(fileEncoding);

	const decodedFileStream = fileStream.pipe(decoderStream);
	return new Promise((resolve) => {
		const rl = readline.createInterface({
			input: decodedFileStream,
			crlfDelay: Infinity
		});

		rl.on('line', (line) => {
			const splitted = line.split(';');
			if (splitted[0] === 'P') {
				const article1 = {};
				const article2 = {};
				const article3 = {};

				article1.articleNumber = splitted[2];
				article1.nettoPrice = splitted[4];
				article2.articleNumber = splitted[11];
				article2.nettoPrice = splitted[13];
				article3.articleNumber = splitted[20];
				article3.nettoPrice = splitted[22];

				nettoPricesHeinze.set(article1.articleNumber, article1);
				nettoPricesHeinze.set(article2.articleNumber, article2);
				nettoPricesHeinze.set(article3.articleNumber, article3);
			}
		});

		rl.on('close', () => {
			console.log('File processed.');
			resolve();
		});
	});
};

const readDiscountGroupsHeinze = async () => {
	const fileStream = fs.createReadStream(discountGroupHeinzeFilePath);

	const decoderStream = iconv.decodeStream(fileEncoding);

	const decodedFileStream = fileStream.pipe(decoderStream);
	return new Promise((resolve) => {
		const rl = readline.createInterface({
			input: decodedFileStream,
			crlfDelay: Infinity
		});

		rl.on('line', (line) => {
			const splitted = line.split(';');
			if (splitted[0] === 'R') {
				const discountGroup = {};
				discountGroup.discountGroup = splitted[2];
				discountGroup.discount = splitted[4];
				discountGroupHeinze.set(discountGroup.discountGroup, discountGroup);
			}
		});

		rl.on('close', () => {
			console.log('File processed.');
			resolve();
		});
	});
};

const readStockTakingAndSetPrices = async () => {
	const fileStream = fs.createReadStream(stockTakingFilePath);

	const decoderStream = iconv.decodeStream(fileEncoding);

	const decodedFileStream = fileStream.pipe(decoderStream);
	return new Promise((resolve) => {
		const rl = readline.createInterface({
			input: decodedFileStream,
			crlfDelay: Infinity
		});

		rl.on('line', (line) => {
			const splitted = line.split(';');
			const article = {};
			article.articleNumber = splitted[0];
			article.name = splitted[1];
			article.count = splitted[2];
			article.warehouse = splitted[3];
			if (article.warehouse === ' Heinze') {
				const articleHeinze = articlesHeinze.get(article.articleNumber);
				article.discountGroup = articleHeinze.discountGroup;
				const bruttoPrice = articleHeinze.bruttoPrice;
				let nettoPrice = nettoPricesHeinze.get(article.articleNumber)?.nettoPrice;
				if (!nettoPrice) {
					console.log('discount', discountGroupHeinze.get(article.discountGroup)?.discount);
					nettoPrice =
						bruttoPrice * (1 - discountGroupHeinze.get(article.discountGroup)?.discount / 10000);
				}

				article.bruttoPrice = bruttoPrice;
				article.nettoPrice = nettoPrice;
				stockTaking.push(article);
			}
			console.log(article);
		});

		rl.on('close', () => {
			console.log('File processed.');
			resolve();
		});
	});
};

readArticlesHeinze().then(() => {
	console.log('Articles Heinze: ', articlesHeinze.size);
	readNettoPricesHeinze()
		.then(() => {
			console.log('Netto Prices Heinze: ', nettoPricesHeinze);
		})
		.then(() => {
			readDiscountGroupsHeinze()
				.then(() => {
					console.log('Discount Groups Heinze: ', discountGroupHeinze);
				})
				.then(() => {
					readStockTakingAndSetPrices().then(() => {
						console.log('Stock Taking: ', stockTaking);

						// create CSV from stocktaking and save to file
						const csv = stockTaking.map((article) => {
							return `${article.articleNumber};${article.name};${article.count};${
								article.warehouse
							};${article.bruttoPrice / 100};${article.nettoPrice / 100}`;
						});
						fs.writeFile(
							'/home/jens/projects/howaremanPreise/stockTakingWithPrices.csv',
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
		});
});
