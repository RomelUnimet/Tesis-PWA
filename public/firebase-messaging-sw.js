//importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js');
//PUEDE SER NECESARIO CAMBIARLO A NPM

//PODRIA MOVERLO A SRC
importScripts('https://www.gstatic.com/firebasejs/8.4.1/firebase-app.js'); //POR ALGUNA RAZON CUANDO LO PONGO EN MI VERSION DA ERROR
importScripts('https://www.gstatic.com/firebasejs/8.4.1/firebase-messaging.js'); //POR ALGUNA RAZON CUANDO LO PONGO EN MI VERSION DA ERROR

self.addEventListener('notificationclick', function(e) {
  var notification = e.notification;
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
    
  const notificationTitle = 'PWA Card Diary Tesis';
  const notificationOptions = {
    body: 'Write down your special feelings today.',
    icon: 'https://is4-ssl.mzstatic.com/image/thumb/Purple123/v4/95/22/9d/95229d6e-621b-ec09-6564-205b924aa380/source/200x200bb.jpg',
    badge: './journal.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
  };
  
  self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
    
})

