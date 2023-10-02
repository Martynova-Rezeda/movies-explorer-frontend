const BASE_MOVIE_URL = "https://api.nomoreparties.co/beatfilm-movies";
//const BASE_URL = "http://localhost:3000";
const BASE_URL = "https://api.movies.martynova.nomoreparties.co";
const BASE_IMAGE_URL = "https://api.nomoreparties.co";
const MOVIE_DURATION = 40;
const REGEX_EMAIL =
  "^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@" +
  "[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$";

const DEVICE_PARAMS = {
  desktop: {
    maxMovies: 12,
    moreMovies: 3,
    maxSize: 1280,
  },

  pad: {
    maxMovies: 8,
    moreMovies: 2,
    maxSize: 768,
  },

  mobile: {
    maxMovies: 5,
    moreMovies: 2,
    maxSize: 320,
  },
};

export {
  BASE_MOVIE_URL,
  BASE_URL,
  BASE_IMAGE_URL,
  MOVIE_DURATION,
  REGEX_EMAIL,
  DEVICE_PARAMS,
};
