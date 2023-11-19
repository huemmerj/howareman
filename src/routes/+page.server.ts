import { collections } from '$db/mongo';
import type Article from '../models/article';
export async function load(): Promise<{ data: string }> {
	const articles = (await collections.articles?.find().toArray()) as Article[];
	console.log(articles);
	return { data: JSON.stringify(articles) };
}
