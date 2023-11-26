// import { collections } from '$db/mongo';
// // import { ObjectId } from 'mongodb';
// import type Article from '../../models/article';
// import type { PageServerLoad } from './$types';
// // import * as devalue from 'devalue';

// export const load: PageServerLoad = async () => {
// 	const articles = (await collections.articles?.find().project({ _id: 0 }).toArray()) as Article[];
// 	// const data = devalue.stringify(articles, {
// 	// 	ObjectId: (value: { toString: () => unknown }) => {
// 	// 		if (value instanceof ObjectId) {
// 	// 			return value.toString(); // Convert ObjectId to string
// 	// 		}
// 	// 		return undefined; // Return undefined for non-ObjectId values
// 	// 	}
// 	// });
// 	return {
// 		data: JSON.stringify(articles)
// 	};
// };
import * as mongoDB from 'mongodb';
import { MONGO_URL, DB_NAME } from '$env/static/private';
// import { ServerApiVersion } from 'mongodb';

const collections: { articles?: mongoDB.Collection } = {};

async function connect() {
	const client = new mongoDB.MongoClient(MONGO_URL);
	await client.connect();
	const db: mongoDB.Db = client.db(DB_NAME);

	const articlesCollection: mongoDB.Collection = db.collection('Article');

	collections.articles = articlesCollection;

	console.log(
		`Successfully connected to database: ${db.databaseName} and collection: ${articlesCollection.collectionName}`
	);
}
export const load = async () => {
	await connect();
	const data = await collections.articles?.find({}).project({ _id: 0 }).toArray();
	return {
		data
	};
};
