import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Router from './router';
import Authorization from './Authorization';

ReactDOM.render(
  <React.StrictMode>
    <Authorization>
      <Router />
    </Authorization>
  </React.StrictMode>,
  document.getElementById('root')
);
