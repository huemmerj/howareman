import { collections } from '$db/mongo';
import { ObjectId } from 'mongodb';
import type Article from '../../models/article';
import * as devalue from 'devalue';

export async function load() {
	const articles = (await collections.articles?.find().toArray()) as Article[];

	console.log(articles);
	return {
		data: devalue.stringify(articles, {
			ObjectId: (value: { toString: () => unknown }) => {
				if (value instanceof ObjectId) {
					return value.toString(); // Convert ObjectId to string
				}
				return undefined; // Return undefined for non-ObjectId values
			}
		})
	};
}
