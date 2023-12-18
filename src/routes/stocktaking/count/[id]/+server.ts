import { collections } from '$db/mongo';
// import { stockTaking } from '$lib/dialogs/ArticleCountDialog.svelte';
export async function PUT({ params, request }) {
	const body = await request.json();

	for (const countedArticle of body) {
		const { uuid, count, name } = countedArticle;
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
							name
						}
					}
				}
			);
		}
	}
	return new Response(null, { status: 204 });
}
