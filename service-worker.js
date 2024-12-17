const CACHE_NAME = "daily-quote-cache-v1";
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

// Install Service Worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_FILES);
    })
  );
});

// Activate Service Worker
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
});

// Fetch Event
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Cache successful responses
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseClone);
        });
        return response;
      })
      .catch(() => {
        // Fallback to cached version or static content
        return caches.match(event.request).then((cachedResponse) => {
          return cachedResponse || new Response("Resource not found offline.", { status: 404 });
        });
      })
  );
});
