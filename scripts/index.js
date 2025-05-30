const editBtn = document.querySelector(".profile__info-edit-btn");
const closeBtn = document.querySelector(".popup__btn-close");
const popup = document.querySelector(".popup");
const addBtn = document.querySelector(".profile__info-add-btn");

const inputName = document.querySelector(".popup__form-name");
const inputDescription = document.querySelector(".popup__form-abtme");
const profileInfoName = document.querySelector(".profile__info-name");
const profileAbtMe = document.querySelector(".profile__info-description");

const editForm = document.querySelector(".popup__form");
const addForm = document.querySelector(".add-popup__form");
const addPopup = document.querySelector(".add-popup");
const addPopupCloseBtn = document.querySelector(".add-popup__btn-close");
import { enableValidation } from "./validate.js";

const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];

function createElement(card) {
  const elementsTemplate = document.querySelector("#elements-template").content;
  const elementsCard = elementsTemplate
    .querySelector(".elements__card")
    .cloneNode(true);
  const elementsCardPhoto = elementsCard.querySelector(".elements__card-photo");
  const elementsCardText = elementsCard.querySelector(
    ".elements__card-content-text"
  );
  const likeBtn = elementsCard.querySelector(".elements__card-like");
  const deleteBtn = elementsCard.querySelector(".elements__card-delete");

  deleteBtn.addEventListener("click", (evt) => {
    evt.target.closest(".elements__card").remove();
  });

  elementsCardPhoto.alt = card.name;
  elementsCardPhoto.src = card.link;
  elementsCardText.textContent = card.name;

  likeBtn.addEventListener("click", (evt) => {
    evt.target.classList.toggle("elements__card-like_active");
  });

  function cardPopup() {
    const cardPopup = document.querySelector(".bigimg-popup");
    const cardPopupImg = document.querySelector(".bigimg-popup__img");
    const cardPopupText = document.querySelector(".bigimg-popup__footer");

    cardPopupImg.src = elementsCardPhoto.src;
    cardPopupText.textContent = elementsCardText.textContent;
    cardPopupImg.alt = elementsCardText.textContent;

    cardPopup.classList.toggle("bigimg-popup_opened");
  }

  elementsCardPhoto.addEventListener("click", cardPopup);

  function closeCardPopup() {
    const cardPopup = document.querySelector(".bigimg-popup");
    if (cardPopup.classList.contains("bigimg-popup_opened")) {
      cardPopup.classList.toggle("bigimg-popup_opened");
    }
    return;
  }

  const cardPopupCloseBtn = document.querySelector(".bigimg-popup__btn-close");
  cardPopupCloseBtn.addEventListener("click", closeCardPopup);

  return elementsCard;
}

const element = document.querySelector(".elements__container");
initialCards.forEach(function (card, index) {
  const cardElements = createElement(card);
  if (index === 4) {
    cardElements
      .querySelector(".elements__card-content-text")
      .classList.add("elements__card-content-text_vanoise");
  }
  element.append(cardElements);
});

editBtn.addEventListener("click", () => {
  popup.classList.toggle("popup_opened");
});

function closePopup() {
  popup.classList.remove("popup_opened");
  addPopup.classList.remove("add-popup_opened");
}

closeBtn.addEventListener("click", closePopup);

inputName.value = profileInfoName.textContent;
inputDescription.value = profileAbtMe.textContent;

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileInfoName.textContent = inputName.value;
  profileAbtMe.textContent = inputDescription.value;
  closePopup();
}

editForm.addEventListener("submit", handleProfileFormSubmit);

function openAddPopup() {
  addPopup.classList.toggle("add-popup_opened");
}

addBtn.addEventListener("click", openAddPopup);

addPopupCloseBtn.addEventListener("click", closePopup);

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const addTitle = document.querySelector(".add-popup__form-title").value;
  const addImage = document.querySelector(".add-popup__form-img-url").value;

  const newCard = { name: addTitle, link: addImage };
  const cardElement = createElement(newCard);

  element.prepend(cardElement);
  closePopup();
}

addForm.addEventListener("submit", handleAddFormSubmit);
enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});
document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    closePopup();
  }
});
document.addEventListener("click", (evt) => {
  const popupClass = evt.target.classList;
  if (
    popupClass.contains("popup_opened") ||
    popupClass.contains("add-popup_opened")
  ) {
    closePopup();
  }
});
