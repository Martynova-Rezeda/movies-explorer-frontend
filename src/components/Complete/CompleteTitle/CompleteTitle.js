import React from "react";
import "./CompleteTitle.css";

const CompleteTitle = ({ title, isProfile = false }) => {
  const classTitle = `complete__title ${
    isProfile ? "complete__title_type_profile" : ""
  }`;
  return <h1 className={classTitle}>{title}</h1>;
};

export default CompleteTitle;
