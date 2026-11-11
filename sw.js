// Service worker: guarda todo en caché para jugar sin conexión. Sube VERSION al publicar cambios.
const VERSION = 'sobresueldo-v4';
const FILES = [
  './', 'index.html', 'manifest.webmanifest', 'css/style.css',
  'js/main.js', 'js/engine.js', 'js/content.js', 'js/characters.js', 'js/storage.js', 'js/sound.js',
  'js/data/cards_a.js', 'js/data/cards_b.js', 'js/data/cards_c.js', 'js/data/contacts.js', 'js/data/laws.js',
  'icons/icon.svg', 'icons/icon-192.png', 'icons/icon-512.png',
];
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
// Red primero (para recibir actualizaciones) y caché si no hay conexión.
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(
    fetch(e.request).then((r) => { const copy = r.clone(); caches.open(VERSION).then((c) => c.put(e.request, copy)); return r; })
      .catch(() => caches.match(e.request, { ignoreSearch: true }).then((r) => r || caches.match('index.html')))
  );
});
