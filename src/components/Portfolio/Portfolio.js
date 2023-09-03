import React from "react";
import "./Portfolio.css";

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__items">
        <li className="portfolio__item">
          <a
            className="link portfolio__item-link"
            href="https://github.com/Martynova-Rezeda/how-to-learn"
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            Статичный сайт
          </a>
        </li>
        <li className="portfolio__item">
          <a
            className="link portfolio__item-link"
            href="https://martynova-rezeda.github.io/russian-travel/"
            target="_blank"
            rel="noreferrer"
          >
            Адаптивный сайт
          </a>
        </li>
        <li className="portfolio__item">
          <a
            className="link portfolio__item-link"
            href="https://mesto.martynova.nomoredomains.xyz"
            target="_blank"
            rel="noreferrer"
          >
            Одностраничное приложение
          </a>
        </li>
      </ul>
    </section>
  );
}
export default Portfolio;
