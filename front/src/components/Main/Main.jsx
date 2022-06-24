import { useContext } from "react";
import editProfileButton from "../../images/vector.svg";
import Card from "../Card/Card";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div onClick={onEditAvatar} className="profile__hover-container">
          <div className="profile__hover-pen"></div>
          <img
            src={currentUser.avatar}
            alt="Аватар"
            className="profile__avatar"
          />
        </div>
        <div className="profile__name-container">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button
            onClick={onEditProfile}
            className="profile__edit-button"
            type="button"
          >
            <img
              src={editProfileButton}
              alt="Редактировать"
              className="profile__edit-image"
            />
          </button>
        </div>
        <p className="profile__subtitle">{currentUser.about}</p>
        <button
          onClick={onAddPlace}
          className="profile__add-button"
          type="button"
        ></button>
      </section>

      <section className="places">
        <ul className="places__cards">
        {cards.map((item) => {
          return  (
            <Card
              {...item}
              key={item._id}
              card={item}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          )
        }
       ).reverse()}
        </ul>
      </section>
    </main>
  );
}

export default Main;
