import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import TodoList from '@/pages/TodoList';
import './global.css';

/**
 * The app component.
 * Global settings and routings should be configured in this component.
 */
const App: React.FC = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <TodoList showType="all" />
      </Route>
      <Route exact path="/active">
        <TodoList showType="active" />
      </Route>
      <Route exact path="/completed">
        <TodoList showType="completed" />
      </Route>
      <Redirect to="/" />
    </Switch>
  </Router>
);

export default App;
