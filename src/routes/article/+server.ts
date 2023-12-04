import { collections } from '$db/mongo';
import { json } from '@sveltejs/kit';

export async function GET({ url }) {
	const search = url.searchParams.get('name');
	const articleNumber = url.searchParams.get('articleNumber');

	if (articleNumber) {
		const article = await collections.articles
			?.find({ articleNumber: articleNumber })
			.project({ _id: 0 })
			.toArray();
		return json(article);
	}
	if (search) {
		const articles = await collections.articles
			?.find({ name: { $regex: search, $options: 'i' } })
			.project({ _id: 0 })
			.toArray();
		return json(articles);
	}
	const articles = await collections.articles?.find().project({ _id: 0 }).toArray();
	return json(articles);
}
export async function DELETE({ url }) {
	const articleNumber = url.searchParams.get('articleNumber');
	await collections.articles?.deleteOne({ articleNumber: articleNumber });
	return json({ message: 'success' });
}