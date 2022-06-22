const editPopup = document.querySelector('.popup_type_edit');
const addCardPopup = document.querySelector('.popup_type_add-card');

const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const editForm = editPopup.querySelector('.popup__container');
const addCardForm = addCardPopup.querySelector('.popup__container');




const inputName = document.querySelector('.popup__input_type_name');
const inputJob = document.querySelector('.popup__input_type_job');
const inputTitle = document.querySelector('.popup__input_type_title');
const inputLink = document.querySelector('.popup__input_type_link');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const list = document.querySelector('.places__cards');
const cardTemplateSelector = '.card-template';
const cardListSection = '.places__cards';
const addCardFormPopupSelector = '.popup_type_add-card';
const editFormPopupSelector = '.popup_type_edit';
const imageFormPopupSelector = '.popup_type_activ-image';


const config = {
    formSelector: '.popup__container',
    inputSelector: '.popup__input',
    buttonSelector: '.popup__save',
    inputErrorClass: 'popup__input_type_error',
    errorActiveClass: 'popup__error_active',
    errorSelector: '.popup__error',
    inactiveButtonClass: 'popup__save_disabled'
};

export {
    editProfileButton,
    addCardButton,
    editForm,
    addCardForm,
    inputName,
    inputJob,
    inputTitle,
    inputLink,
    profileName,
    profileJob,
    list,
    cardTemplateSelector,
    config,
    cardListSection,
    addCardFormPopupSelector,
    editFormPopupSelector,
    imageFormPopupSelector,

    // Новое
    confirmationForm,
    confirmationFormPopupSelector,
    confirmationPopup,
    updateAvatarPopup,
    updateAvatarForm,
    updateAvatarFormSelector,
    updateAvatarButton,
    yesButton
}

// Новые попапы:
const confirmationPopup = document.querySelector('.popup_type_confirmation');
const confirmationForm = confirmationPopup.querySelector('.popup__container');
const confirmationFormPopupSelector = '.popup_type_confirmation';
const updateAvatarPopup = document.querySelector('.popup_type_update-avatar');
const updateAvatarForm = updateAvatarPopup.querySelector('.popup__container');
const updateAvatarFormSelector = '.popup_type_update-avatar';
const updateAvatarButton = document.querySelector('.profile__hover-pen');
const yesButton = confirmationPopup.querySelector('.popup__save');