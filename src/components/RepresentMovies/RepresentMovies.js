import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import { shortFilterMovies } from "../../utils/filter";

const RepresentMovies = ({
  movies,
  saveMovies,
  isLoading,
  isChecked,
  likeMovies,
  disLikeMovies,
  numberMovies = movies.length,
}) => {
  const notFoundMovies = (
    <h2 className="movies-list-title">Ничего не найдено</h2>
  );

  const representMovies = shortFilterMovies(movies, isChecked)
    .slice(0, numberMovies)
    .map((movie) => {
      return (
        <MoviesCard
          movie={movie}
          saveMovies={saveMovies}
          key={movie.id || movie._id}
          likeMovies={likeMovies}
          disLikeMovies={disLikeMovies}
        />
      );
    });

  return (
    <>
      {!isLoading
        ? representMovies.length === 0
          ? notFoundMovies
          : representMovies
        : ""}
    </>
  );
};

export default RepresentMovies;
