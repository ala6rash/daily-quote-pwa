const CACHE_NAME = "daily-quote-cache-v3";
const DYNAMIC_CACHE = "dynamic-cache";
const urlsToCache = [
  "/index.html",
  "/styles.css",
  "/script.js",
  "/favorites.html",
  "/android-chrome-192x192.png",
  "/android-chrome-512x512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", event => {
  if (event.request.url.includes("type.fit")) {
    event.respondWith(
      caches.open(DYNAMIC_CACHE).then(cache => {
        return fetch(event.request).then(response => {
          if (!response || response.status !== 200 || response.type !== "basic") {
            return response;
          }
          cache.put(event.request, response.clone());
          return response;
        }).catch(() => caches.match(event.request));
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request).then(response => response || fetch(event.request))
    );
  }
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME && name !== DYNAMIC_CACHE)
          .map(name => caches.delete(name))
      );
    })
  );
});
