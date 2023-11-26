import { collections } from '$db/mongo';
import { json } from '@sveltejs/kit';

export async function GET() {
	const articles = await collections.articles?.find().project({ _id: 0 }).toArray();
	return json(articles);
}
