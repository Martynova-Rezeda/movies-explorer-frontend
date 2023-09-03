import React from "react";
import "./AboutMe.css";
import logoPath from "../../images/DSC_0104.jpg";

function AboutMe() {
  return (
    <section id="about-me" className="about-me">
      <h2 className="about-me__title">Студент</h2>
      <article className="about-me__container">
        <div className="about-me__info">
          <h3 className="about-me__subtitle">Резеда</h3>
          <p className="about-me__text">Фронтенд-разработчик, 32 года</p>
          <p className="about-me__description">
            Я родилась в городе Йошкар-Ола, а сейчас живу в Москве. В 2014 году
            закончила РХТУ им. Д.И. Менделеева. Без малого 10 лет проработала по
            своей профессии, но решила попробовать свои силы в IT. Я люблю
            читать книги и и играть в настольные игры. Планирую отучиться и
            найти себе работу по новой специальности.
          </p>
          <a
            className="link about-me__link"
            href="https://github.com/Martynova-Rezeda"
            rel="noreferrer"
            target="_blank"
          >
            Github
          </a>
        </div>
        <img src={logoPath} alt="Мое фото" className="about-me__photo" />
      </article>
    </section>
  );
}
export default AboutMe;
