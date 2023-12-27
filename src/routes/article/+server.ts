import { collections } from '$db/mongo';
import { json } from '@sveltejs/kit';

export async function GET({ url }) {
	const search = url.searchParams.get('name');
	const articleNumber = url.searchParams.get('articleNumber');
	if (articleNumber) {
		const article = await collections.articles?.findOne({
			$or: [{ articleNumber: articleNumber }, { ean: articleNumber }]
		});
		return json([article]);
	}
	if (search) {
		const articles = await collections.articles
			?.find({
				$or: [
					{ name: { $regex: search, $options: 'i' } },
					{ description: { $regex: search, $options: 'i' } }
				]
			})
			.limit(100)
			.project({ _id: 0 })
			.toArray();
		return json(articles);
	}
	const articles = await collections.articles?.find().limit(100).project({ _id: 0 }).toArray();
	return json(articles);
}
