importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js');
//PUEDE SER NECESARIO CAMBIARLO A NPM


//FUNCIONA A LA PERFECCION, PERO ES NECESARIO OPTIMIZARLO
if (workbox) {
  workbox.setConfig({ debug: false });
 
  //Dejarlo si es necesario
  //workbox.skipWaiting();


  workbox.routing.registerRoute(
    // Check to see if the request is a navigation to a new page
    ({ request }) => request.mode === 'navigate',
    // Use a Network First caching strategy
    new workbox.strategies.NetworkFirst({
      // Put all cached files in a cache named 'pages'
      cacheName: 'html-pages-cache',
      plugins: [
        // Ensure that only requests that result in a 200 status are cached
        new workbox.cacheableResponse.CacheableResponsePlugin({
          statuses: [200],
        }),
      ],
    }),
  );

  //Este funciona como queremos pero puede tener mejoras 
  workbox.routing.registerRoute(
    ({request, url}) => (request.destination === 'script' ||
                         request.destination === 'style') &&
                         !url.pathname.startsWith('/maps/') &&
                         !url.pathname.startsWith('/maps-api-v3/') 
                         ,
    //Usarlo por ahora asi y cuando la app este lista lo cambiamos
    new workbox.strategies.NetworkFirst({
      cacheName: 'css-and-js-assets-cache',
    })  
  );

  /*
  //MAPS
  workbox.routing.registerRoute(
    ({url}) => url.origin === 'https://maps.googleapis.com',
    new workbox.strategies.CacheFirst({
        cacheName: 'google-maps-cache',
        plugins: [
          new workbox.expiration.ExpirationPlugin({
            maxEntries: 1,
            maxAgeSeconds: 5 , // 5 minutes
          }),
          new workbox.cacheableResponse.CacheableResponsePlugin({
            statuses: [0, 200],
          }),
        ],
    })
  );
  */

  //HAY QUE HACER ALGO CON RESPECTO A LA IMAGENES QUE TOMAN DEMASIADO ESPACIO
  //DEJAR LAS IMAGENES Y DESPUES VER SI ES NECESARIO
  workbox.routing.registerRoute(
      '/icons/manifest-icon-192.png',  
      new workbox.strategies.CacheFirst({
        cacheName:'images-cache',
        plugins: [
          new workbox.expiration.ExpirationPlugin({
            maxEntries: 30,
            maxAgeSeconds: 1 * 24 * 60 * 60, // 30 Days
            purgeOnQuotaError: true,
          }),
        ],
      })
  );

  workbox.routing.registerRoute(
      '/manifest.json',  
      new workbox.strategies.CacheFirst({
        cacheName:'manifest-cache',
      })
  );

  // Cache the Google Fonts stylesheets with a stale-while-revalidate strategy.
  
  workbox.routing.registerRoute(
    ({url}) => url.origin === 'https://fonts.googleapis.com',
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'google-fonts-stylesheets',
    })
  );

  // Cache the underlying font files with a cache-first strategy for 1 year.
  workbox.routing.registerRoute(
    ({url}) => url.origin === 'https://fonts.gstatic.com',
    new workbox.strategies.CacheFirst({
      cacheName: 'google-fonts-webfonts',
      plugins: [
        new workbox.cacheableResponse.CacheableResponsePlugin({
          statuses: [0, 200],
        }),
        new workbox.expiration.ExpirationPlugin({
          maxAgeSeconds: 60 * 60 * 24 * 365,
          maxEntries: 30,
        }),
      ],
    })
  );
  

  /*
  //DEFAULT CACHING
  var defaultStrategy = new workbox.strategies.StaleWhileRevalidate ({
    cacheName: "fallback",
    plugins: [
        new workbox.expiration.ExpirationPlugin({
            maxEntries: 70,
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
          if (args.event.request.method === 'GET' ) {
              return defaultStrategy.handle(args); // use default strategy
          } else {
            return null
          }
          // return fetch(args.event.request);
      }
  );
*/
  
} else {
  console.log(`No workbox on this browser 😬`);
}



  
