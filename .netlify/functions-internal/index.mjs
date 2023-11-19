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
		client: {"start":"_app/immutable/entry/start.49a3b88c.js","app":"_app/immutable/entry/app.e72f5ebe.js","imports":["_app/immutable/entry/start.49a3b88c.js","_app/immutable/chunks/scheduler.04c87043.js","_app/immutable/chunks/singletons.4a820105.js","_app/immutable/entry/app.e72f5ebe.js","_app/immutable/chunks/scheduler.04c87043.js","_app/immutable/chunks/index.5e9aae30.js"],"stylesheets":[],"fonts":[]},
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
