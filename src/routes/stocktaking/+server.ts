import { collections } from '$db/mongo';
import { json } from '@sveltejs/kit';

export async function GET() {
	const stockTaking = await collections.stockTaking?.find().project({ _id: 0 }).toArray();
	return json(stockTaking);
}
