import React from "react";
import { useState, useContext, useEffect } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = useContext(CurrentUserContext);
  
  function handleInputNameChange(e) {
    setName(e.target.value);
  }

  function handleInputJobChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(name, description);
  }
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      button="Сохранить"
      onSubmit={handleSubmit}
    >
      <input
        id="name"
        type="text"
        name="name"
        className="popup__input popup__input_type_name"
        required
        minLength="2"
        maxLength="40"
        placeholder="Имя"
        value={name}
        onChange={handleInputNameChange}
      />
      <span id="error-name" className="popup__error popup__error_active"></span>
      <input
        id="job"
        type="text"
        name="job"
        className="popup__input popup__input_type_job"
        required
        minLength="2"
        maxLength="200"
        placeholder="Занятие"
        value={description}
        onChange={handleInputJobChange}
      />
      <span id="error-job" className="popup__error popup__error_active"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
