import React from "react";
import { useState,  useContext } from "react";
import { filterMovies, shortFilterMovies } from "../../utils/filter";
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
  const [initialName, setInitialName] = useState(localStorage.getItem("name") || " "); //состояние строки поиска

  //const foundMovies1 = localStorage.getItem('foundMovies');
   //console.log(JSON.parse(foundMovies1) || []);
  const [movies, setMovies] = useState(JSON.parse(localStorage.getItem('films')) || [] );//состояние всех фильмов
  const [foundMovies, setFoundMovies] = useState(JSON.parse(localStorage.getItem('foundMovies')) || []);//состояние найденных фильмов
  const device = useDevice({ movies, isChecked, initialName });
  


//Функция фильтрации фильмов 
  function handleSetFilteredMovies (movies, query, isChecked) {
  const moviesList=filterMovies(movies, query);
  setFoundMovies(isChecked ? shortFilterMovies(moviesList) : moviesList);
  localStorage.setItem('foundMovies', JSON.stringify(moviesList));
  }


  //Обработчик отправки формы
  const handleSearchSubmit=(initialName)=>{
  setIsLoading(true);
  setInitialName(initialName);
  localStorage.setItem ("name", initialName);
  localStorage.setItem("checkbox", JSON.stringify(isChecked));
  if(!movies.length){
  moviesApi
  .getMovies()
  .then((dataMovies) => {
  setMovies(dataMovies);
  console.log(dataMovies);
  localStorage.setItem('films', JSON.stringify(dataMovies))
  console.log(localStorage.setItem('films', JSON.stringify(dataMovies)));
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
 const handleInputChecked = (evt) => {
  setIsChecked(evt.target.checked);
  localStorage.setItem("checkbox", evt.target.checked);
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

