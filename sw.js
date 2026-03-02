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

// Fetch Event: Serve from cache if available
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});