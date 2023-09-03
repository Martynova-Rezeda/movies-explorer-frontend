import React from "react";
import { Link } from "react-router-dom";
import "./HeaderProfile.css";
import burgerOpen from "../../images/icon__COLOR_icon-main.svg";

function HeaderProfile({ isOpen }) {
  return (
    <>
      <button type="button" className="header__menu-profile">
        <Link className="link header__menu-profile-link" to="/profile">
          Аккаунт
        </Link>
      </button>
      <button className="header__menu-burger" type="button" onClick={isOpen}>
        <img
          src={burgerOpen}
          className="header__menu-burger-btn"
          alt="Открыть меню"
        />
      </button>
    </>
  );
}
export default HeaderProfile;
