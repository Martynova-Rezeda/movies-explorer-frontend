import { useState } from "react";
import { Link } from "react-router-dom";
import logoPath from "../../images/logo.png";
import "./Register.css";

const Register = () => {
  const [formValue, setFormValue] = useState({
    name: "",
    password: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  return (
    <>
      <div className="register">
        <a href="/" className="link">
          <img src={logoPath} alt="Логотип сайта" className="register__logo" />
        </a>
        <form className="register__form">
          <h1 className="register__header">Добро пожаловать!</h1>
          <label htmlFor="name" className="register__label">
            Имя
          </label>
          <input
            className="register__field"
            required
            minLength={2}
            maxLength={30}
            id="name"
            name="name"
            type="text"
            placeholder="Введите имя"
            value={formValue.name}
            onChange={handleChange}
          />
          <label htmlFor="email" className="register__label">
            E-mail
          </label>
          <input
            className="register__field"
            required
            id="email"
            name="email"
            type="email"
            placeholder=" Введите электронную почту"
            value={formValue.email}
            onChange={handleChange}
          />
          <label htmlFor="password" className="register__label">
            Пароль
          </label>
          <input
            className="register__field"
            required
            id="password"
            name="password"
            type="password"
            placeholder="Введите пароль"
            value={formValue.password}
            onChange={handleChange}
          />
          <button type="submit" className="button register__button">
            Зарегистрироваться
          </button>
        </form>
        <div className="register__signin">
          <p className="register__signin-title">
            Уже зарегистрированы?
            <Link to="/sign-in" className="link register__link">
              Войти
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
