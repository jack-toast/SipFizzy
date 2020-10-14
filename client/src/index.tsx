import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import WebFont from 'webfontloader';
import { StylesProvider } from '@material-ui/core';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './Components/AppRoot';
import * as serviceWorker from './serviceWorker';
import store from './Redux/store';

WebFont.load({
  google: {
    families: ['Roboto', 'Libre Baskerville'],
  },
});

document.title = 'Sip Fizzy';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <StylesProvider injectFirst={true}>
          <App />
        </StylesProvider>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
