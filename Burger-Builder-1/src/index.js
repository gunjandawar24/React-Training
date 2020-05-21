import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { createStore,applyMiddleware,compose,combineReducers } from 'redux';
import burgerReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  burgerBuilder:burgerReducer,
  order:orderReducer,
  auth:authReducer
});

//now redux dev tool will only be available in the development environment.(when we deploy,it will not work)
const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
const store=createStore(rootReducer,composeEnhancers(
  applyMiddleware(thunk)
));


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


// --------------------------------- My Understanding----------------------------------

//applyMiddleware --> Creates a store enhancer that applies middleware to the dispatch method of the Redux store.
//Provider --> Makes the Redux store available to the connect() calls in the component hierarchy below.
/*
  *BrowserRouter --> It uses regular URL paths.
  * BrowserRouter wraps all your Route components ie App here because i have used Routes in App.
  * A BrowserRouter component can only have one child element
*/