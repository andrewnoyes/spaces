import React from 'react';
import { BrowserRouter, withRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';

import App from './App';

import * as stores from 'stores';

const AppWithRouter = withRouter(App);
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Provider {...stores}>
        <AppWithRouter />
      </Provider>
    </BrowserRouter>
  );
};

export default AppRouter;
