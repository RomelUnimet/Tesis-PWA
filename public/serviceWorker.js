importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js');
//PUEDE SER NECESARIO CAMBIARLO A NPM

if (workbox) {
  workbox.setConfig({ debug: false });
  // workbox.core.setLogLevel(workbox.core.LOG_LEVELS.warn);

  // workbox.routing.setDefaultHandler(workbox.strategies.networkFirst({
  //   cacheName: 'fallback',
  // }))

  var defaultStrategy = new workbox.strategies.CacheFirst ({
    cacheName: "fallback",
    plugins: [
        new workbox.expiration.ExpirationPlugin({
            maxEntries: 128,
            maxAgeSeconds: 7 * 24 * 60 * 60, // 1 week
            purgeOnQuotaError: true, // Opt-in to automatic cleanup
        }),
        new workbox.cacheableResponse.CacheableResponsePlugin({
            statuses: [0, 200] // for opague requests
        }),
    ],
});

workbox.routing.setDefaultHandler(
    (args) => {
        if (args.event.request.method === 'GET') {
            return defaultStrategy.handle(args); // use default strategy
        } else {
          return null
        }
        // return fetch(args.event.request);
    }
);
  
  workbox.routing.registerRoute(
    new RegExp(/.*\.(?:js|css)/g),
    new workbox.strategies.CacheFirst()
  );

  workbox.routing.registerRoute(
      new RegExp(/.*\.(?:png|jpg|jpeg|svg|gif|webp)/g),
      new workbox.strategies.CacheFirst()
  );
} else {
  console.log(`No workbox on this browser 😬`);
}



  
