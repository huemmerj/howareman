import { collections } from '$db/mongo';
import { json } from '@sveltejs/kit';

export async function GET({ url }) {
	const search = url.searchParams.get('search');

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
