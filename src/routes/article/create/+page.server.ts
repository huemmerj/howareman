import { collections } from '$db/mongo';
import { v4 as uuidv4 } from 'uuid';
export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();

		const article = {
			uuid: uuidv4(),
			name: formData.get('name'),
			description: formData.get('description'),
			articleNumber: formData.get('articleNumber')
		};
		console.log(article);
		collections.articles?.insertOne(article);
	}
};
