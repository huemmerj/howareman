

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.a19664cd.js","_app/immutable/chunks/scheduler.e108d1fd.js","_app/immutable/chunks/index.c1d64499.js","_app/immutable/chunks/singletons.06db9a45.js"];
export const stylesheets = [];
export const fonts = [];
