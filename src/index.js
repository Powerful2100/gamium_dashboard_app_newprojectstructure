import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';

import { BrowserRouter } from 'react-router-dom';

import reportWebVitals from './performance/reportWebVitals';

import { Provider } from 'react-redux';
import store from './base/store';

import './base/i18n.js';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename="/">
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

