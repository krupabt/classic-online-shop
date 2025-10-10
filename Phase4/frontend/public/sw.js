// ===============================
// ✅ Service Worker for Vite + React PWA
// ===============================

const CACHE_NAME = "my-pwa-cache-v1";
const urlsToCache = ["/", "/index.html", "/offline.html"];

// Install - cache essential files
self.addEventListener("install", (event) => {
  console.log("Service Worker: Installing...");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Service Worker: Caching app shell...");
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

// Activate - clean old caches
self.addEventListener("activate", (event) => {
  console.log("Service Worker: Activating...");
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            console.log("Service Worker: Deleting old cache:", name);
            return caches.delete(name);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// Fetch - serve cached files and handle offline
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response; // ✅ return cached asset
      }

      return fetch(event.request).catch(() => {
        // ✅ If the request is a navigation (page), show offline page
        if (event.request.mode === "navigate") {
          return caches.match("/offline.html");
        }

        // ✅ For other requests (images, JS, SVG, CSS) return empty response instead of 503
        return new Response("", {
          status: 200,
          statusText: "Offline",
        });
      });
    })
  );
});