import './scss/app.scss';
import { Provider } from 'react-redux'

import { store } from './store/store'
import { AppRouter } from './router/AppRouter';
import 'animate.css'


function App() {
  return (

    <Provider store={ store } >
      <AppRouter/>
    </Provider>
  );
}

export default App;
