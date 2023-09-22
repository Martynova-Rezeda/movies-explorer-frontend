import { BASE_URL, BASE_IMAGE_URL } from "./constants";
class MainApi {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }
  _checkResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  };

  register = ({ name, email, password }) => {
    return fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    }).then((res) => this._checkResponse(res));
  };

  login = ({ email, password }) => {
    return fetch(`${BASE_URL}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then((res) => this._checkResponse(res));
  };

  getUserProfile(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: `Bearer ${token && localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    }).then(this._checkResponse);
  }

  updateUserProfile({ name, email }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
      }),
    }).then(this._checkResponse);
  }

  getMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    }).then(this._checkResponse);
  }

  addMovies({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    id,
    nameRU,
    nameEN,
  }) {
    return fetch(`${BASE_URL}/movies`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        country,
        director,
        duration,
        year,
        description,
        image: BASE_IMAGE_URL + image.url,
        trailerLink,
        thumbnail: BASE_IMAGE_URL + image.formats.thumbnail.url,
        movieId: id,
        nameRU,
        nameEN,
      }),
    }).then((res) => this._checkResponse(res));
  }

  deleteMovies(movie) {
    return fetch(`${BASE_URL}/movies/${movie._id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    }).then((res) => this._checkResponse(res));
  }
}
export const mainApi = new MainApi(BASE_URL);
