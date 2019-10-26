/* eslint-disable react/jsx-props-no-spreading */
import 'src/styles/tools.scss';
import 'src/styles/theme.scss';
import React from 'react';
import App from 'next/app';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import { Provider } from 'react-redux';
import createStore from 'src/redux/createStore';
import Router from 'next/router';
import rtl from 'jss-rtl';
import { create } from 'jss';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import { appWithTranslation, i18n } from 'src/i18n';
import createTheme from 'src/themes';
import { SnackbarProvider } from 'notistack';
import initApp from 'src/initApp';

const jss = create({ plugins: [...jssPreset().plugins] });
const jssWithRtl = create({ plugins: [...jssPreset().plugins, rtl()] });

class MyApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }

    Router.events.on('routeChangeComplete', () => { // workaround from https://github.com/zeit/next-plugins/issues/263
      if (process.env.NODE_ENV !== 'production') {
        const els = document.querySelectorAll('link[href*="/_next/static/css/styles.chunk.css"]');
        const timestamp = new Date().valueOf();
        els[0].href = `/_next/static/css/styles.chunk.css?v=${timestamp}`;
      }
    });
  }

  render() {
    const { Component, pageProps, store } = this.props;
    if (!this.initApp) {
      this.initApp = true;
      initApp(this.props);
    }
    const isRtl = i18n.dir() === 'rtl';
    if (process.browser) {
      document.getElementsByTagName('body')[0].dir = i18n.dir();
    }
    return (
      <React.Fragment>
        <StylesProvider jss={isRtl ? jssWithRtl : jss}>
          <ThemeProvider theme={createTheme(i18n.dir())}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Provider store={store}>
              <SnackbarProvider autoHideDuration={3500}>
                <Component {...pageProps} />
              </SnackbarProvider>
            </Provider>
          </ThemeProvider>
        </StylesProvider>
      </React.Fragment>
    );
  }
}

export default withRedux(createStore)(withReduxSaga(appWithTranslation(MyApp)));
