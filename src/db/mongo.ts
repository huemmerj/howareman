// External Dependencies
import * as mongoDB from 'mongodb';
import { MONGO_URL, DB_NAME } from '$env/static/private';
import { ServerApiVersion } from 'mongodb';

// Global Variables
export const collections: { articles?: mongoDB.Collection } = {};

// Initialize Connection
export async function connect() {
	const client = new mongoDB.MongoClient(MONGO_URL, {
		serverApi: {
			version: ServerApiVersion.v1,
			strict: true,
			deprecationErrors: true
		}
	});
	await client.connect();
	const db: mongoDB.Db = client.db(DB_NAME);

	const articlesCollection: mongoDB.Collection = db.collection('Article');

	collections.articles = articlesCollection;

	console.log(
		`Successfully connected to database: ${db.databaseName} and collection: ${articlesCollection.collectionName}`
	);
}
