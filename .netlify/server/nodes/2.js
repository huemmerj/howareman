

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.16de97e4.js","_app/immutable/chunks/scheduler.04c87043.js","_app/immutable/chunks/index.5e9aae30.js"];
export const stylesheets = [];
export const fonts = [];
