// import { collections } from '$db/mongo';
export async function PUT({ params, request }) {
	const body = await request.json();
	console.log(body);
	const { id } = params;
	console.log(id);
	return new Response(null, { status: 204 });
}
