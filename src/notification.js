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