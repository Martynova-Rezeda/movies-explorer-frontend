import React from "react";
import { useState } from "react";
import "./MoviesCard.css";
import MovieImage from "../../images/pic__COLOR_pic.png";
//import onButton from "../../images/save3.svg";
//import offButton from "../../images/save3d.png";

function MoviesCard({ icon }) {
  const [savedMovie, setSavedMovie] = useState(false);

  function handleSavedMovie() {
    if (!savedMovie && icon === "saved") {
      return setSavedMovie(true);
    }
    return setSavedMovie(false);
  }
  return (
    <>
      <div className="movies-list__element">
        <img
          src={MovieImage}
          alt="Обложка фильма"
          className="movies-list__element-picture"
        />
        <button
          type="submit"
          onClick={handleSavedMovie}
          className={`movies-list__${icon} movies-list__${icon}_${
            savedMovie ? "active" : ""
          }`}
        ></button>
        <div className="movies-list__element-info">
          <h2 className="movies-list__element-title">33 слова о дизайне</h2>
          <p className="movies-list__element-duration">1ч 47м</p>
        </div>
      </div>
      <div className="movies-list__element">
        <img
          src={MovieImage}
          alt="Обложка фильма"
          className="movies-list__element-picture"
        />
        <button
          type="submit"
          onClick={handleSavedMovie}
          className={`movies-list__${icon} movies-list__${icon}_${
            savedMovie ? "active" : ""
          }`}
        ></button>
        <div className="movies-list__element-info">
          <h2 className="movies-list__element-title">33 слова о дизайне</h2>
          <p className="movies-list__element-duration">1ч 47м</p>
        </div>
      </div>
      <div className="movies-list__element">
        <img
          src={MovieImage}
          alt="Обложка фильма"
          className="movies-list__element-picture"
        />
        <button
          type="submit"
          onClick={handleSavedMovie}
          className={`movies-list__${icon} movies-list__${icon}_${
            savedMovie ? "active" : ""
          }`}
        ></button>
        <div className="movies-list__element-info">
          <h2 className="movies-list__element-title">33 слова о дизайне</h2>
          <p className="movies-list__element-duration">1ч 47м</p>
        </div>
      </div>
      <div className="movies-list__element">
        <img
          src={MovieImage}
          alt="Обложка фильма"
          className="movies-list__element-picture"
        />
        <button
          type="submit"
          onClick={handleSavedMovie}
          className={`movies-list__${icon} movies-list__${icon}_${
            savedMovie ? "active" : ""
          }`}
        ></button>
        <div className="movies-list__element-info">
          <h2 className="movies-list__element-title">33 слова о дизайне</h2>
          <p className="movies-list__element-duration">1ч 47м</p>
        </div>
      </div>
      <div className="movies-list__element">
        <img
          src={MovieImage}
          alt="Обложка фильма"
          className="movies-list__element-picture"
        />
        <button
          type="submit"
          onClick={handleSavedMovie}
          className={`movies-list__${icon} movies-list__${icon}_${
            savedMovie ? "active" : ""
          }`}
        ></button>
        <div className="movies-list__element-info">
          <h2 className="movies-list__element-title">33 слова о дизайне</h2>
          <p className="movies-list__element-duration">1ч 47м</p>
        </div>
      </div>
      <div className="movies-list__element">
        <img
          src={MovieImage}
          alt="Обложка фильма"
          className="movies-list__element-picture"
        />
        <button
          type="submit"
          onClick={handleSavedMovie}
          className={`movies-list__${icon} movies-list__${icon}_${
            savedMovie ? "active" : ""
          }`}
        ></button>
        <div className="movies-list__element-info">
          <h2 className="movies-list__element-title">33 слова о дизайне</h2>
          <p className="movies-list__element-duration">1ч 47м</p>
        </div>
      </div>
      <div className="movies-list__element">
        <img
          src={MovieImage}
          alt="Обложка фильма"
          className="movies-list__element-picture"
        />
        <button
          type="submit"
          onClick={handleSavedMovie}
          className={`movies-list__${icon} movies-list__${icon}_${
            savedMovie ? "active" : ""
          }`}
        ></button>
        <div className="movies-list__element-info">
          <h2 className="movies-list__element-title">33 слова о дизайне</h2>
          <p className="movies-list__element-duration">1ч 47м</p>
        </div>
      </div>
      <div className="movies-list__element">
        <img
          src={MovieImage}
          alt="Обложка фильма"
          className="movies-list__element-picture"
        />
        <button
          type="submit"
          onClick={handleSavedMovie}
          className={`movies-list__${icon} movies-list__${icon}_${
            savedMovie ? "active" : ""
          }`}
        ></button>
        <div className="movies-list__element-info">
          <h2 className="movies-list__element-title">33 слова о дизайне</h2>
          <p className="movies-list__element-duration">1ч 47м</p>
        </div>
      </div>
      <div className="movies-list__element">
        <img
          src={MovieImage}
          alt="Обложка фильма"
          className="movies-list__element-picture"
        />
        <button
          type="submit"
          onClick={handleSavedMovie}
          className={`movies-list__${icon} movies-list__${icon}_${
            savedMovie ? "active" : ""
          }`}
        ></button>
        <div className="movies-list__element-info">
          <h2 className="movies-list__element-title">33 слова о дизайне</h2>
          <p className="movies-list__element-duration">1ч 47м</p>
        </div>
      </div>
      <div className="movies-list__element">
        <img
          src={MovieImage}
          alt="Обложка фильма"
          className="movies-list__element-picture"
        />
        <button
          type="submit"
          onClick={handleSavedMovie}
          className={`movies-list__${icon} movies-list__${icon}_${
            savedMovie ? "active" : ""
          }`}
        ></button>
        <div className="movies-list__element-info">
          <h2 className="movies-list__element-title">33 слова о дизайне</h2>
          <p className="movies-list__element-duration">1ч 47м</p>
        </div>
      </div>
      <div className="movies-list__element">
        <img
          src={MovieImage}
          alt="Обложка фильма"
          className="movies-list__element-picture"
        />
        <button
          type="submit"
          onClick={handleSavedMovie}
          className={`movies-list__${icon} movies-list__${icon}_${
            savedMovie ? "active" : ""
          }`}
        ></button>
        <div className="movies-list__element-info">
          <h2 className="movies-list__element-title">33 слова о дизайне</h2>
          <p className="movies-list__element-duration">1ч 47м</p>
        </div>
      </div>
      <div className="movies-list__element">
        <img
          src={MovieImage}
          alt="Обложка фильма"
          className="movies-list__element-picture"
        />
        <button
          type="submit"
          onClick={handleSavedMovie}
          className={`movies-list__${icon} movies-list__${icon}_${
            savedMovie ? "active" : ""
          }`}
        ></button>
        <div className="movies-list__element-info">
          <h2 className="movies-list__element-title">33 слова о дизайне</h2>
          <p className="movies-list__element-duration">1ч 47м</p>
        </div>
      </div>
    </>
  );
}
export default MoviesCard;
