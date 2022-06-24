import { useEffect, useState } from "react";
import {
  Route,
  Switch,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import PopupWithForm from "./PopupWithForm/PopupWithForm";
import ImagePopup from "./ImagePopup/ImagePopup";
import { api } from "../utils/Api";
import {
  CurrentUserContext,
  currentUserDefault,
} from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup";
import Register from "./Register/Register";
import Login from "./Login/Login";
import InfoTooltip from "./InfoTooltip/InfoTooltip";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import * as Auth from "../utils/Auth.jsx";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [infoTooltip, setInfoTooltip] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState(currentUserDefault);
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [success, setSuccess] = useState(false);
  const [userData, setUserData] = useState(null);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    api
      .getProfile()
      .then((res) => {
        setCurrentUser(res);
        
      })
      .catch(console.log);
  }, [loggedIn]);

  useEffect(() => {
    api
      .getInitialCards()
      .then((res) => {
        setCards(res);
        console.log(res)
      })
      .catch(console.log);
  }, [loggedIn]);


  useEffect(() => {
    checkToken();
  }, [loggedIn]);


  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        closeAllPopups();
      }
    };
    document.addEventListener("keydown", closeByEscape);
    return () => document.removeEventListener("keydown", closeByEscape);
  }, []);


  const handleLogin = (email, password) => {
    return Auth.authorize(email, password).then((data) => {
      if (!data.token) {
        return;
      }
      localStorage.setItem("token", data.token);
      setLoggedIn(true);
    })
    .catch(() => {
      setSuccess(false);
      handleinfoTooltipClick();
    })
  };

  const handleRegister = (password, email) => {
    return Auth.register(password, email)
      .then(() => {
        history.push("/sign-in");
        setSuccess(true);
        handleinfoTooltipClick();
      })
      .catch(() => {
        setSuccess(false);
        handleinfoTooltipClick();
      });
  };

  const checkToken = () => {
    if (localStorage.getItem("token")) {
      let jwt = localStorage.getItem("token");

      Auth.getContent(jwt).then((res) => {
        if (res) {
          setUserData(res.email);
          setLoggedIn(true);
          history.push("/");
        }
      });
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    setUserData(null);
  };
 
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleinfoTooltipClick = () => {
    setInfoTooltip(true);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setInfoTooltip(false);
    setSelectedCard({});
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
   
  };

  const handleUpdateUser = (name, about) => {
    api
      .editProfile(name, about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(console.log);
  };

  const handleUpdateAvatar = (avatar) => {
    api
      .updateAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(console.log);
  };

  const handleAddPlaceSubmit = (data) => {
    api
      .addCard(data)
      .then((newCard) => {
        setCards([...cards, newCard]);
        closeAllPopups();
      })
      .catch(console.log);
  };

  const handleCardLike = (card) => {
   const isLiked = card.likes.some((i) => 
   { return i === currentUser._id});
    const request = isLiked ? api.deleteLike(card._id) : api.addLike(card._id);
    request
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch(console.log);
  };

  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch(console.log);
  };

  return (
    <div className="page">
      <Header email={userData} handleSignOut={handleSignOut} />
      <CurrentUserContext.Provider value={currentUser}>
        <Switch>
          <ProtectedRoute exact path="/" loggedIn={loggedIn}>
            <Main
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            ></Main>
          </ProtectedRoute>
          <Route path="/sign-in">
            <Login handleLogin={handleLogin} />
          </Route>
          <Route path="/sign-up">
            <Register handleRegister={handleRegister} />
          </Route>

          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>

        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <ImagePopup 
        card={selectedCard} 
        onClose={closeAllPopups} 
        />
        <PopupWithForm name="confirmation" title="Вы уверены?"></PopupWithForm>
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <InfoTooltip
          isOpen={infoTooltip}
          onClose={closeAllPopups}
          isSuccess={success}
        ></InfoTooltip>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
