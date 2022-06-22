import { useEffect, useRef } from 'react';
function ImagePopup ({card, onClose}) {
    const popupLink = useRef();
   
    return (
        <section className={`popup ${card.link && 'popup_opened'} popup_type_activ-image`} ref={popupLink}>
            <figure className="popup__image">
                <button type="button" className="popup__close popup__close_type_image" onClick={onClose}/>
                <img src={card.link} alt={card.name} className="popup__image-activ"/>
                <figcaption className="popup__image-text">{card.name}</figcaption>
         </figure>
      </section>
    )
}

export default ImagePopup;
