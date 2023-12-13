import { writable } from 'svelte/store';

export const showScanDialog = writable(false);
export const scannedArticleNumber = writable();
