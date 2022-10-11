import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom'
import Main from './components/Main';
import './index.css'

ReactDOM.render(
  <Router>
    <Main />
  </Router>,
  document.getElementById('app') // make sure this is the same as the id of the div in your index.html
);