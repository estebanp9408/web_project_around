import Card from "../components/Card.js";



export function handleProfileFormSubmit(data) {
  const inputName = document.querySelector(".popup__form-name");
  const inputDescription = document.querySelector(".popup__form-abtme");
  const profileInfoName = document.querySelector(".profile__info-name");
  const profileAbtMe = document.querySelector(".profile__info-description");
  profileInfoName.textContent = inputName.value;
  profileAbtMe.textContent = inputDescription.value;
  closePopup();
}


export function handleAddFormSubmit(data) {

  const addForm = document.querySelector(".add-popup__form");
  const addTitle = document.querySelector(".add-popup__form-title").value;
  const addImage = document.querySelector(".add-popup__form-img-url").value;
  const container = document.querySelector(".elements__container");
  const card = new Card(addTitle, addImage, "#elements-template");
  const cardElements = card.generateCard();

  container.prepend(cardElements);
  closePopup();
}


export function renderer(item) {
  const card = new Card(item, "#elements-template", () => popupImage.open(item)
  );
  return card.generateCard();

}