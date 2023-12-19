import { collections } from '$db/mongo';

export async function GET({ params }) {
	const stockTaking = await collections.stockTaking?.findOne({
		uuid: params.id
	});
	const csvContent = stockTaking?.articles
		.map((article) => `${article.uuid}; ${article.name}; ${article.count}`)
		.join('\n');

	return new Response(csvContent, {
		headers: {
			'Content-Type': 'text/csv',
			'Content-Disposition': 'attachment; filename=stockTaking.csv'
		}
	});
}
