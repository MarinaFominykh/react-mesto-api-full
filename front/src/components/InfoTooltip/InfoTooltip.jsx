function InfoTooltip(props) {
  return (
    <section className={`popup popup_type_tooltip ${props.isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <button onClick={props.onClose} type="button" className="popup__close" />
        <div className={props.isSuccess ?  "popup__tooltip-image popup__tooltip-image_success" : "popup__tooltip-image popup__tooltip-image_unsuccess"}></div>
        <p className="popup__tooltip-text popup__tooltip-text_success">
          {props.isSuccess ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}
          
        </p>
      </div>
    </section>
  );
}
export default InfoTooltip;
