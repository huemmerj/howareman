

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.d6fbd69b.js","_app/immutable/chunks/scheduler.04c87043.js","_app/immutable/chunks/index.5e9aae30.js","_app/immutable/chunks/stores.090503ff.js","_app/immutable/chunks/singletons.4a820105.js"];
export const stylesheets = [];
export const fonts = [];
