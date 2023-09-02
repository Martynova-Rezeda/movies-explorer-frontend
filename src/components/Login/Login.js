import React from "react";
import logoPath from "../../images/logo.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [formValue, setFormValue] = useState({
    password: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  return (
    <>
      <div className="login">
        <a href="/" className="link">
          <img src={logoPath} alt="Логотип сайта" className="register__logo" />
        </a>
        <form className="login__form">
          <h1 className="login__header">Рады видеть!</h1>
          <label htmlFor="email" className="login__label">
            E-mail
          </label>
          <input
            className="login__field"
            id="email"
            name="email"
            type="email"
            placeholder="Введите электронную почту"
            onChange={handleChange}
            value={formValue.email}
          />
          <label htmlFor="password" className="login__label">
            Пароль
          </label>
          <input
            className="login__field"
            id="password"
            name="password"
            type="password"
            placeholder="Введите пароль"
            onChange={handleChange}
            value={formValue.password}
          />
          <button type="submit" className="button login__button">
            Войти
          </button>
        </form>
        <div className="login__signin">
          <p className="login__signin-title">
            Еще не зарегистрированы?
            <Link to="/sign-up" className="link login__link">
              Регистрация
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};
export default Login;
