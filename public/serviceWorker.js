importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js');
//PUEDE SER NECESARIO CAMBIARLO A NPM

importScripts('https://www.gstatic.com/firebasejs/8.4.1/firebase-app.js'); //POR ALGUNA RAZON CUANDO LO PONGO EN MI VERSION DA ERROR
importScripts('https://www.gstatic.com/firebasejs/8.4.1/firebase-messaging.js'); //POR ALGUNA RAZON CUANDO LO PONGO EN MI VERSION DA ERROR




//POR AHORA ESTE SW LO MANTENEMOS PERO CREO QUE AHORA CAMBIA TODO A FIREBASE-MESSAGING-SW A MENOS DE QUE QUERRAMOS HACERLO DOBLE


// Switch debug logging on/off here. Default is on in dev and off in prod.
workbox.setConfig({debug: false});

workbox.routing.registerRoute(
  ({request}) => request.destination === 'image',
  new workbox.strategies.CacheFirst()
  );

  
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
/*
messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
})
*/


  
