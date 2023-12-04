// External Dependencies
import * as mongoDB from 'mongodb';
import { MONGO_URL, DB_NAME } from '$env/static/private';

// Global Variables
export const collections: {
	articles?: mongoDB.Collection;
	stockTaking?: mongoDB.Collection;
} = {};

// Initialize Connection
export async function connect() {
	const client: mongoDB.MongoClient = new mongoDB.MongoClient(MONGO_URL);
	await client.connect();
	const db: mongoDB.Db = client.db(DB_NAME);

	const articlesCollection: mongoDB.Collection = db.collection('Article');
	const stockTakingCollection: mongoDB.Collection = db.collection('StockTaking');

	collections.articles = articlesCollection;
	collections.stockTaking = stockTakingCollection;

	console.log(
		`Successfully connected to database: ${db.databaseName} and collection: ${articlesCollection.collectionName}`
	);
}
