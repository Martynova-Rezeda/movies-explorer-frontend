import React from "react";
import logoPath from "../../images/logo.svg";
import { Link } from "react-router-dom";
import { useState } from "react";
import HeaderMenuMovies from "../HeaderMenuMovies/HeaderMenuMovies";
import HeaderRegistration from "../HeaderRegistation/HeaderRegistration";
import HeaderProfile from "../HeaderProfile/HeaderProfile";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import "./Header.css";

function Header({ auth }) {
  const [isOpen, setIsOpen] = useState(false);

  function handleOpenMenu() {
    setIsOpen(true);
  }

  function handleCloseMenu() {
    setIsOpen(false);
  }

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/">
          <img src={logoPath} alt="Логотип сайта" className="logo" />
        </Link>
        {auth && <HeaderMenuMovies onClick={handleOpenMenu} />}
        {!auth ? (
          <HeaderRegistration />
        ) : (
          <HeaderProfile isOpen={handleOpenMenu} />
        )}
        {auth && <BurgerMenu isOpen={isOpen} onClick={handleCloseMenu} />}
      </div>
    </header>
  );
}
export default Header;
