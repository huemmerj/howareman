import { collections } from '$db/mongo';
import { json } from '@sveltejs/kit';

export async function GET({ url }) {
	const search = url.searchParams.get('name');
	if (search) {
		const stockTakings = await collections.stockTaking
			?.find({ name: { $regex: search, $options: 'i' } })
			.project({ _id: 0 })
			.toArray();
		return json(stockTakings);
	}
	const stockTaking = await collections.stockTaking?.find().project({ _id: 0 }).toArray();
	return json(stockTaking);
}
