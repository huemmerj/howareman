// External dependencies
import type { ObjectId } from 'mongodb';

// Class Implementation
export default class StockTaking {
	constructor(
		public name: string,
		public uuid: string,
		public article?: {
			uuid: string;
			articleNumber: string;
			name: string;
			count: number;
		}[],
		public _id?: string | ObjectId
	) {}
}
