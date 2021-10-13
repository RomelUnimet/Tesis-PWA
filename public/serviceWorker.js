importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js');
//PUEDE SER NECESARIO CAMBIARLO A NPM


workbox.routing.registerRoute(
    ({request}) => request.destination === 'image',
    new workbox.strategies.CacheFirst()
  );

// Switch debug logging on/off here. Default is on in dev and off in prod.
workbox.setConfig({debug: false});
