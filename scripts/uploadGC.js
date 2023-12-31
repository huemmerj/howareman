import fs from 'fs';
import readline from 'readline';
import iconv from 'iconv-lite';
import * as mongoDB from 'mongodb';
import 'dotenv/config';

if (!process.env.MONGO_URL) {
	throw new Error('Missing MONGO_URL in .env file');
}

const client = new mongoDB.MongoClient(process.env.MONGO_URL);
await client.connect();
const db = client.db('howareman');

const articles = new Map();

const filePath = '/home/jens/projects/howareman/Datanorm/GC/5STAMM/datanorm.001';
const fileEncoding = 'CP852'; // Use the correct code page, like CP852

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
	const article = {};
	article.articleNumber = splitted[2];
	if (splitted[0] === 'A') {
		article.name = splitted[4];
		article.description = splitted[5];
		article.category = splitted[10];
		// console.log(splitted);
		createOrUpdateArticle(article);
	}
});

rl.on('close', () => {
	console.log('File processed.');
	const articleArray = [...articles.values()];
	const bulkOps = articleArray.map((article) => ({
		updateOne: {
			filter: { articleNumber: article.articleNumber },
			update: { $set: article },
			upsert: true // If the document doesn't exist, insert it
		}
	}));

	db.collection('Article').bulkWrite(bulkOps);
	console.log(articleArray);
});

const createOrUpdateArticle = (article) => {
	const articleNumber = article.articleNumber;
	if (articles.has(articleNumber)) {
		const existingArticle = articles.get(articleNumber);
		articles.set(articleNumber, {
			...existingArticle,
			...article
		});
	} else {
		article.warehouse = 'gc';
		article.group = '5STAMM';
		articles.set(articleNumber, article);
	}
};
