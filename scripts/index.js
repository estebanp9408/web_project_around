import Section from "../components/section.js";
import initialCards from "../utils/constants.js";
import PopupWithImage from "../components/Popupwithimage.js";
import PopupWithForm from "../components/popupWithForm.js";
import Card from "../components/Card.js";
const popupImage = new PopupWithImage('.bigimg-popup');
const editProfilePopup = new PopupWithForm('.popup-edit-profile', () => {});
const addCardPopup = new PopupWithForm('.add-popup', () => {});

const profileEditButton = document.querySelector('.profile__info-edit-btn');
const profileAddButton = document.querySelector('.profile__info-add-btn');

profileEditButton.addEventListener('click', () => {
  editProfilePopup.open();
});

profileAddButton.addEventListener('click', () => {
  addCardPopup.open();
});

function renderer(item) {
  const card = new Card(item, "#elements-template", () => popupImage.open(item)
  );
  return card.generateCard();

}
const section = new Section({items: initialCards, renderer: renderer},".elements__container");
section.renderItems();



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
