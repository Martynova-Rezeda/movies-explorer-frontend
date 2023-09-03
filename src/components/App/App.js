import React from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import { Routes, Route } from "react-router-dom";
import PageNotFound from "../PageNotFound/PageNotFound";
import "./App.css";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Movies from "../Movies/Movies";
import Profile from "../Profile/Profile";
import SavedMovies from "../SavedMovies/SavedMovies";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header auth={false} />
              <Main />
              <Footer />
            </>
          }
        />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/sign-up" element={<Register />} />
        <Route path="/sign-in" element={<Login />} />
        <Route
          path="/profile"
          element={
            <>
              <Header auth={true} />
              <Profile />
            </>
          }
        />
        <Route
          path="/saved-movies"
          element={
            <>
              <Header auth={true} />
              <SavedMovies />
              <Footer />
            </>
          }
        />

        <Route
          path="/movies"
          element={
            <>
              <Header auth={true} />
              <Movies />
              <Footer />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
