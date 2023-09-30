import logoPath from "../../images/logo.svg";
import { useFormWithValidation } from "../../hooks/useForm";
import { REGEX_EMAIL } from "../../utils/constants";
import CompleteTitle from "../Complete/CompleteTitle/CompleteTitle";
import CompleteInput from "../Complete/CompleteInput/CompleteInput";
import CompleteButton from "../Complete/CompleteButton/CompleteButton";
import "../Complete/Complete.css";

const Register = ({ onRegistationSubmit, onLoading, errorMessage }) => {
  const form = useFormWithValidation();

  const handleSubmit = (evt) => {
    evt.preventDefault();

    onRegistationSubmit({
      name: form.values.name,
      email: form.values.email,
      password: form.values.password,
    });
  };

  return (
    <>
      <div className="complete">
        <div className="complete__header">
          <a href="/" className="link">
            <img
              src={logoPath}
              alt="Логотип сайта"
              className="logo logo__complete"
            />
          </a>
        </div>
        <form className="complete__form" onSubmit={handleSubmit} noValidate>
          <CompleteTitle title={`Добро пожаловать!`} />
          <div className="complete__inputs">
            <CompleteInput
              name="name"
              nameText="Имя"
              id="name"
              type="text"
              minLength="2"
              maxLength="30"
              onChange={form.handleChange}
              errors={form.errors}
              isDisabled={onLoading}
            />
            <CompleteInput
              name="email"
              id="email"
              nameText="E-mail"
              type="email"
              pattern={REGEX_EMAIL}
              errors={form.errors}
              isDisabled={onLoading}
              onChange={form.handleChange}
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
            textButton={
              onLoading ? "Идет регистрация..." : "Зарегистрироваться"
            }
            textPreLink="Уже зарегистрированы? "
            textLink="Войти"
            isValid={form.isValid && !onLoading}
            textInfoSubmit={errorMessage}
            urlLinkSubmit="/signin"
            isRegister={true}
          />
        </form>
      </div>
    </>
  );
};

export default Register;
