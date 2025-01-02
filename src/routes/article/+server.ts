import { collections } from '$db/mongo';
import { json } from '@sveltejs/kit';

import Typesense from 'typesense'

export async function GET({ url, locals }) {
	const search = url.searchParams.get('name');
	const articleNumber = url.searchParams.get('articleNumber');
	if (articleNumber) {
		const article = await collections.articles?.findOne({
			$or: [{ articleNumber: articleNumber }, { ean: articleNumber }]
		});
		return article ? json([article]) : json([]);
	}
	if (search) {
		const client = new Typesense.Client({
			nodes: [
				{
					host: 'localhost',
					port: 8108,
					protocol: 'http',
				}
			],
			apiKey: 'xyz',
			connectionTimeoutSeconds: 2
		});

		const searchResults = await client.collections('articles').documents().search({
      q: search,           // Query to search
      query_by: 'name,description,category', // Fields to search
      per_page: 100                            // Limit to 5 documents
    });

		// const articles = await collections.articles
		// 	?.aggregate([
		// 		{
		// 			$search: {
		// 				index: 'default',
		// 				text: {
		// 					query: search,
		// 					path: ['name', 'description']
		// 				}
		// 			}
		// 		}
		// 	])
		// 	.limit(100)
		// 	.toArray();
		// return json(articles);
		// const articles = await collections.articles
		// 	?.find({ $text: { $search: search } })
		// 	.limit(100)
		// 	.toArray();

		const articles = searchResults.hits?.map(hit => {
			const {vector, ...rest} = hit.document
			return rest
		})
		return json(articles);
	}
	const articles = await collections.articles?.find().limit(100).project({ _id: 0 }).toArray();
	return json(articles);
}
