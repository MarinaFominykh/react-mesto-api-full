function PopupWithForm(props) {
  return (
    <section className={`popup ${props.isOpen && "popup_opened"}`}>
      <form
        className="popup__container"
        name={props.name}
        onSubmit={props.onSubmit}
      >
        <button
          type="button"
          className="popup__close"
          onClick={props.onClose}
        />
        <h2 className="popup__title">{props.title}</h2>
        <fieldset className="popup__contact-info">{props.children}</fieldset>
        <button type="submit" className="popup__save" value="сохранить">
          {props.button}
        </button>
      </form>
    </section>
  );
}
export default PopupWithForm;
