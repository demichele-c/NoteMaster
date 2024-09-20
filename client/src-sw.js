const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst, StaleWhileRevalidate } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

// Precache and route all the assets listed in the manifest
precacheAndRoute(self.__WB_MANIFEST);

// Cache-first strategy for the HTML pages (e.g., index.html)
const pageCache = new CacheFirst({
  cacheName: 'page-cache', // Name of the cache
  plugins: [
    // Cache pages with a response of 0 (for no response) or 200 (successful response)
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    // Cache expires after 30 days
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60, // Cache expires in 30 days
    }),
  ],
});

// Pre-cache and "warm" the index.html and root page for fast access
warmStrategyCache({
  urls: ['/index.html', '/'], // URLs to warm up
  strategy: pageCache, // Use the page cache strategy for these URLs
});

// Cache page navigation requests (i.e., when the user navigates between pages)
registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// Asset caching strategy (CSS, JS, images, etc.) with Stale-While-Revalidate
registerRoute(
  // Check if the request is for style (CSS), script (JS), or images
  ({ request }) => ['style', 'script', 'image'].includes(request.destination),
  
  // Use StaleWhileRevalidate strategy for assets, meaning it serves the cached version first
  // and updates the cache in the background with the latest version
  new StaleWhileRevalidate({
    cacheName: 'asset-cache', // Cache name for assets
    plugins: [
      // Cache assets with a response of 0 (for no response) or 200 (successful response)
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);
