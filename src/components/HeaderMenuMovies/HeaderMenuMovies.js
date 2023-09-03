import React from "react";
import { NavLink } from "react-router-dom";
import "./HeaderMenuMovies.css";

function HeaderMenuMovies() {
  return (
    <nav className="navigation">
      <div className="navigation__link">
        <NavLink
          to="/movies"
          className={({ isActive }) =>
            isActive
              ? "navigation__link-item-active"
              : "link navigation__link-item"
          }
        >
          Фильмы
        </NavLink>
        <NavLink
          to="/saved-movies"
          className={({ isActive }) =>
            isActive
              ? "navigation__link-item-active"
              : "link navigation__link-item"
          }
        >
          Сохраненные фильмы
        </NavLink>
      </div>
    </nav>
  );
}
export default HeaderMenuMovies;
