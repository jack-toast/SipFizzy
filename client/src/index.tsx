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

// JY TODO - Figure out typing for refs that don't point to a dom node...
// const notistackRef = React.createRef<any>();
// const closeSnack = (key: string | number) => () => {
//   if (notistackRef.current !== null)
//     notistackRef.current.closeSnackbar(key);
// };

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <StylesProvider injectFirst={true}>
          {/* <SnackbarProvider
            maxSnack={3}
            preventDuplicate
            dense
            ref={notistackRef}
            action={(key) => (
              <IconButton
                size="small"
                onClick={closeSnack(key)}
                color="inherit"
              >
                <Close />
              </IconButton>
            )}
          > */}
          <App />
          {/* </SnackbarProvider> */}
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
