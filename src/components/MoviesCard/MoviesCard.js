import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCard.css";
import { BASE_IMAGE_URL } from "../../utils/constants";
import { CurrentUserContext } from "../../context/CurrentUserContext";

function MoviesCard({ movie, saveMovies, likeMovies, disLikeMovies }) {
  const location = useLocation();
  const currentUser = useContext(CurrentUserContext);
  const [isLikeMovie, setIsLikeMovie] = useState(false);
  const name = movie.nameRU;
  const duration = movie.duration;
  const urlImage =
    location.pathname === "/movies"
      ? `${BASE_IMAGE_URL}${movie.image.url}`
      : movie.image;
  const trailerLink = movie.trailerLink;
  const cardLikeBtnClassName = `movies-list__saved ${
    isLikeMovie ? "movies-list__saved_active" : ""
  }`;

  useEffect(() => {
    if (location.pathname === "/movies") {
      const isOwner = saveMovies.some(
       (saveMovie) => saveMovie.movieId === movie.id && saveMovie.owner === currentUser._id 
      );
      setIsLikeMovie(isOwner);
    }
  }, [currentUser._id, location.pathname, movie.id, saveMovies]);
  

  const handlelikeBtn = () => {
    if (location.pathname === "/movies") {
      isLikeMovie
        ? disLikeMovies(saveMovies.find((item) => item.movieId === movie.id))
        : likeMovies(movie);
    } else {
      disLikeMovies(movie);
    }
    setIsLikeMovie((state) => !state);
  };

  return (
    <>
      <li className="movies-list__element">
        <a
          href={trailerLink}
          className="movies-list__element-tailerLink"
          target="_blanck"
        >
          <img
            src={urlImage}
            alt="Обложка фильма"
            className="movies-list__element-picture"
          />
        </a>
        {location.pathname === "/movies" ? (
          <button
            className={cardLikeBtnClassName}
            type="button"
            onClick={handlelikeBtn}
          ></button>
        ) : (
          <button
            className="movies-list__delete"
            type="button"
            onClick={handlelikeBtn}
          ></button>
        )}
        <div className="movies-list__element-info">
          <h2 className="movies-list__element-title">{name}</h2>
          <p className="movies-list__element-duration">
            {(duration / 60) | 0}ч {duration % 60}м
          </p>
        </div>
      </li>
    </>
  );
}
export default MoviesCard;
