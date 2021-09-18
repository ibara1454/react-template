import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import TodoView from '@/pages/TodoView';
import './global.css';

/**
 * The app component.
 * Global settings and routings should be configured in this component.
 */
const App: React.FC = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <TodoView showType="all" />
      </Route>
      <Route exact path="/active">
        <TodoView showType="active" />
      </Route>
      <Route exact path="/completed">
        <TodoView showType="completed" />
      </Route>
      <Redirect to="/" />
    </Switch>
  </Router>
);

export default App;
