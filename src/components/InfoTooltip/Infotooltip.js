import React from "react";
import Popup from "../Popup/Popup";

function InfoTooltip({ name, isError, message, isOpen, onClose }) {
  const classMessage = `popup__message ${
    isError ? " popup__message_type_error" : ""
  }`;

  return (
    <Popup name={name} isOpen={isOpen} onClose={onClose}>
      <div className="popup__info-container">
        <h3 className={classMessage}>{message}</h3>
      </div>
    </Popup>
  );
}
export default InfoTooltip;
