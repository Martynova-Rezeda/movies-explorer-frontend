import React from "react";
import { useState, useContext } from "react";
import { useEffect } from "react";
import { filterMovies } from "../../utils/filter";
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

function Movies({
  movies,
  saveMovies,
  onInputSearchError,
  onLoading,
  likeMovies,
  disLikeMovies,
}) {
  const currentUser = useContext(CurrentUserContext);
  const [isChecked, setIsChecked] = useState(false);
  const [initialName, setInitialName] = useState("");
  const [foundMovies, setFoundMovies] = useState([]);
  const device = useDevice({ movies, isChecked, initialName });

  const initialCheckbox = () => {
    return (localStorage.getItem("checkbox") || "") === "true";
  };

  const initialNameValue = () => {
    return localStorage.getItem("name") || " ";
  };

  const handleSearchSubmit = (name) => {
    setInitialName(name);
  };

  useEffect(() => {
    setFoundMovies(filterMovies(movies, initialName));
  }, [movies, initialName]);

  useEffect(() => {
    setIsChecked(initialCheckbox());
    setInitialName(initialNameValue());
  }, []);

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
        initialName={initialNameValue()}
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
