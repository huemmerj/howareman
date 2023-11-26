import { collections } from '$db/mongo';
export async function DELETE({ params }) {

	collections.articles?.deleteOne({ uuid: params.id });
	return new Response(null, { status: 204 });
}