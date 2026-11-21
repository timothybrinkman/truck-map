// Truck Map service worker: keeps the app working with no signal.
// Bump VERSION whenever index.html changes so installed phones pick up the update.
const VERSION = 'truckmap-v1.1.0';
const SHELL_CACHE = VERSION + '-shell';
const TILE_CACHE = 'truckmap-tiles-v1';
const MAX_TILES = 2500; // map pieces kept for offline viewing
const SHELL = [
  './', './index.html', './manifest.json', './icon.svg', './icon-192.png', './icon-512.png',
  './apple-touch-icon.png', './vendor/maplibre-gl.js', './vendor/maplibre-gl.css'
];
const TILE_HOSTS = ['tiles.openfreemap.org'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(SHELL_CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== SHELL_CACHE && k !== TILE_CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  if (url.origin === self.location.origin) {
    if (req.mode === 'navigate') {
      // Newest app when online, saved copy when not.
      e.respondWith(
        fetch(req)
          .then((r) => { const copy = r.clone(); caches.open(SHELL_CACHE).then((c) => c.put('./index.html', copy)); return r; })
          .catch(() => caches.match('./index.html'))
      );
      return;
    }
    e.respondWith(caches.match(req).then((hit) => hit || fetch(req)));
    return;
  }

  // Map pieces: keep what has been viewed so it shows with no signal.
  // Search and routing requests are never cached.
  if (TILE_HOSTS.includes(url.hostname)) e.respondWith(tileFetch(req));
});

let puts = 0;
async function tileFetch(req) {
  const cache = await caches.open(TILE_CACHE);
  const hit = await cache.match(req);
  const isTile = /\.pbf$/.test(new URL(req.url).pathname);
  if (hit) {
    if (!isTile) fetch(req).then((r) => { if (r.ok) cache.put(req, r.clone()); }).catch(() => {});
    return hit;
  }
  try {
    const r = await fetch(req);
    if (r.ok) {
      cache.put(req, r.clone());
      if (++puts % 100 === 0) trim(cache);
    }
    return r;
  } catch (err) {
    return Response.error();
  }
}

async function trim(cache) {
  const keys = await cache.keys();
  if (keys.length <= MAX_TILES) return;
  for (const k of keys.slice(0, keys.length - MAX_TILES + 200)) await cache.delete(k);
}
