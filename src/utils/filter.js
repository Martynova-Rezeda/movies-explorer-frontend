import { MOVIE_DURATION } from "./constants";

//Фильтруем  все фильмы 
const filterMovies = (movies, keyWord) => {
  const searchedMovies = movies.filter((movie) => 
  movie.nameRU.toLowerCase().includes(keyWord.toLowerCase()) || 
  movie.nameEN.toLowerCase().includes(keyWord.toLowerCase()) 
  )
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

//Фильтрация по продолжительности фильма и по названию
const filterSearchShortMovies = (movies, keyWord, isChecked) => {
  return movies.filter((movie) => {
  const filterMovieInclude = 
  movie.nameRU.trim().toLowerCase().includes(keyWord.trim().toLowerCase()) ||
  movie.nameEN.trim().toLowerCase().includes(keyWord.trim().toLowerCase())
  return isChecked
    ? (movie.duration <= MOVIE_DURATION) && filterMovieInclude
    : filterMovieInclude
  })
  }

export { filterMovies, shortFilterMovies, filterSearchShortMovies };


