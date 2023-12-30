import * as mongoDB from 'mongodb';
import 'dotenv/config';

if (!process.env.MONGO_URL) {
	throw new Error('Missing MONGO_URL in .env file');
}

const client = new mongoDB.MongoClient(process.env.MONGO_URL);
await client.connect();
const db = client.db('howareman');

db.collection('Article').deleteMany({});
