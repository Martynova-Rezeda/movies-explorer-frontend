import React from "react";
import { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import "./SavedMovies.css";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import RepresentMovies from "../RepresentMovies/RepresentMovies";
import Footer from "../Footer/Footer";
import {filterSearchShortMovies} from "../../utils/filter";

function SavedMovies({ movies, onInputSearchError, onLoading, disLikeMovies }) {
  const currentUser = useContext(CurrentUserContext);
  const [isChecked, setIsChecked] = useState(false);
  const [foundMovies, setFoundMovies] = useState([]);
 


  const handleSaveSearchSubmit = (name='') => {
    setFoundMovies(filterSearchShortMovies(movies, name));
  };

  
  const handleInputCheckedToggle = (isChecked, query='') => {
    const arr = filterSearchShortMovies(movies, query, isChecked);
    setFoundMovies(arr);
    setIsChecked(isChecked)
   };


  useEffect(() => {
    setFoundMovies(movies);
  }, [movies]);

  return (
    <>
      <Header isLoggedIn={currentUser.isLoggedIn} />
      <main className='saved-movies'>
      <SearchForm
        handleSaveSearchSubmit={handleSaveSearchSubmit}
        isChecked={isChecked}
        onInputSearchError={onInputSearchError}
        handleInputCheckedToggle={handleInputCheckedToggle}
        savedMoviesPage={true}
      />
      {onLoading ? <Preloader /> : ""}
      <MoviesCardList>
        <RepresentMovies
          movies={foundMovies}
          onLoading={onLoading}
          isChecked={isChecked}
          disLikeMovies={disLikeMovies}
        />
      </MoviesCardList>
      </main>
      <Footer />
    </>
  );
}
export default SavedMovies;
