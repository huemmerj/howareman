import fs from 'fs';
import { parse } from 'csv-parse';
import * as mongoDB from 'mongodb';

import { v4 as uuidv4 } from 'uuid';

const client = new mongoDB.MongoClient('mongodb://localhost:27017');
await client.connect();
const db = client.db('howareman');

fs.createReadStream('../Lagerbestand.csv')
	.pipe(parse({ delimiter: ',', from_line: 2 }))
	.on('data', function (row) {
		db.collection('Article').insertOne({
			name: row[3],
			articleNumber: row[2],
			uuid: uuidv4()
		});
		console.log(row[2]);
	});

// public name: string,
// public description: string,
// public articleNumber: string,
// public uuid: string,
// public _id?: string | ObjectId,
