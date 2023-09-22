import React from "react";
import logoPath from "../../images/logo.svg";
import "./Login.css";
import { useFormWithValidation } from "../../hooks/useForm";
import { REGEX_EMAIL } from "../../utils/constants";
import CompleteTitle from "../Complete/CompleteTitle/CompleteTitle";
import CompleteInput from "../Complete/CompleteInput/CompleteInput";
import CompleteButton from "../Complete/CompleteButton/CompleteButton";
import "../Complete/Complete.css";

const Login = ({ onLoginSubmit, isLoading, errorSubmitApi }) => {
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
              pattern={REGEX_EMAIL}
              errors={form.errors}
              isDisabled={isLoading}
              onChange={form.handleChange}
            />
            <CompleteInput
              name="password"
              nameText="Пароль"
              id="password"
              type="password"
              errors={form.errors}
              isDisabled={isLoading}
              onChange={form.handleChange}
            />
          </div>
          <CompleteButton
            textButton={`${isLoading ? "Идет авторизация..." : "Войти"}`}
            textPreLink="Ещё не зарегистрированы?"
            textLink="Регистрация"
            isValid={form.isValid && !isLoading}
            textInfoSubmit={errorSubmitApi}
            urlLinkSubmit="/signup"
          />
        </form>
      </div>
    </>
  );
};

export default Login;
