import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from "firebase/messaging";

import Localbase from 'localbase';
import { fetchWithToken } from './helpers/fetch';

const db = new Localbase('pwa-card-diary');

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

//LO COLOQUE AL FINAL DE PROCESO DE CREAR USUARIO Y FUNCIONA CON UN NUEVO USUARIO
//PROBAR EN APP ROUTER PARA ASEGURARNOS DE QUE NO DE ERRORES PORQUE TAMBIEN ES NECESARIO TENERLO AHI
export const askForPermissionToReceiveNotifications = async () => {
  try {
    await Notification.requestPermission( (status) => {
      console.log('Notification permission status:', status);
    });
    const messaging = getMessaging();
    const token = await getToken(messaging, {vapidKey: process.env.REACT_APP_FIREBASE});
    
    await subscribeUser()
    
    //AQUI ACTUALIZAMOS EL TOKEN
    await updateToken(token)
    

    return token;
  } catch (error) {
    console.error(error);
  }
}

export const subscribeUser = async () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(function(reg) {
      reg.pushManager.subscribe({
        
        userVisibleOnly: true,
        applicationServerKey: 'BKUuJTxd0ifo32qSdjXSel_4_pzpHIxv2iUpbfaUB7rbwIhHBH68GkKN9SA9e9gf5NvWNV3pRblprbCLUE0feKs', 
        
      }).then(function(sub) {
        
        console.log(sub);
        
      }).catch(function(e) {
        
        if (Notification.permission === 'denied') {
          console.warn('Permission for notifications was denied');
        } else {
          console.error('Unable to subscribe to push', e);
        }
      });
    })
  }}
  

  const updateToken = async (token) => {

    const [userSettings] = await db.collection('userSettings').get();

    if(token!==userSettings.notification.token){

      let newSettings = {
        ...userSettings,
        notification: {
          ...userSettings.notification,
          token:token,
        }
      }

      await db.collection('userSettings').set([
        newSettings,
      ])
  
      //Posible que haya un error aqui // Si llega a haber
      fetchWithToken(`settings/${newSettings.sid}`, newSettings, 'PUT')

    }

  }