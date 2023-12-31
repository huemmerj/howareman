// External dependencies
import type { ObjectId } from 'mongodb';

// Class Implementation
export default class StockTaking {
	constructor(
		public name: string,
		public uuid: string,
		public articles?: {
			uuid: string;
			articleNumber: string;
			name: string;
			count: number;
			warehouse?: string;
			group?: string;
			category?: string;
		}[],
		public _id?: string | ObjectId
	) {}
}
