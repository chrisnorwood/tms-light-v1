import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import middleware from './middleware'
import App from './components/App';
import './styles/tailwind.css'
import './styles/custom.css'

// For below logic on token checking
import { handleReAuth } from './actions/auth';

const store = createStore(reducer, middleware)

// Check if auth token already exists
const token = localStorage.getItem('token');

if(token) {
  console.log('ReAuth - should only happen once')
  store.dispatch(handleReAuth(token));
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root')
)