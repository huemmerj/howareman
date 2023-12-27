

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.f3e82b90.js","_app/immutable/chunks/scheduler.67e96421.js","_app/immutable/chunks/index.270a0ff7.js"];
export const stylesheets = [];
export const fonts = [];
