import React from "react";
import "./Footer.css";

function Portfolio() {
  return (
    <footer className="footer">
      <h2 className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h2>
      <div className="footer__container">
        <p className="footer__year">© 2020</p>
        <nav className="footer__links">
          <a
            href="https://practicum.yandex.ru/"
            target="_blank"
            rel="noreferrer"
            className="link footer__link"
          >
            Яндекс.Практикум
          </a>
          <a
            href="https://github.com/ "
            target="_blank"
            rel="noreferrer"
            className="link footer__link"
          >
            Github
          </a>
        </nav>
      </div>
    </footer>
  );
}
export default Portfolio;
