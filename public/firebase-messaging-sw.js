//importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js');
//PUEDE SER NECESARIO CAMBIARLO A NPM

importScripts('https://www.gstatic.com/firebasejs/8.4.1/firebase-app.js'); //POR ALGUNA RAZON CUANDO LO PONGO EN MI VERSION DA ERROR
importScripts('https://www.gstatic.com/firebasejs/8.4.1/firebase-messaging.js'); //POR ALGUNA RAZON CUANDO LO PONGO EN MI VERSION DA ERROR



//VER TUTORIAL DE THE NET NINJA PWA



// Switch debug logging on/off here. Default is on in dev and off in prod.
/*
workbox.setConfig({debug: false});

workbox.routing.registerRoute(
  ({request}) => request.destination === 'image',
  new workbox.strategies.CacheFirst()
  );
  
workbox.routing.registerRoute(
  '/',
  new workbox.strategies.CacheFirst()
  );

*/

const CACHE_NAME = 'pwa-card-diary-tesis-v1';

const urlsToCache = [
  '/',
  '/index.html',
  '/styles/styles.css',
  '/script/webpack-bundle.js',
  '/manifest.json',
  '/firebase-messaging-sw.js',
  '/cards',
  '/static/js/bundle.js',
  '/static/js/vendors~main.chunk.js',
  '/static/js/main.chunk.js'
];

/*
/static/js/bundle.js
/static/js/vendors~main.chunk.js
/static/js/main.chunk.js
*/

self.addEventListener('install', function(event) {

  //SKIP WAITING ME GENERA PROBLEMAS GRAVES
  //this.skipWaiting()

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        // Open a cache and cache our files
        return cache.addAll(urlsToCache);
      })
  );
});

//PROBAR ESTE INSTALL
/*
self.addEventListener('install', event => {
  event.waitUntil(
     caches.open($CACHE_STORE)
     .then(cache => {
        return cache.addAll($FILES);
     })
     .then(() => {
        return self.skipWaiting();
     })
  );
});
*/
  

self.addEventListener('fetch', function(event) {
    console.log(event.request.url);
    event.respondWith(
        caches.match(event.request, {ignoreSearch: true}).then(function(response) {
            return response || fetch(event.request);
        })
    );
});

//PROBAR ESTE FETCH TAMBIEN
/*
const fetchHandler = async e => {
  const {request} = e;
  const {url} = request;

  log('[Service Worker] Fetch', url, request.method);

  if(url.includes('/download')) {
    // e.respondWith(
    e.request.blob().then(file => {

      const response = new Response(file);
      response.headers.append('Content-Length', file.size);
      response.headers.append('Content-Disposition', `attachment; filename="${file.name}"`);
      log(response);
      return response;
    })
    .catch(e => {
      log(e);
    });

    // );
  }
  else {
    e.respondWith(
      caches.match(e.request, {ignoreSearch: true})
      .then(response => response ? response : fetch(e.request)
      .catch(err => console.error('fetch error:', err))
      )
    );
  }
};

*/

//PROBAR ESTE FETCH
/*
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(cacheName)
      .then(cache => cache.match(event.request, {ignoreSearch: true}))
      .then(response => {
      return response || fetch(event.request);
    })
  );
});

*/ 





//Este metodo no es necesario para las Notificaciones de Firebase por lo que lo dejamos asi. 
//Tenemos que ver como podemos customizar lo
/*  
  self.addEventListener('push', function(e) {

      console.log('Notification Recieved')

      if (Notification.permission === 'granted') {

        var options = {
          body: 'Open PWA Card Diary',
          icon: 'https://is4-ssl.mzstatic.com/image/thumb/Purple123/v4/95/22/9d/95229d6e-621b-ec09-6564-205b924aa380/source/200x200bb.jpg',
          vibrate: [100, 50, 100],
          data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
          },
          actions: [
            {action: 'open', title: 'Add an Entry Today',
              icon: 'https://is4-ssl.mzstatic.com/image/thumb/Purple123/v4/95/22/9d/95229d6e-621b-ec09-6564-205b924aa380/source/200x200bb.jpg'},
          ]

        };
        e.waitUntil(

          self.registration.showNotification('PWA Card Diary Tesis Push', options)
          )
        
      }
  });
*/


self.addEventListener('notificationclick', function(e) {
  var notification = e.notification;
  //var primaryKey = notification.data.primaryKey;
  var action = e.action;

  if (action === 'close') {
    notification.close();
    console.log('Close Notif')
  } else {
    clients.openWindow('https://pwacarddiarytesisrc.netlify.app/');
    notification.close();
    console.log('Open Notif')
  }
});

firebase.initializeApp({
  apiKey: "AIzaSyDY0tuyRgv0HVBTnmoYKCSgGWTmkTlg0MA",
  authDomain: "pwa-card-diary-tesis.firebaseapp.com",
  projectId: "pwa-card-diary-tesis",
  storageBucket: "pwa-card-diary-tesis.appspot.com",
  messagingSenderId: "602718662060",
  appId: "1:602718662060:web:ea64e957e1f8d249739e09",
  measurementId: "G-R8FG0HMP47"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  //AL IGUAL QUE EL ON PUSH ESTO ME MUESTRA 2 NOTIFICACIONES, TENGO QUE VER COMO HACER PARA NO MOSTRAR LA DE FIREBASE SI ES POSIBLE
  //SI NO ENCUENTRO MANERA DE HACERLO ENTONCES DEBO CONFIGURARLAS DESDE FIREBASE O EL CLIENTE, COSA QUE NO SERIA PROBLEMA
  // Customize notification here
  /*
  const notificationTitle = 'PWA Card Diary Tesis';
  const notificationOptions = {
    body: 'Here is a notification body!',
    icon: 'https://is4-ssl.mzstatic.com/image/thumb/Purple123/v4/95/22/9d/95229d6e-621b-ec09-6564-205b924aa380/source/200x200bb.jpg',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {action: 'open', title: 'Add an Entry Today',
        icon: 'https://is4-ssl.mzstatic.com/image/thumb/Purple123/v4/95/22/9d/95229d6e-621b-ec09-6564-205b924aa380/source/200x200bb.jpg'},

    ]

  };

  self.registration.showNotification(
    notificationTitle,
    notificationOptions
    );

   */ 
  
})




