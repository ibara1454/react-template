import React from 'react';
import { NavLink } from 'react-router-dom';

interface Props {}

const Footer: React.FC<Props> = (props) => (
  <footer className="footer">
    <span className="todo-count">
      <strong>0 left</strong>
    </span>
    <ul className="filters">
      <li>
        <NavLink to="/" exact activeClassName="selected">
          All
        </NavLink>
      </li>
      <li>
        <NavLink to="/active" exact activeClassName="selected">
          Active
        </NavLink>
      </li>
      <li>
        <NavLink to="/completed" exact activeClassName="selected">
          Completed
        </NavLink>
      </li>
    </ul>
  </footer>
);

export default Footer;
