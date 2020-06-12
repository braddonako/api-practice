import React from 'react';
import ReactDOM from 'react-dom';
import './Resources/CSS/styles.css';

import {BrowserRouter} from 'react-router-dom';
import Routes from './routes'

ReactDOM.render(
  <BrowserRouter>
      <Routes/>
  </BrowserRouter>

, document.querySelector('#root'));
