import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { initializeFirebase } from './notification';

ReactDOM.render(
    <Router>
      <App />
    </Router>,
    
  document.getElementById('root')
);

initializeFirebase();


