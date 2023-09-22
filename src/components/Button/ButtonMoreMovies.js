import React from "react";
import "./ButtonMoreMovies.css";

function ButtonMoreMovies({ onClick }) {
  return (
    <button
      type="submit"
      onClick={onClick}
      className="link movies-list__elements-more"
    >
      Еще
    </button>
  );
}
export default ButtonMoreMovies;
