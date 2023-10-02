import { MOVIE_DURATION } from "./constants";

//Фильтруем  все фильмы
const filterMovies = (movies, keyWord) => {
  const word = keyWord.toLowerCase().trim();

  const searchedMovies = movies.filter((movie) => {
    const ruName = movie.nameRU && movie.nameRU.toLowerCase().trim();
    const enName = movie.nameEN && movie.nameEN.toLowerCase().trim();
    return ruName.match(word) || (enName && enName.match(word));
  });
  return searchedMovies;
};

//Фильтруем фильмы по продолжительности
const shortFilterMovies = (movies, isChecked) => {
  if (isChecked) {
    return movies.filter((movie) => movie.duration <= MOVIE_DURATION);
  } else {
    return movies;
  }
};

export { filterMovies, shortFilterMovies };
