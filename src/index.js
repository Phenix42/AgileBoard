import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Import global styles (including the CSS reset)
import App from './App';
import { Provider } from 'react-redux'; // For Redux if using
import { store } from './Redux/store'; // Path to your Redux store


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);