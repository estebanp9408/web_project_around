const editBtn = document.querySelector(".profile__info-edit-btn");
const closeBtn = document.querySelector(".popup__btn-close");
const popUp = document.querySelector(".popup");
const addBtn = document.querySelector(".profile__info-add-btn");

const inputName = document.querySelector(".popup__form-name");
const inputDescription = document.querySelector(".popup__form-abtme");
const profileInfoName = document.querySelector(".profile__info-name");
const ProfileAbtme = document.querySelector(".profile__info-description");

const editForm = document.querySelector(".popup__form");
const addForm = document.querySelector(".add-popup__form");
const addPopUp = document.querySelector(".add-popup");
const addPopUpClsBtn = document.querySelector(".add-popup__btn-close");

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
function createELement(card) {
  const elementsTemplate = document.querySelector("#elements-template").content;
  const elementsCard = elementsTemplate
    .querySelector(".elements__card")
    .cloneNode(true);
  const elementsCardPhoto = elementsCard.querySelector(".elements__card-photo");
  const elementsCardText = elementsCard.querySelector(
    ".elements__card-content-text"
  );
  const likebtn = elementsCard.querySelector(".elements__card-like");
  const deleteBtn = elementsCard.querySelector(".elements__card-delete");
  deleteBtn.addEventListener("click", (evt) => {
    evt.target.closest(".elements__card").remove();
  });
  elementsCardPhoto.alt = card.name;
  elementsCardPhoto.src = card.link;
  elementsCardText.textContent = card.name;
  likebtn.addEventListener("click", (evt) => {
    evt.target.classList.toggle("elements__card-like_active");
  });
  function cardpopup() {
    const cardPopUp = document.querySelector(".bigimg-popup");
    const cardPopUpImg = document.querySelector(".bigimg-popup__img");
    const cardPopUpText = document.querySelector(".bigimg-popup__footer");
    cardPopUpImg.src = elementsCardPhoto.src;
    cardPopUpText.textContent = elementsCardText.textContent;
    console.log("hello");

    if (cardPopUp.classList.contains("bigimg-popup")) {
      cardPopUp.classList.toggle("bigimg-popup_opened");
    }
  }

  elementsCardPhoto.addEventListener("click", cardpopup);
  function closeCardPopUp() {
    const cardPopUp = document.querySelector(".bigimg-popup");
    if (cardPopUp.classList.contains("bigimg-popup_opened")) {
      cardPopUp.classList.toggle("bigimg-popup_opened");
    }
    return;
  }
  const cardPopUpCloseBtn = document.querySelector(".bigimg-popup__btn-close");

  cardPopUpCloseBtn.addEventListener("click", closeCardPopUp);

  return elementsCard;
}

const element = document.querySelector(".elements__container");
initialCards.forEach(function (card, index) {
  const CardElements = createELement(card);
  if (index === 4) {
    const elementsCardText = CardElements.querySelector(
      ".elements__card-content-text"
    );
    elementsCardText.classList.add("elements__card-content-text_vanoise");
  }

  element.append(CardElements);
});

editBtn.addEventListener("click", (openPopup) => {
  if (popUp.classList.contains("popup")) popUp.classList.toggle("popup_opened");
});
function closePopup() {
  if (popUp.classList.contains("popup_opened")) {
    popUp.classList.toggle("popup_opened");
  }
}
closeBtn.addEventListener("click", closePopup);

inputName.value = profileInfoName.textContent;
inputDescription.value = ProfileAbtme.textContent;
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileInfoName.textContent = inputName.value;
  ProfileAbtme.textContent = inputDescription.value;
  closePopup();
}

editForm.addEventListener("submit", handleProfileFormSubmit);

function addpopUp() {
  if (addPopUp.classList.contains("add-popup")) {
    addPopUp.classList.toggle("add-popup_opened");
  }
  handleAddFormSubmit();
}
addBtn.addEventListener("click", addpopUp);
function closeAddPopup() {
  if (addPopUp.classList.contains("add-popup_opened")) {
    addPopUp.classList.toggle("add-popup_opened");
  }
}

addPopUpClsBtn.addEventListener("click", closeAddPopup);
function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const addTitle = document.querySelector(".add-popup__form-title");
  const addImage = document.querySelector(".add-popup__form-img-url");
  const newCard = {
    name: addTitle.value,
    link: addImage.value,
  };
  const cardElement = createELement(newCard);
  element.prepend(cardElement);
  closeAddPopup();
}

addForm.addEventListener("submit", handleAddFormSubmit);
