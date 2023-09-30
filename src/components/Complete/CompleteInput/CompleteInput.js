import React from "react";
import "./CompleteInput.css";
const CompleteInput = ({
  name,
  nameText,
  id,
  type,
  minLength,
  maxLength,
  pattern,
  value = "",
  onChange,
  errors,
  isDisabled = false,
  isProfile = false,
}) => {
  const classContainer = `complete__input-container ${
    isProfile ? " complete__input-container_type_profile" : ""
  }`;

  const classLabel = `complete__label ${
    isProfile ? " complete__label_type_profile" : ""
  }`;

  const classInput = `complete__input ${
    isProfile ? " complete__input_type_profile" : ""
  } ${errors[name] ? "complete__input_type_error" : ""}`;

  const classInputError = `complete__input-error ${
    isProfile ? "complete__input-error_type_profile" : ""
  }`;
  return (
    <div className={classContainer}>
      <label className={classLabel} htmlFor={`complete-${id}`}>
        {nameText}
      </label>
      <input
        className={classInput}
        name={name}
        id={`complete-${id}`}
        placeholder={nameText}
        type={type}
        minLength={minLength}
        maxLength={maxLength}
        pattern={pattern}
        onChange={onChange}
        defaultValue={value}
        disabled={isDisabled}
        required
        autocomplete="off"
      />
      <span className={classInputError}>{errors[name]}</span>
    </div>
  );
};

export default CompleteInput;
