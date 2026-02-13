import Section from "../components/Section.js";
import initialCards from "../utils/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Card from "../components/Card.js";
import UserInfo from "../components/UserInfo.js";
const popupImage = new PopupWithImage('.bigimg-popup');
popupImage.setEventListeners();
function handlerImageClick(name, link) {
  popupImage.open( {name, link} );
}
function renderer(item) {
  const card = new Card(item, "#elements-template", handlerImageClick);
  return card.generateCard();

}
const section = new Section({items: initialCards, renderer: renderer},".elements__container");
section.renderItems();
const handleAddFormSubmit = (data) => {
  console.log("DATA RECIBIDA:", data);

  const normalizedData = {
    name: data.title,
    link: data.image
  };

  const cardElement = renderer(normalizedData);
  section.addItem(cardElement);
};
const addCardPopup = new PopupWithForm('.add-popup', handleAddFormSubmit);
const openAddCardBtn = document.querySelector('.profile__info-add-btn');
openAddCardBtn.addEventListener('click', () => {
  addCardPopup.open();
});
addCardPopup.setEventListeners();
const userInfo = new UserInfo({
  nameSelector: '.profile__info-name',
  aboutSelector: '.profile__info-description'
});
const handleProfileFormSubmit = (data) => {
  userInfo.setUserInfo({
    name: data.name,
    about: data.about
  });
}
const editProfilePopup = new PopupWithForm('.popup-edit-profile',handleProfileFormSubmit);
const openEditProfileBtn = document.querySelector('.profile__info-edit-btn');
openEditProfileBtn.addEventListener('click', () => {
  const currentUserInfo = userInfo.getUserInfo();
  editProfilePopup.getInputValues({
    name: currentUserInfo.name,
    about: currentUserInfo.about
  });
  editProfilePopup.open();
});
editProfilePopup.setEventListeners();







/*
// import FormValidator from "../components/FormValidator.js";

// import { initApp } from "./utils.js";

//

// initialCards.forEach(({ name, link }) => {
//   const container = document.querySelector(".elements__container");
//   const card = new Card(name, link, "#elements-template");
//   const cardElements = card.generateCard();
//   container.append(cardElements);
// });

// const validation = new FormValidator({
//   formSelector: ".popup__form",
//   inputSelector: ".popup__input",
//   submitButtonSelector: ".popup__button",
//   inactiveButtonClass: "popup__button_disabled",
//   inputErrorClass: "popup__input_type_error",
//   errorClass: "popup__error_visible",
// });
// validation.enableValidation();
// initApp();
 */