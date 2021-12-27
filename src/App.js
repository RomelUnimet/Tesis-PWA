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


export default App;
