const CACHE_NAME = "daily-quote-cache-v2";
const STATIC_FILES = [
  "/",
  "/index.html",
  "/favorites.html",
  "/styles.css",
  "/script.js",
  "/manifest.json",
  "/android-chrome-192x192.png",
  "/android-chrome-512x512.png"
];

// Install Service Worker and Cache Static Files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_FILES);
    })
  );
});

// Activate Service Worker and Remove Old Caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    )
  );
});

// Fetch Event: Serve Files from Cache or Fetch from Network
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse; // Serve from Cache
      }
      return fetch(event.request)
        .then((response) => {
          // Cache the new response dynamically
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, response.clone());
            return response;
          });
        })
        .catch(() => {
          // Fallback for offline
          return new Response("You are offline, and this resource is unavailable.", {
            status: 503,
            headers: { "Content-Type": "text/plain" },
          });
        });
    })
  );
});
