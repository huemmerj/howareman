import { collections } from '$db/mongo';
export async function DELETE({ params }) {
	collections.stockTaking?.deleteOne({ uuid: params.id });
	return new Response(null, { status: 204 });
}
export async function GET({ params }) {
	const stockTaking = await collections.stockTaking?.findOne({ uuid: params.id });
	return new Response(JSON.stringify(stockTaking), { status: 200 });
}
