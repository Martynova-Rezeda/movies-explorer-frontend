import React from "react";
import logoPath from "../../images/logo.svg";
import "./Login.css";
import { useFormWithValidation } from "../../hooks/useForm";
import CompleteTitle from "../Complete/CompleteTitle/CompleteTitle";
import CompleteInput from "../Complete/CompleteInput/CompleteInput";
import CompleteButton from "../Complete/CompleteButton/CompleteButton";
import "../Complete/Complete.css";

const Login = ({ onLoginSubmit, onLoading, errorMessage }) => {
  const form = useFormWithValidation();

  const handleSubmit = (evt) => {
    evt.preventDefault();

    onLoginSubmit({
      email: form.values.email,
      password: form.values.password,
    });
  };

  return (
    <>
      <div className="complete">
        <div className="complete__header">
          <a href="/" className="link">
            <img src={logoPath} alt="Логотип сайта" className="logo" />
          </a>
        </div>
        <form className="complete__form" onSubmit={handleSubmit} noValidate>
          <CompleteTitle title={`Рады видеть!`} />
          <div className="complete__inputs">
            <CompleteInput
              name="email"
              id="email"
              nameText="E-mail"
              type="email"
              errors={form.errors}
              isDisabled={onLoading}
              onChange={form.handleChange}
              pattern="[\w\-\.]+@([\w\-]+\.)+[\w\-]{2,4}"
            />
            <CompleteInput
              name="password"
              nameText="Пароль"
              id="password"
              type="password"
              errors={form.errors}
              isDisabled={onLoading}
              onChange={form.handleChange}
            />
          </div>
          <CompleteButton
            textButton={onLoading ? "Идет авторизация..." : "Войти"}
            textPreLink="Ещё не зарегистрированы? "
            textLink=" Регистрация"
            isValid={form.isValid && !onLoading}
            textInfoSubmit={errorMessage}
            urlLinkSubmit="/signup"
          />
        </form>
      </div>
    </>
  );
};

export default Login;
