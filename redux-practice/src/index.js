import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore ,combineReducers } from 'redux';
import counterReducer from './store/reducers/counter';
import resultReducer from './store/reducers/result';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';

const rooReducer  = combineReducers({
  ctr:counterReducer,
  res:resultReducer
});

const store=createStore(rooReducer);

//now store is connected to our react-app
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
     <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
