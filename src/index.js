import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducerForm from '../src/reducers/reducer'
import './index.css';
import App from './App.js'


ReactDOM.render(
  <React.StrictMode>
    <Provider store={createStore(reducerForm)}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
