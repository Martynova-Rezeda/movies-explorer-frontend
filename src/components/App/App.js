import { React, useState, useEffect } from "react";
import Main from "../Main/Main";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import PageNotFound from "../PageNotFound/PageNotFound";
import "./App.css";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Movies from "../Movies/Movies";
import Profile from "../Profile/Profile";
import SavedMovies from "../SavedMovies/SavedMovies";
import InfoTooltip from "../InfoTooltip/Infotooltip";
import { moviesApi } from "../../utils/MoviesApi";
import { mainApi } from "../../utils/MainApi";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { filterMovies } from "../../utils/filter";
function App() {
  const navigate = useNavigate();
  const location = useLocation();

  //Состояния аутентификации пользователя и его данных
  const [currentUser, setCurrentUser] = useState({
    name: "",
    isLoggedIn: false,
    email: "",
    _id: "",
  });

  //Состояния фильмов пользователя
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [saveMovies, setSaveMovies] = useState([]);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  //Состояния уведомлений пользователя
  const [infoTooltipProps, setInfoTooltipProps] = useState({
    message: "",
    isError: false,
  });

  const [isTokenChecked, setIsTokenChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const routesLogined = ["/signin", "/signup"];

  useEffect(() => {
    if (isTokenChecked && currentUser.isLoggedIn) {
      routesLogined.includes(location.pathname) &&
        navigate("/movies", { replace: true });
      getMovies();
      getSavedMovies();
    }
  }, [isTokenChecked, currentUser.isLoggedIn]);

  //Проверка токена
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      checkToken(token);
    } else {
      setIsTokenChecked(true);
    }
  }, [currentUser.isLoggedIn]);

  const getMovies = (name = "") => {
    setIsLoading(true);
    moviesApi
      .getMovies()
      .then((dataMovies) => {
        setMovies([...filterMovies(dataMovies, name)]);
      })
      .catch(() => errorMoviesPopupOpen())
      .finally(() => {
        setIsLoading(false);
      });
  };

  const getSavedMovies = (name = "") => {
    return mainApi
      .getMovies()
      .then((data) => {
        setSaveMovies([...filterMovies(data, name)]);
      })
      .catch((res) => {
        res.then((error) => {
          console.log(error.message);
        });
      });
  };

  //Добавляем фильмы в сохраненные
  const addMovies = (movie) => {
    return mainApi
      .addMovies({ ...movie })
      .then(() => getSavedMovies())
      .catch((error) => {
        console.log(`Error:${error}`);
      });
  };

  //Удаляем фильмы из сохраненных
  const deleteMovies = (movie) => {
    return mainApi
      .deleteMovies(movie)
      .then(() => getSavedMovies())
      .catch((error) => {
        console.log(`Error:${error}`);
      });
  };

  //Получаем данные пользователя
  const getUser = (token) => {
    return mainApi
      .getUserProfile(token)
      .then((user) => {
        setCurrentUser({ ...user, isLoggedIn: true });
      })
      .catch((error) => {
        handleLogOutSubmit();
        console.log(error.message);
      });
  };
  //Обновляем данные пользователя
  const onUpdateUserProfile = ({ email, name }) => {
    return mainApi
      .updateUserProfile({ email, name })
      .then((data) => {
        setCurrentUser({ ...currentUser, name: data.name, email: data.email });
        setInfoTooltipProps({
          ...infoTooltipProps,
          message: "Данные успешно обновлены.",
          isError: false,
        });
        infoTooltipOpen();
      })
      .catch((res) => {
        res.then((error) => {
          setErrorMessage(error.message);
        });
      });
  };

  // обработчик авторизации пользователя
  const handleLoginSubmit = ({ email, password }) => {
    return mainApi
      .login({ email, password })
      .then((data) => {
        localStorage.setItem("token", data.token);
        setCurrentUser({ ...currentUser, isLoggedIn: true });
        getUser(data.token);
        navigate("/movies", { replace: true });
      })
      .catch((res) => {
        res.then((error) => {
          setErrorMessage(error.message);
        });
      });
  };

  //Обработчик регистрации пользователя
  const handleRegistationSubmit = ({ name, email, password }) => {
    return mainApi
      .register({ name, email, password })
      .then(() => {
        handleLoginSubmit({ email, password });
      })
      .catch((res) => {
        res.then((error) => {
          if (error.statusCode === 400) {
            setErrorMessage("При регистрации пользователя произошла ошибка.");
          } else {
            setErrorMessage(error.message);
            console.log(error.message);
          }
        });
      });
  };
  //Обработка выхода пользователя
  const handleLogOutSubmit = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("checkbox");
    setIsTokenChecked(false);
    setCurrentUser({ name: "", isLoggedIn: false, email: "", _id: "" });
    navigate("/", { replace: true });
  };

  const checkToken = async (token) => {
    mainApi
      .getUserProfile(token)
      .then((res) => {
        if (res) {
          setCurrentUser({
            ...currentUser,
            isLoggedIn: true,
            ...res,
          });
        }
      })
      .catch((error) => {
        handleLogOutSubmit();
        console.log(error);
      })
      .finally(() => setIsTokenChecked(true));
  };

  //Oткрытиe попапа оповещения
  const infoTooltipOpen = () => {
    setIsInfoTooltipOpen(true);
  };

  //Закрытие попапа оповещения
  const closePopup = () => {
    setIsInfoTooltipOpen(false);
  };

  //Попап поиска фильмов
  const onInputSearchError = () => {
    setInfoTooltipProps({
      ...infoTooltipProps,
      message: "Нужно ввести ключевое слово",
      isError: true,
    });
    infoTooltipOpen();
  };

  const errorMoviesPopupOpen = () => {
    setInfoTooltipProps({
      ...infoTooltipProps,
      message:
        "Во время запроса произошла ошибка. " +
        "Возможно, проблема с соединением или сервер недоступен. " +
        "Подождите немного и попробуйте ещё раз",
      isError: true,
    });
    infoTooltipOpen();
  };
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={<Main isLoggedIn={currentUser.isLoggedIn} />}
          />
          <Route
            path="/movies"
            element={
              <ProtectedRoute
                element={Movies}
                isLoading={isLoading}
                onInputSearchError={onInputSearchError}
                isLoggedIn={currentUser.isLoggedIn}
                isTokenChecked={isTokenChecked}
                movies={movies}
                saveMovies={saveMovies}
                likeMovies={addMovies}
                disLikeMovies={deleteMovies}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute
                element={SavedMovies}
                isLoggedIn={currentUser.isLoggedIn}
                movies={saveMovies}
                onInputSearchError={onInputSearchError}
                isTokenChecked={isTokenChecked}
                isLoading={isLoading}
                disLikeMovies={deleteMovies}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <Register
                onRegistationSubmit={handleRegistationSubmit}
                errorMessage={errorMessage}
              />
            }
          />
          <Route
            path="/signin"
            element={
              <Login
                onLoginSubmit={handleLoginSubmit}
                errorMessage={errorMessage}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                element={Profile}
                isLoggedIn={currentUser.isLoggedIn}
                isTokenChecked={isTokenChecked}
                onSignOut={handleLogOutSubmit}
                errorMessage={errorMessage}
                onUpdateUserProfile={onUpdateUserProfile}
              />
            }
          />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closePopup}
          name="infoTooltip"
          isError={infoTooltipProps.isError}
          message={infoTooltipProps.message}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
