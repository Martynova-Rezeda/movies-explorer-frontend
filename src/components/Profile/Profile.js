import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  return (
    <main>
      <section className="profile">
        <div className="profile__container">
          <h1 className="profile__header">Привет, Виталий!</h1>
          <form className="profile__form">
            <input
              className="profile__field"
              required
              minLength={2}
              maxLength={30}
              id="name"
              name="name"
              type="text"
              placeholder="Имя"
              value={formValue.name}
              onChange={handleChange}
            />
            <input
              className="profile__field"
              id="email"
              name="email"
              type="email"
              placeholder="E-mail"
              onChange={handleChange}
              value={formValue.email}
            />
            <button type="submit" className="button profile__button">
              Редактировать
            </button>
          </form>
          <Link to="/" className="link profile__logout-link">
            Выйти из аккаунта
          </Link>
        </div>
      </section>
    </main>
  );
};
export default Profile;
