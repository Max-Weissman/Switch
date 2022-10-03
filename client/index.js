import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import Main from './components/main';
import './index.css'

console.log('hi')

ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>,
  document.getElementById('app') // make sure this is the same as the id of the div in your index.html
);