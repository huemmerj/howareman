// External dependencies
import type { ObjectId } from 'mongodb';

// Class Implementation
export default class Article {
	constructor(public title: string, public description: string, public _id?: ObjectId) {}
}
