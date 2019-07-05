import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import ipcListeners from './electron/listeners';
import App from './App'

ipcListeners();

// Render React app inside root
ReactDOM.render(
  <App/>,
  document.getElementById('app')
);