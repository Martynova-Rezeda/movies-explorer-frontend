import React from "react";
import "./AboutProject.css";

function AboutProject() {
  return (
    <section id="about-project" className="about-project">
      <h2 className="about-project__title">О проекте</h2>
      <div className="about-project__container">
        <ul className="about-project__items">
          <li className="about-project__item">
            <h3 className="about-project__subtitle">
              Дипломный проект включал 5 этапов
            </h3>
            <p className="about-project__text">
              Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные доработки.
            </p>
          </li>
          <li className="about-project__item">
            <h3 className="about-project__subtitle">
              На выполнение диплома ушло 5 недель
            </h3>
            <p className="about-project__text">
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
              соблюдать, чтобы успешно защититься.
            </p>
          </li>
        </ul>
      </div>
      <div className="about-project__steps">
        <p className="about-project__step-week">1 неделя</p>
        <p className="about-project__step-week">4 недели</p>
        <p className="about-project__step-name">Front-end</p>
        <p className="about-project__step-name">Back-end</p>
      </div>
    </section>
  );
}
export default AboutProject;
