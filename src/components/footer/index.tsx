import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './style.module.css';

interface Props {}

const Footer: React.FC<Props> = () => (
  <footer className={style.root}>
    <span className={style.count}>
      <strong>0 left</strong>
    </span>
    <ul className={style.filters}>
      <li>
        <NavLink
          to="/"
          exact
          className={style.link}
          activeClassName={style.selected}
        >
          All
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/active"
          exact
          className={style.link}
          activeClassName={style.selected}
        >
          Active
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/completed"
          exact
          className={style.link}
          activeClassName={style.selected}
        >
          Completed
        </NavLink>
      </li>
    </ul>
  </footer>
);

export default Footer;
