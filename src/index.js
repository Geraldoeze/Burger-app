import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk'
import orderReducer from './hoc/store/reducers/order'

import reportWebVitals from './reportWebVitals';
import burgerBuilderReducer from './hoc/store/reducers/burgerbuilder';

const composeEnhancers = window._REDUX_DEVTOOLS_EXTENSION__COMPOSE__ || compose

const rootReducer = combineReducers({
  burgerBuilder: burgerBuilderReducer,
  order: orderReducer
})

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
) );

const app = (
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>  
)

ReactDOM.render(
 app,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
