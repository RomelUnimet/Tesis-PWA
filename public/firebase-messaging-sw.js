//importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js');
//PUEDE SER NECESARIO CAMBIARLO A NPM

//PODRIA MOVERLO A SRC

importScripts('https://www.gstatic.com/firebasejs/8.4.1/firebase-app.js'); //POR ALGUNA RAZON CUANDO LO PONGO EN MI VERSION DA ERROR
importScripts('https://www.gstatic.com/firebasejs/8.4.1/firebase-messaging.js'); //POR ALGUNA RAZON CUANDO LO PONGO EN MI VERSION DA ERROR

/*
  FIREBASE CON IMPORTS
  import { initializeApp } from 'firebase/app';
  import { getMessaging } from "firebase/messaging";
  import { onBackgroundMessage } from "firebase/messaging/sw";
*/

//VER TUTORIAL DE THE NET NINJA PWA

//PWA CACHE ROUTING PARA FUNCIONALIDAD OFFLINE

//CAMBIE START_URL EN EL MANIFEST A ./

const cache_name = 'cache-pwa-card-diary-tesis'
//Estos son requests fetch
const assets_to_cache = [
	'/',
	'/index.html',
	'/cards',
	'/auth',
	'/profile',
	'/profile/edit',
	'/profile/settings',
	'/profile/settings/backup-restore',
	'/profile/settings/trash',
	'/profile/settings/lock',
	'/profile/settings/reminder',
	//google Fonts - FONTS
	'https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700;1,900&display=swap',
	'https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400;500;600;700&display=swap',
	'https://fonts.gstatic.com/s/sourcesanspro/v18/6xKydSBYKcSV-LCoeQqfX1RYOo3ig4vwlxdu3cOWxw.woff2',

	'/static/js/bundle.js',
	'/static/js/vendors~main.chunk.js',
	'/static/js/main.chunk.js',
	'/static/js/main.chunk.js.map',
  'firebase-messaging-sw.js',
	'/manifest.json',
	'/icons/manifest-icon-192.png',

	//RESP DEL WEATHER
	'https://api.openweathermap.org/data/2.5/weather?lat=10.4988672&lon=-66.7942912&appid=7372e41bb8b70d0180980c8eee814b19',

	//PARA EL MESSAGING (NO SE SI SEA NECCESARIA)
	//'https://fcm.googleapis.com/fcm/send/dj2duvdkEiU:APA91bGFwtmXLlokTSq1xYUEbXxvJoszQiLMemlQcUr5EBKRkJfp3GmPhfKbO8l-Sxjp-Npyv5JBcDfTT5TT-EQaHZdJxIzk7McU-AE3G4SlEy08vFrrpmCN4vnCByHqKGx8xQMS72xK',
	
	//ME PREOCUPA UN POCO QUE NO TENGA NADA DE ESTILO (REVISAR DESPUES)
]

//Install SW
//EVENTO DE INSTALL SOLO SE HACE CUANDO CAMBIA EL FILE
self.addEventListener('install', e =>  {
	//console.log('Service Worker Installed')
	e.waitUntil(
		caches.open(cache_name).then( cache => {
			console.log('Caching Assets')
			cache.addAll(assets_to_cache)
		})
	)
	

})

//Activate SW
self.addEventListener('activate', e =>  {
	//console.log('Service Worker Activated')

	e.waitUntil(
		caches.keys().then( keys => {
			//console.log(keys) 
			return Promise.all(
				keys.filter( key => key !== cache_name )
					.map( key => caches.delete(key))
			)
		})
	)
})

//Fetch Event SW
self.addEventListener('fetch', e =>  { //EN EL TUTORIAL DE NINJA, HACE ALGO PARA LA RUTAS DINAMICAS

	e.respondWith(
		caches.match(e.request, {ignoreSearch: true}).then( chachesRes => {
			return chachesRes || fetch(e.request)/*.then( fetchRes => {
				return caches.open(cache_name) .then( cache => {
					cache.put(e.request.url, fetchRes.clone());
					return fetchRes
				}).catch(err => console.error('dynamic cache error:', err))

			})*/
      .catch( err => console.error('fetch error:', err)) 
			
			//SI QUEREMOS PONER OFFLINE FALLBACK ENTONCES NECESITAMOS QUE SEA AQUI
		} )
	)
})



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




