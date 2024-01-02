import { collections } from '$db/mongo';
import { json } from '@sveltejs/kit';

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
		const articles = await collections.articles
			?.aggregate([
				{
					$search: {
						index: 'default',
						text: {
							query: search,
							path: ['name', 'description']
						}
					}
				}
			])
			.limit(100)
			.toArray();
		return json(articles);
	}
	const articles = await collections.articles?.find().limit(100).project({ _id: 0 }).toArray();
	return json(articles);
}
