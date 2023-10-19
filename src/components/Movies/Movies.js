import React from "react";
import { useState,  useContext } from "react";
import { filterSearchShortMovies } from "../../utils/filter";
import "./Movies.css";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import RepresentMovies from "../RepresentMovies/RepresentMovies";
import ButtonMoreMovies from "../Button/ButtonMoreMovies";
import Footer from "../Footer/Footer";
import useDevice from "../../hooks/useDevice";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { moviesApi } from "../../utils/MoviesApi";

function Movies({
  saveMovies,
  onInputSearchError,
  onLoading,
  likeMovies,
  disLikeMovies,
  setIsLoading,
  errorMoviesPopupOpen
}) {

  const currentUser = useContext(CurrentUserContext);
  const [isChecked, setIsChecked] = useState(localStorage.getItem("checkbox") === 'true');// состояние чекбокса
  const [initialName, setInitialName] = useState(localStorage.getItem("name") || ""); //состояние строки поиска
  const [movies, setMovies] = useState(JSON.parse(localStorage.getItem('films')) || [] );//состояние всех фильмов
  const [foundMovies, setFoundMovies] = useState(JSON.parse(localStorage.getItem('foundMovies')) || []);//состояние найденных фильмов
  const device = useDevice({ movies, isChecked, initialName });


// //Функция фильтрации фильмов 
    function handleSetFilteredMovies (movies, query, isChecked) {
   const moviesList = filterSearchShortMovies(movies, query, isChecked);
   setFoundMovies(moviesList);
   localStorage.setItem('foundMovies', JSON.stringify(moviesList));
   }

  // Обработчик отправки формы поиска
   const handleSearchSubmit=(initialName)=>{
    setIsLoading(true);
     setInitialName(initialName);
     localStorage.setItem ("name", initialName);
     localStorage.setItem("checkbox", JSON.stringify(isChecked));
     device.resetMore()
       if(!movies.length){
     moviesApi
     .getMovies()
     .then((dataMovies) => {
     setMovies(dataMovies);
     localStorage.setItem('films', JSON.stringify(dataMovies))
     handleSetFilteredMovies(dataMovies, initialName, isChecked)
   })
   .catch(() => errorMoviesPopupOpen())
   .finally(() => {
    setIsLoading(false);
      })}else{
     handleSetFilteredMovies(movies, initialName, isChecked);
     setIsLoading(false);
   }
    };

 //Обработчик чекбокса 
 const handleInputChecked = (isChecked, initialName) => { 
  localStorage.setItem("checkbox", JSON.stringify(isChecked));
  localStorage.setItem("name", initialName);
 if(!localStorage.getItem ('films')) { //если в базе нет фильмов, то делаем запрос на их получение
  setIsLoading(true);
    moviesApi
    .getMovies()
    .then((dataMovies) => {
    setMovies(dataMovies);//меняем стейт с фильмами
    localStorage.setItem('films', JSON.stringify(dataMovies));//сохраняю в локал все фильмы с базы
    const list = filterSearchShortMovies(dataMovies, initialName, isChecked);
    setFoundMovies(list);
    localStorage.setItem('foundMovies', JSON.stringify(list));
  })
    .catch(() => errorMoviesPopupOpen())
    .finally(() => {
 setIsLoading(false);
})
}else{
  localStorage.setItem("checkbox", JSON.stringify(isChecked));
  localStorage.setItem("name", initialName);
  setIsChecked(isChecked);
  const arr = filterSearchShortMovies(movies, initialName, isChecked);
  setFoundMovies(arr);
  localStorage.setItem('foundMovies', JSON.stringify(arr));
  setIsLoading(false);
}
setIsChecked(isChecked);
 };


  return (
    <>
      <Header isLoggedIn={currentUser.isLoggedIn} />
      <main className='movies'>
      <SearchForm
        onSubmit={handleSearchSubmit}
        isChecked={isChecked}
        onInputSearchError={onInputSearchError}
        initialName={initialName}
        handleInputChecked={handleInputChecked}
      />
      {onLoading ? <Preloader /> : ""}
      <MoviesCardList>
        <RepresentMovies
          movies={foundMovies}
          saveMovies={saveMovies}
          onLoading={onLoading}
          isChecked={isChecked}
          numberMovies={device.numberMovies}
          likeMovies={likeMovies}
          disLikeMovies={disLikeMovies}
        />
      </MoviesCardList>
      {device.isBtnMoreEnabled ? (
        <ButtonMoreMovies onClick={device.handleBtnMore} />
      ) : (
        ""
      )}
      </main>
      <Footer />
    </>
  );
}
export default Movies;

