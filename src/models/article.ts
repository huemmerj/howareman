// External dependencies
import type { ObjectId } from 'mongodb';

// Class Implementation
export default class Article {
	constructor(
		public name: string,
		public description: string,
		public articleNumber: string,
		public uuid: string,
		public _id?: string | ObjectId,
		public ean?: string,
		public warehouse?: string,
		public group?: string,
		public category?: string
	) {}
}
