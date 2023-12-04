import { collections } from '$db/mongo';
import { v4 as uuidv4 } from 'uuid';
export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();

		const stockTaking = {
			uuid: uuidv4(),
			name: formData.get('name'),
			articles: []
		};
		console.log(stockTaking);
		collections.stockTaking?.insertOne(stockTaking);
	}
};
