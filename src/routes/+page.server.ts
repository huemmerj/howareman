import { collections } from '$db/mongo';
export async function load(): Promise<{ data: string }> {
	const article = await collections.articles?.find().toArray();
	console.log(article);
	return { data: JSON.stringify(article) };
}
