import React from 'react';
import { NavLink } from 'react-router-dom';
import './SideNavBar.css';

const SideNavBar = () => {
  return (
    <aside className="sidebar">
      <nav>
        <ul className="nav-list">
          {/* Use NavLink for active class styling */}
          <li className="nav-item">
            <NavLink
              to="/"
              className="nav-link"
              exact
              activeClassName="active"
            >
              Board
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/backlog"
              className="nav-link"
              activeClassName="active"
            >
              Backlog
            </NavLink>
          </li>
          {/* <li className="nav-item">
            <NavLink
     
              className="nav-link"
              activeClassName="active"
            >
              Reports
            </NavLink>
          </li>
          <li className="nav-item"> */}
            {/* <NavLink
             
              className="nav-link"
              activeClassName="active"
            >
             Sprints
            </NavLink> */}
          {/* </li> */}
        </ul>
      </nav>
    </aside>
  );
};

export default SideNavBar;
