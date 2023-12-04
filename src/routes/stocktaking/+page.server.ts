import { collections } from '$db/mongo';

export async function load() {
	const stocktakings = await collections.stockTaking?.find().project({ _id: 0 }).toArray();

	return {
		data: stocktakings
	};
}
