import { collections } from '$db/mongo';

export async function GET({ params }) {
	const stockTaking = await collections.stockTaking?.findOne({
		uuid: params.id
	});
	console.log(stockTaking?.articles);
	const csvContent = stockTaking?.articles
		.map(
			(article) =>
				`${article.articleNumber}; ${article.name}; ${article.count}; ${article.warehouse}; ${article.group}; ${article.category}`
		)
		.join('\n');

	return new Response(csvContent, {
		headers: {
			'Content-Type': 'text/csv',
			'Content-Disposition': 'attachment; filename=stockTaking.csv'
		}
	});
}
