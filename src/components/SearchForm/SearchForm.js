import React from "react";
import "./SearchForm.css";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import loupePath from "../../images/find-3.svg";
import useInput from "../../hooks/useInput";

function SearchForm({
  onSubmit,
  isChecked,
  onInputSearchError,
  initialName ,
  handleInputChecked,
  handleSaveSearchSubmit,
  handleInputCheckedToggle
}) {

  const searchInput = useInput({});
  const location = useLocation();

 useEffect(() => {
    searchInput.setValue(initialName);
  }, [initialName]);
  
  
  const handleSubmit = (evt) => {
     evt.preventDefault();
     if (location.pathname === "/movies"){
     searchInput.value !== ""
       ? onSubmit(searchInput.value)
       : onInputSearchError();
     } else {
     handleSaveSearchSubmit(searchInput.value)
    }
   };


  const handleToggle = (evt) => {
    if (location.pathname === "/movies"){
   searchInput.value !== ""
      ? handleInputChecked(evt.target.checked, searchInput.value)
      : onInputSearchError(); 
  }
    else{
       handleInputCheckedToggle(evt.target.checked, searchInput.value) 
    }
    }


  return (
    <section className="search-form">
      <h2 className="search-form-title">Заголовок</h2>
      <form className="search-form__movie" onSubmit={handleSubmit} noValidate>
        <input
          className="search-form__movie-field"
          name="name"
          type="text"
          placeholder="Фильм"
          defaultValue={initialName}
          required
          onChange={searchInput.onChange}
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
            checked={isChecked}
            onChange={handleToggle}
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


