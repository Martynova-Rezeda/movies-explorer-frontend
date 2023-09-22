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
//import { MESSAGE } from "../../utils/constants";
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
    buttonText: "",
    onSubmit: () => {},
  });

  const [isTokenChecked, setIsTokenChecked] = useState(false);
  const [errorSubmitApi, setErrorSubmitApi] = useState("");
  const routesLogined = ["/signin", "/signup"];
  //1.2
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
      .catch(() => errorGetMoviesPopupOpen())
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
        res.then((err) => {
          console.log(err.message);
        });
      });
  };

  //Добавляем фильмы в сохраненные
  const addMovies = (movie) => {
    return mainApi
      .addMovies({ ...movie })
      .then(() => getSavedMovies())
      .catch((err) => {
        console.log(`Error:${err}`);
      });
  };

  //Удаляем фильмы из сохраненных
  const deleteMovies = (movie) => {
    return mainApi
      .deleteMovies(movie)
      .then(() => getSavedMovies())
      .catch((err) => {
        console.log(`Error:${err}`);
      });
  };

  //Получаем данные пользователя
  const getUser = (token) => {
    return mainApi
      .getUserProfile(token)
      .then((user) => {
        setCurrentUser({ ...user, isLoggedIn: true });
      })
      .catch((err) => {
        handleLogOutSubmit();
        console.log(err.message);
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
          buttonText: "OK",
          isError: false,
          onSubmit: closePopup,
        });
        infoTooltipOpen();
      })
      .catch((res) => {
        res.then((err) => {
          console.log(err.message);
          setErrorSubmitApi(err.message);
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
        res.then((err) => {
          setErrorSubmitApi(err.message);
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
        res.then((err) => {
          if (err.statusCode === 400) {
            setErrorSubmitApi("При регистрации пользователя произошла ошибка.");
          } else {
            setErrorSubmitApi(err.message);
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
      .catch((err) => {
        handleLogOutSubmit();
        console.log(err);
      })
      .finally(() => setIsTokenChecked(true));
  };

  const infoTooltipOpen = () => {
    setIsInfoTooltipOpen(true);
  };
  const closePopup = () => {
    setIsInfoTooltipOpen(false);
  };

  const onInputSearchError = () => {
    setInfoTooltipProps({
      ...infoTooltipProps,
      message: "Нужно ввести ключевое слово",
      buttonText: "OK",
      isError: true,
      onSubmit: closePopup,
    });
    infoTooltipOpen();
  };

  const errorGetMoviesPopupOpen = () => {
    setInfoTooltipProps({
      ...infoTooltipProps,
      message:
        "Во время запроса произошла ошибка. " +
        "Возможно, проблема с соединением или сервер недоступен. " +
        "Подождите немного и попробуйте ещё раз",
      buttonText: "OK",
      isError: true,
      onSubmit: closePopup,
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
            element={<Register onRegistationSubmit={handleRegistationSubmit} />}
          />
          <Route
            path="/signin"
            element={<Login onLoginSubmit={handleLoginSubmit} />}
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                element={Profile}
                isLoggedIn={currentUser.isLoggedIn}
                isTokenChecked={isTokenChecked}
                onSignOut={handleLogOutSubmit}
                errorSubmitApi={errorSubmitApi}
                onUpdateUserProfile={onUpdateUserProfile}
              />
            }
          />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          isRegistered={true}
          onClose={closePopup}
          name="infoTooltip"
          buttonText={infoTooltipProps.buttonText}
          isError={infoTooltipProps.isError}
          message={infoTooltipProps.message}
          onSubmit={infoTooltipProps.onSubmit}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
