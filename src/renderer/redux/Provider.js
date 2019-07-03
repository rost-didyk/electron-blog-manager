import React from 'react';
import PT from 'prop-types';
import flowRight from 'lodash/flowRight';
import { Provider } from 'react-redux';
import configureStore from './configureStore';

export const store = configureStore();

const Providers = ({ children }) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};

Providers.propTypes = {
  children: PT.node.isRequired,
};

export default flowRight([React.memo])(Providers);