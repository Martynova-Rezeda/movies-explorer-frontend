import React from "react";
import "./BurgerMenu.css";
import { NavLink, Link } from "react-router-dom";
import closeIcon from "../../images/Group.svg";

function BurgerMenu({ isOpen, onClick }) {
  return (
    <div className={isOpen ? "burger burger__open" : "burger"}>
      <div className="burger__conteiner">
        <button className="burger__close" type="button" onClick={onClick}>
          <img
            className="burger__close-icon"
            src={closeIcon}
            alt="Закрыть меню"
          />
        </button>
        <nav>
          <ul className="burger__items">
            <li className="burger__item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "burger__item-link-active"
                    : "link burger__item-link"
                }
              >
                Главная
              </NavLink>
            </li>
            <li className="burger__item">
              <NavLink
                to="/movies"
                className={({ isActive }) =>
                  isActive
                    ? "burger__item-link-active"
                    : "link burger__item-link"
                }
              >
                Фильмы
              </NavLink>
            </li>
            <li className="burger__item">
              <NavLink
                to="/saved-movies"
                className={({ isActive }) =>
                  isActive
                    ? "burger__item-link-active"
                    : "link burger__item-link"
                }
              >
                Сохраненные фильмы
              </NavLink>
            </li>
            <li className="burger__item">
              <button
                type="button"
                className="header__menu-profile header__menu-profile-in-burger"
              >
                <Link className="link header__menu-profile-link " to="/profile">
                  Аккаунт
                </Link>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
export default BurgerMenu;
