

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.0690d693.js","_app/immutable/chunks/scheduler.67e96421.js","_app/immutable/chunks/index.270a0ff7.js","_app/immutable/chunks/outline-list-alt.555171d9.js","_app/immutable/chunks/Store.3d9ff08b.js","_app/immutable/chunks/index.9c8849c9.js","_app/immutable/chunks/notifications.bd3022cf.js","_app/immutable/chunks/Button.b53a675a.js","_app/immutable/chunks/stores.fc0e80ae.js","_app/immutable/chunks/singletons.dab309b6.js"];
export const stylesheets = ["_app/immutable/assets/0.c5075a4e.css","_app/immutable/assets/outline-list-alt.2beadffe.css"];
export const fonts = [];
