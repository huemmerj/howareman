export const manifest = (() => {
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
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js')),
			__memo(() => import('./nodes/8.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/article",
				pattern: /^\/article\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: __memo(() => import('./entries/endpoints/article/_server.ts.js'))
			},
			{
				id: "/article/create",
				pattern: /^\/article\/create\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/article/[id]",
				pattern: /^\/article\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/article/_id_/_server.ts.js'))
			},
			{
				id: "/login",
				pattern: /^\/login\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/orderlist",
				pattern: /^\/orderlist\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/stocktaking",
				pattern: /^\/stocktaking\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: __memo(() => import('./entries/endpoints/stocktaking/_server.ts.js'))
			},
			{
				id: "/stocktaking/count/[id]",
				pattern: /^\/stocktaking\/count\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/stocktaking/count/_id_/_server.ts.js'))
			},
			{
				id: "/stocktaking/create",
				pattern: /^\/stocktaking\/create\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/stocktaking/download/[id]",
				pattern: /^\/stocktaking\/download\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/stocktaking/download/_id_/_server.ts.js'))
			},
			{
				id: "/stocktaking/[id]",
				pattern: /^\/stocktaking\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/stocktaking/_id_/_server.ts.js'))
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
