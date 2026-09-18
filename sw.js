const CACHE_NAME = 'netgauge-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

// Install Event: Cache files
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// Fetch Event: only serve same-origin app assets from cache.
// Cross-origin requests (e.g. speed.cloudflare.com probes) and non-GET
// requests bypass the worker so timing measurements see the true network RTT.
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== self.location.origin) return;
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
