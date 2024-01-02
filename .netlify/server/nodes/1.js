

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.7ac3e615.js","_app/immutable/chunks/scheduler.3f4853f6.js","_app/immutable/chunks/index.5586b7df.js","_app/immutable/chunks/stores.1d680d7a.js","_app/immutable/chunks/singletons.f0c0c513.js","_app/immutable/chunks/index.94ac5327.js"];
export const stylesheets = [];
export const fonts = [];
