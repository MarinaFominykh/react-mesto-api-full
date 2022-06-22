import React from "react";
import { useRef } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const linkInput = useRef("");

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(linkInput.current.value);
  }

  return (
    <PopupWithForm
      name="update-avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      button="Сохранить"
      onSubmit={handleSubmit}
    >
      <input
        id="link-update-avatar"
        type="url"
        name="link"
        className="popup__input popup__input_type_link"
        placeholder="Ссылка на аватар"
        required
        ref={linkInput}
      />
      <span
        id="error-link-update-avatar"
        className="popup__error popup__error_active"
      ></span>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
