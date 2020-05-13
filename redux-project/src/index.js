import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore ,combineReducers,applyMiddleware,compose } from 'redux';
import counterReducer from './store/reducers/counter';
import resultReducer from './store/reducers/result';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import thunk from 'redux-thunk';

const rootReducer  = combineReducers({
  ctr:counterReducer,
  res:resultReducer
});

/* middleware which simply logs each action we issue.
*here it executes 3 functions-
* 2)next depicts let the action continue its journey to the reducer.
* 1)this middleware is get executed by the store.
* 3)recives action you dispatch as input.
*/
const logger = store => {
  return next => {
      return action => {
          console.log('[Middleware] Dispatching', action);
          const result = next(action);
          console.log('[Middleware] next state', store.getState());
          return result;
      }
  }
};

//to connect browser extension to the store running in our js code.
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store=createStore(rootReducer,composeEnhancers(applyMiddleware(logger,thunk)));

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
