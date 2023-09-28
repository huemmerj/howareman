import { init } from '../serverless.js';

export const handler = init((() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png","manifest.json"]),
	mimeTypes: {".png":"image/png",".json":"application/json"},
	_: {
		client: {"start":"_app/immutable/entry/start.33ca74ac.js","app":"_app/immutable/entry/app.dc76b746.js","imports":["_app/immutable/entry/start.33ca74ac.js","_app/immutable/chunks/scheduler.e108d1fd.js","_app/immutable/chunks/singletons.06db9a45.js","_app/immutable/entry/app.dc76b746.js","_app/immutable/chunks/scheduler.e108d1fd.js","_app/immutable/chunks/index.c1d64499.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('../server/nodes/0.js')),
			__memo(() => import('../server/nodes/1.js')),
			__memo(() => import('../server/nodes/2.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})());
