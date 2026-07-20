const CACHE_NAME = "apple-counting-cache-v1.0.3";
const urlsToCache = [
  "./",
  "./index.html",
  "./manifest.json",
  "./apple-icon.webp",
];

// 安裝 Service Worker 並快取核心資源
self.addEventListener("install", (event) => {
  // 強制讓新版 Service Worker 進入啟動階段，不需等待舊版網頁關閉
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

// 攔截請求並提供快取或發起網路請求
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});

// 啟動新的 Service Worker 時清除舊的快取
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    Promise.all([
      self.clients.claim(),
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            }
          })
        );
      }),
    ])
  );
});
