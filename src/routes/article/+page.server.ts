import { collections } from '$db/mongo';

export async function load() {
	const articles = await collections.articles?.find().limit(100).project({ _id: 0 }).toArray();

	return {
		data: articles
	};
}
