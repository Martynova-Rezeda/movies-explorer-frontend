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

function SavedMovies({ movies, onInputSearchError, isLoading, disLikeMovies }) {
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
      <SearchForm
        onSubmit={handleSearchSubmit}
        isChecked={isChecked}
        onInputSearchError={onInputSearchError}
        handleInputChecked={handleInputChecked}
      />
      {isLoading ? <Preloader /> : ""}
      <MoviesCardList>
        <RepresentMovies
          movies={foundMovies}
          isLoading={isLoading}
          isChecked={isChecked}
          dislikeMovies={disLikeMovies}
        />
      </MoviesCardList>
      <Footer />
    </>
  );
}
export default SavedMovies;
