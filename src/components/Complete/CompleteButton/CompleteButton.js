import React from "react";
import "./CompleteButton.css";
import { Link } from "react-router-dom";

const CompleteButton = ({
  textButton,
  textPreLink,
  textLink,
  isProfile = false,
  isValid,
  textInfoSubmit,
  urlLinkSubmit,
  onSignOut,
}) => {
  console.log({ textInfoSubmit });
  const classContainer = `complete__button-container ${
    isProfile ? "complete__button-container_type_profile" : ""
  }`;
  const classButton = `link complete__button-submit ${
    isProfile ? " complete__button-submit_type_profile" : ""
  }`;
  const classText = `complete__text ${
    isProfile ? " complete__text_type_profile" : ""
  }`;
  const classLink = `link complete__link ${
    isProfile ? "complete__link_type_profile" : ""
  }`;
  const linkTextUrl = isProfile ? (
    <a onClick={onSignOut} className={classLink}>
      {textLink}
    </a>
  ) : (
    <Link to={urlLinkSubmit} className={classLink}>
      {textLink}
    </Link>
  );

  return (
    <div className={classContainer}>
      <span className="complete__button-error">{textInfoSubmit}</span>
      <button className={classButton} disabled={!isValid} type="submit">
        {textButton}
      </button>
      <p className={classText}>
        {textPreLink}
        {linkTextUrl}
      </p>
    </div>
  );
};

export default CompleteButton;
