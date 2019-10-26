/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import WithAuth from './components/WithAuth';
import WithNotifier from './components/WithNotifier';
import WithLocal from './components/WithLocal';
import WithBrowser from './components/WithBrowser';

const Page = (config) => (WrappedComponent) => {
  if (!config) throw new Error('Config is required');
  // eslint-disable-next-line no-unused-vars
  const {
    isPrivate, i18n, getInitialProps, showLocalButton, displayName,
  } = config;
  const _displayName = displayName || WrappedComponent.displayName || WrappedComponent.name || 'Component';
  let _getInitialProps;
  if (getInitialProps || WrappedComponent.getInitialProps) {
    _getInitialProps = getInitialProps || WrappedComponent.getInitialProps;
  } else {
    _getInitialProps = async () => ({
      namespacesRequired: i18n,
    });
  }

  const Extended1 = WithAuth({ isPrivate }, WrappedComponent);
  const Extended2 = WithNotifier(Extended1);
  const Extended3 = showLocalButton ? WithLocal(Extended2) : Extended2;
  const Extended4 = WithBrowser(Extended3);

  Extended4.getInitialProps = _getInitialProps;
  Extended4.displayName = _displayName;

  return Extended4;
};


export default Page;
