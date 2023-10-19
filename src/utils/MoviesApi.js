import { BASE_MOVIE_URL } from "./constants";

class MoviesApi {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  //Метод проверки ответа сервера
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  //GET-запрос на сервер для загрузки карточек с сервера
  getMovies() {
    return fetch(`${this._baseUrl}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(this._checkResponse);
  }
}

export const moviesApi = new MoviesApi(BASE_MOVIE_URL);
