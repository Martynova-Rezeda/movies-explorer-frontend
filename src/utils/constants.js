const BASE_MOVIE_URL = "https://api.nomoreparties.co/beatfilm-movies";
const BASE_URL = "http://localhost:3000";
const BASE_IMAGE_URL = "https://api.nomoreparties.co";

const REGEX_EMAIL =
  "^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@" +
  "[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$";

const MESSAGE = {
  notFound: "Ничего не найдено",
  serverError:
    "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз",
  badRequestError: "При регистрации пользователя произошла ошибка.",
};

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
  MESSAGE,
  REGEX_EMAIL,
  DEVICE_PARAMS,
};