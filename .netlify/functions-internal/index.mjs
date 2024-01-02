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
		client: {"start":"_app/immutable/entry/start.af887e70.js","app":"_app/immutable/entry/app.963c4fbd.js","imports":["_app/immutable/entry/start.af887e70.js","_app/immutable/chunks/scheduler.3f4853f6.js","_app/immutable/chunks/singletons.f0c0c513.js","_app/immutable/chunks/index.94ac5327.js","_app/immutable/chunks/parse.bee59afc.js","_app/immutable/entry/app.963c4fbd.js","_app/immutable/chunks/store.b773188a.js","_app/immutable/chunks/index.94ac5327.js","_app/immutable/chunks/scheduler.3f4853f6.js","_app/immutable/chunks/index.5586b7df.js"],"stylesheets":[],"fonts":[]},
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
