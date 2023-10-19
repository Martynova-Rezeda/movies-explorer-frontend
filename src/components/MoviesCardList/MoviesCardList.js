import React from "react";
import "./MoviesCardList.css";

function MoviesCardList({ children }) {
  return (
    <ul className="movies-list">
      {children}
    </ul>
  );
}
export default MoviesCardList;
