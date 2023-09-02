import React from "react";
import { Link } from "react-router-dom";
import "./HeaderRegistration.css";

function HeaderRegistration() {
  return (
    <nav className="header__menu">
      <Link to="/sign-up" className="link header__menu-link">
        Регистрация
      </Link>
      <Link to="/sign-in" className="link header__menu-button">
        Вход
      </Link>
    </nav>
  );
}
export default HeaderRegistration;
