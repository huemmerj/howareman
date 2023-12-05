import { collections } from '$db/mongo';
export async function DELETE({ params }) {
	collections.stockTaking?.deleteOne({ uuid: params.id });
	return new Response(null, { status: 204 });
}
