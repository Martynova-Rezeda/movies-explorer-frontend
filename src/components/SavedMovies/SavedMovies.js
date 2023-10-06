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
import { filterMovies } from "../../utils/filter";

function SavedMovies({ movies, onInputSearchError, onLoading, disLikeMovies }) {
  const currentUser = useContext(CurrentUserContext);
  const [isChecked, setIsChecked] = useState(false);
  const [foundMovies, setFoundMovies] = useState([]);

  const handleSearchSubmit = (name) => {
    setFoundMovies(filterMovies(movies, name));
  };

  const handleInputChecked = (evt) => {
    setIsChecked(evt.target.checked);
  };

  useEffect(() => {
    setFoundMovies(movies);
  }, [movies]);

  return (
    <>
      <Header isLoggedIn={currentUser.isLoggedIn} />
      <main className='saved-movies'>
      <SearchForm
        onSubmit={handleSearchSubmit}
        isChecked={isChecked}
        onInputSearchError={onInputSearchError}
        handleInputChecked={handleInputChecked}
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
