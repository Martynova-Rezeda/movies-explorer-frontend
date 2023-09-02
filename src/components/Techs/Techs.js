import React from "react";
import "./Techs.css";

function Techs() {
  return (
    <section id="about-techs" className="about-techs">
      <h2 className="about-techs__title">Технологии</h2>
      <div className="about-techs__container">
        <h3 className="about-techs__subtitle">7 технологий</h3>
        <p className="about-techs__text">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
        <ul className="about-techs__items">
          <li className="about-techs__item">HTML</li>
          <li className="about-techs__item">CSS</li>
          <li className="about-techs__item">JS</li>
          <li className="about-techs__item">React</li>
          <li className="about-techs__item">Git</li>
          <li className="about-techs__item">Express.js</li>
          <li className="about-techs__item">mongoDB</li>
        </ul>
      </div>
    </section>
  );
}
export default Techs;
