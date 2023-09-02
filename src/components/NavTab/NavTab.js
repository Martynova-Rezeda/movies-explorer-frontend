import React from "react";
import "./NavTab.css";

function NavTab() {
  return (
    <nav className="promo__menu-items">
      <a className="link promo__menu-item-link" href="#about-project">
        О проекте
      </a>
      <a className="link promo__menu-item-link" href="#about-techs">
        Технологии
      </a>
      <a className="link promo__menu-item-link" href="#about-me">
        Студент
      </a>
    </nav>
  );
}
export default NavTab;
