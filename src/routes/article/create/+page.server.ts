import { collections } from '$db/mongo';
export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const article = {
			name: formData.get('name'),
			description: formData.get('description'),
			articleNumber: formData.get('articleNumber')
		};
		collections.articles?.insertOne(article);
	}
};
