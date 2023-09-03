import React from "react";
import "./SearchForm.css";
import loupePath from "../../images/find-3.svg";

function SearchForm() {
  return (
    <section className="search-form">
      <h2 className="search-form-title">Заголовок</h2>
      <form className="search-form__movie">
        <input
          className="search-form__movie-field"
          name="name"
          type="text"
          placeholder="Фильм"
        />
        <button className="search-form__movie-button" type="submit">
          <img
            src={loupePath}
            alt="Изображение лупы"
            className="link search-form__movie-button-image"
          />
        </button>
        <label htmlFor="switch" className="search-form__toggle">
          <input
            className="search-form__toggle-checkbox"
            type="checkbox"
            id="switch"
          />
          <span className="search-form__toggle-switch"></span>
          <span className="search-form__movie-toggle-name">
            Короткометражки
          </span>
        </label>
      </form>
    </section>
  );
}
export default SearchForm;
