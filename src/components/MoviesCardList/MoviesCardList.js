import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ icon }) {
  return (
    <section className="movies-list">
      <div className="movies-list__elements">
        <MoviesCard icon={icon} />
      </div>
      <button type="submit" className="link movies-list__elements-more">
        Еще
      </button>
    </section>
  );
}
export default MoviesCardList;
