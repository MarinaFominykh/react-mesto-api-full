import {useContext} from 'react';
import {CurrentUserContext, currentUserDefault} from '../../contexts/CurrentUserContext';
function Card ({card, onCardClick, onCardLike, onCardDelete}) {
    const currentUser = useContext(CurrentUserContext);
    const isOwn = card.owner === currentUser._id;
    const cardDeleteButtonClassName = (`places__delete-button ${isOwn ? 'places__delete-button' : 'places__delete-button_hidden'}`
); 
const isLiked = card.likes.some((item) => item === currentUser._id);
    const cardLikeButtonClassName = (`places__like ${isLiked ? 'places__like_activ' : 'places__like'}`); 
    
function handleClick() {
        onCardClick(card);
       
    }

function handleLikeClick() {
        onCardLike(card);
             
    }

function handleCardDelete() {
        onCardDelete(card);
    }
    
return (
    <li className="places__card">
    <button className={cardDeleteButtonClassName}type="button" onClick={handleCardDelete}>
        <div className="places__delete-cup"></div>
        <div className="places__delete-basket"></div>
    </button>
    
    <img src={card.link} alt={card.name} className="places__image" onClick={handleClick}/>
    <div className="places__name-container">
        <h2 className="places__name">{card.name}</h2>
        <div className="places__like-container">
            <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
            <span className="places__like-count">{card.likes.length}</span>
        </div>
    </div>
</li>
)
}

export default Card;
