import React from "react";
import { useState, useEffect, useContext } from "react";
import "./Profile.css";
import "../Complete/Complete.css";
import { useFormWithValidation } from "../../hooks/useForm";
import { REGEX_EMAIL } from "../../utils/constants";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import Header from "../Header/Header";
import CompleteTitle from "../Complete/CompleteTitle/CompleteTitle";
import CompleteInput from "../Complete/CompleteInput/CompleteInput";
import CompleteButton from "../Complete/CompleteButton/CompleteButton";

const Profile = ({
  onLoading,
  onSignOut,
  onUpdateUserProfile,
  errorMessage,
}) => {
  const form = useFormWithValidation();
  const [isValid, setIsValid] = useState(false);
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    form.resetForm(currentUser);
  }, [currentUser]);

  useEffect(() => {
    const isDisabled =
      form.values.name === currentUser.name &&
      form.values.email === currentUser.email;
    setIsValid(form.isValid && !isDisabled && !onLoading);
  }, [form.values, onLoading]);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    onUpdateUserProfile({
      email: form.values.email,
      name: form.values.name,
    });
  };

  return (
    <>
      <Header isLoggedIn={currentUser.isLoggedIn} />
      <main className="complete">
        <form className="complete__form" onSubmit={handleSubmit} noValidate>
          <CompleteTitle
            title={`Привет, ${currentUser.name}!`}
            isProfile={true}
          />
          <div className="complete__inputs complete__inputs_type_profile">
            <CompleteInput
              nameText="Имя"
              minLength={2}
              maxLength={30}
              id="name"
              name="name"
              type="text"
              value={currentUser.name}
              errors={form.errors}
              onChange={form.handleChange}
              isDisabled={onLoading}
              isProfile={true}
            />
            <CompleteInput
              nameText="E-mail"
              id="email"
              name="email"
              type="email"
              onChange={form.handleChange}
              value={currentUser.email}
              isDisabled={onLoading}
              pattern={REGEX_EMAIL}
              errors={form.errors}
              isProfile={true}
            />
          </div>
          <CompleteButton
            textButton={onLoading ? "Сохранение..." : "Редактировать"}
            textPreLink=""
            textLink="Выйти из аккаунта"
            isProfile={true}
            onSignOut={onSignOut}
            textInfoSubmit={errorMessage}
            isValid={isValid}
            urlLinkSubmit="/signin"
          />
        </form>
      </main>
    </>
  );
};
export default Profile;
