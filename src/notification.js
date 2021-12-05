import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from "firebase/messaging";


export const initializeFirebase = () => {
  initializeApp({
    apiKey: "AIzaSyDY0tuyRgv0HVBTnmoYKCSgGWTmkTlg0MA",
    authDomain: "pwa-card-diary-tesis.firebaseapp.com",
    projectId: "pwa-card-diary-tesis",
    storageBucket: "pwa-card-diary-tesis.appspot.com",
    messagingSenderId: "602718662060",
    appId: "1:602718662060:web:ea64e957e1f8d249739e09",
    measurementId: "G-R8FG0HMP47"
  });
}


export const askForPermissionToReceiveNotifications = async () => {
  try {
    const messaging = getMessaging();
    const token = await getToken(messaging, {vapidKey:'BKUuJTxd0ifo32qSdjXSel_4_pzpHIxv2iUpbfaUB7rbwIhHBH68GkKN9SA9e9gf5NvWNV3pRblprbCLUE0feKs'});
    console.log('Your token is:', token);
    
    return token;
  } catch (error) {
    console.error(error);
  }
}

export const askForPermissionToReceiveNotificationsAlert = async () => {
  try {
    const messaging = getMessaging();
    const token = await getToken(messaging, {vapidKey:'BKUuJTxd0ifo32qSdjXSel_4_pzpHIxv2iUpbfaUB7rbwIhHBH68GkKN9SA9e9gf5NvWNV3pRblprbCLUE0feKs'});
    console.log('Your token is:', token);
    alert(token);
    
    return token;
  } catch (error) {
    console.error(error);
  }
}

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