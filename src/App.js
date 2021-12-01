import './scss/app.scss';
import { Provider } from 'react-redux'
import { LastLocationProvider } from 'react-router-last-location';

import { store } from './store/store'
import { AppRouter } from './router/AppRouter';
import 'animate.css'

function App() {
  return (

    <Provider store={ store } >
      <LastLocationProvider>
        <AppRouter/>
      </LastLocationProvider>
    </Provider>
  );
}

function subscribeUser() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(function(reg) {

      reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: 'BKUuJTxd0ifo32qSdjXSel_4_pzpHIxv2iUpbfaUB7rbwIhHBH68GkKN9SA9e9gf5NvWNV3pRblprbCLUE0feKs',
      }).then(function(sub) {
        console.log('Endpoint URL: ', sub.endpoint);
      }).catch(function(e) {
        if (Notification.permission === 'denied') {
          console.warn('Permission for notifications was denied');
        } else {
          console.error('Unable to subscribe to push', e);
        }
      });
    })
  }
}

subscribeUser()


function displayNotification() {
  if ('Notification' in window && navigator.serviceWorker) {
    if (Notification.permission === 'granted') {
      navigator.serviceWorker.getRegistration().then(function(reg) {
        var options = {
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
        reg.showNotification('PWA Card Diary Tesis', options);
      });
    }
  }
}

displayNotification()




export default App;
