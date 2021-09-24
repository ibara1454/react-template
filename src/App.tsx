import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Root from '@/pages';
import './global.css';

/**
 * The app component.
 * Global settings and routings should be configured in this component.
 */
const App: React.FC = () => (
  <Router>
    <Switch>
      {/*
        Allow optional parameter `path`
        https://www.npmjs.com/package/path-to-regexp#optional
      */}
      <Route path="/:path?">
        <Root />
      </Route>
    </Switch>
  </Router>
);

export default App;
