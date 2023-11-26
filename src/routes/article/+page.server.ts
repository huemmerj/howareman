import { collections } from '$db/mongo';

export async function load() {
	const articles = await collections.articles?.find().project({ _id: 0 }).toArray();

	console.log(articles);
	return {
		data: articles
	};
}
