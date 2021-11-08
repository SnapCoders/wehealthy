import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import { Dashboard } from '@pages/Dashboard';
import { Search } from '@pages/Search';
import { SignIn } from '@pages/SignIn';

import { Route } from './Route';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={SignIn} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/" component={Dashboard} isPrivate />
      </Switch>
    </BrowserRouter>
  );
};

export { Routes };
