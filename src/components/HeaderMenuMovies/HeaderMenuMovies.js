import React from "react";
import { NavLink } from "react-router-dom";
import "./HeaderMenuMovies.css";

function HeaderMenuMovies() {
  return (
    <nav className="header__movies-menu">
      <NavLink
        to="/movies"
        className={({ isActive }) =>
          isActive
            ? "header__movies-menu-link_active"
            : "link header__movies-menu-link"
        }
      >
        Фильмы
      </NavLink>
      <NavLink
        to="/saved-movies"
        className={({ isActive }) =>
          isActive
            ? "header__movies-menu-link_active"
            : "link header__movies-menu-link"
        }
      >
        Сохраненные фильмы
      </NavLink>
    </nav>
  );
}
export default HeaderMenuMovies;
