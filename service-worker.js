const CACHE_NAME = 'reserva-sitio-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/index.css',
  '/js/supabase.js',
  '/js/ui.js',
  '/js/usuarios.js',
  '/js/reservas.js',
  '/assets/css/base.css',
  '/assets/css/reservas.css'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});