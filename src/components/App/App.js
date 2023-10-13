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


  //Состояния загрузки
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);
  const [isLoadingRegister, setIsLoadingRegister] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  //Состояния фильмов пользователя
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
//getMovies();
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
      .then((newMovie) => {
        setSaveMovies([...saveMovies, newMovie]);
      })
      .catch((error) => {
        console.log(`Error:${error}`);
      });
  };

  //Удаляем фильмы из сохраненных
  const deleteMovies = (movie) => {
    return mainApi
      .deleteMovies(movie)
      .then(() => {
        setSaveMovies((movies) =>
          movies.filter((item) => item._id !== movie._id)
        )})
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
    setIsLoadingProfile(true);
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
      })
      .finally(() => {
        setIsLoadingProfile(false);
      });
  };

  // обработчик авторизации пользователя
  const handleLoginSubmit = ({ email, password }) => {
    setIsLoadingLogin(true);
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
      })
      .finally(() => {
        setIsLoadingLogin(false);
      });
  };

  //Обработчик регистрации пользователя
  const handleRegistationSubmit = ({ name, email, password }) => {
    setIsLoadingRegister(true);
    return mainApi
      .register({ name, email, password })
      .then(() => {
        handleLoginSubmit({ email, password });
      })
      .catch((res) => {
        res.then((error) => {
          if (error.statusCode === 400) {
            console.log(error.message);
            setErrorMessage("При регистрации пользователя произошла ошибка.");
          } else {
            setErrorMessage(error.message);
            console.log(error.message);
          }
        });
      })
      .finally(() => {
        setIsLoadingRegister(false);
      });
  };
  //Обработка выхода пользователя
  const handleLogOutSubmit = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("checkbox");
    localStorage.removeItem('name');
    localStorage.removeItem('films');
    localStorage.removeItem('foundMovies');
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
                onLoading={isLoading}
                onInputSearchError={onInputSearchError}
                isLoggedIn={currentUser.isLoggedIn}
                isTokenChecked={isTokenChecked}
                saveMovies={saveMovies}
                likeMovies={addMovies}
                disLikeMovies={deleteMovies}
                setIsLoading={setIsLoading}
                errorMoviesPopupOpen={errorMoviesPopupOpen}     />
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
                onLoading={isLoading}
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
                onLoading={isLoadingRegister}
             
              />
            }
          />
          <Route
            path="/signin"
            element={
              <Login
                onLoginSubmit={handleLoginSubmit}
                errorMessage={errorMessage}
                onLoading={isLoadingLogin}
                
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
                onLoading={isLoadingProfile}
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
