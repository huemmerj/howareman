import { collections } from '$db/mongo';
import { error } from '@sveltejs/kit';
// import { stockTaking } from '$lib/dialogs/ArticleCountDialog.svelte';
export async function PUT({ params, request }) {
	try {
		const body = await request.json();
		for (const countedArticle of body) {
			console.log(countedArticle);
			const { uuid, count, name, articleNumber, warehouse, group, category } = countedArticle;
			const { id } = params;
			const stockTaking = await collections.stockTaking?.findOne({
				uuid: id
			});

			if (!stockTaking) {
				return new Response(null, { status: 404 });
			}
			console.log(stockTaking);
			const article = stockTaking.articles?.find((article) => article.uuid === uuid);
			console.log(article);
			if (article) {
				await collections.stockTaking?.updateOne(
					{
						uuid: id,
						'articles.uuid': uuid
					},
					{
						$set: {
							'articles.$.count': count
						}
					}
				);
			} else {
				collections.stockTaking?.updateOne(
					{
						uuid: id
					},
					{
						$push: {
							articles: {
								uuid,
								count,
								name,
								articleNumber,
								warehouse: warehouse ? warehouse : null,
								group: group ? group : null,
								category: category ? category : null
							}
						}
					}
				);
			}
		}
		return new Response(null, { status: 201 });
	} catch (e) {
		console.log(e);
		return error(400);
	}
}
