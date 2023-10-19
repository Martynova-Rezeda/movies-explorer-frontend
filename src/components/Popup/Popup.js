import React from "react";
import { useEffect } from "react";
import "./Popup.css";

function Popup({ isOpen, onClose, children, name }) {
  useEffect(() => {
    if (!isOpen) return;

    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", closeByEscape);

    return () => document.removeEventListener("keydown", closeByEscape);
  }, [isOpen, onClose]);

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}
      onClick={handleOverlay}
    >
      <div className="popup__container">
        <button
          className="popup__button-close"
          type="button"
          onClick={onClose}
          aria-label="Закрыть"
        ></button>
        {children}
      </div>
    </div>
  );
}
export default Popup;
