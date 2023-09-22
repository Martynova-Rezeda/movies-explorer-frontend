import React from "react";
import "./MoviesCardList.css";

function MoviesCardList({ children }) {
  return (
    <section className="movies-list">
      <div className="movies-list__elements">{children}</div>
    </section>
  );
}
export default MoviesCardList;
