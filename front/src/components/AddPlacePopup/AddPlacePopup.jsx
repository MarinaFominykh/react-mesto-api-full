import { useState, useRef } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = useState("");
  const [link, setlink] = useState("");

  function handleNameInputChange(e) {
    setName(e.target.value);
  }

  function handlelinkInputChange(e) {
    setlink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({name: name, link: link});
  }
  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      button="Создать"
      onSubmit={handleSubmit}
    >
      <input
        id="title"
        type="text"
        name="name"
        className="popup__input popup__input_type_title"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        value={name}
        onChange={handleNameInputChange}
      />
      <span
        id="error-title"
        className="popup__error popup__error_active"
      ></span>
      <input
        id="link-add-card"
        type="url"
        name="link"
        className="popup__input popup__input_type_link"
        placeholder="Ссылка на картинку"
        required
        onChange={handlelinkInputChange}
        value={link}
      />
      <span
        id="error-link-add-card"
        className="popup__error popup__error_active"
      ></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
