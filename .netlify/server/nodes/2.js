

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.2a46f409.js","_app/immutable/chunks/scheduler.3f4853f6.js","_app/immutable/chunks/index.5586b7df.js","_app/immutable/chunks/navigation.e6fe0b32.js","_app/immutable/chunks/singletons.f0c0c513.js","_app/immutable/chunks/index.94ac5327.js"];
export const stylesheets = [];
export const fonts = [];
