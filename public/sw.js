/* Minimal service worker: intentionally does not cache dynamic app routes. */
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()));
