let editBtn = document.querySelector(".profile__info-edit-btn");
let closeBtn = document.querySelector(".popup__btn-close");
let popUp = document.querySelector(".popup");
function openPopup() {
  if (popUp.classList.contains("popup")) {
    popUp.classList.toggle("popup_opened");
  }
}

editBtn.addEventListener("click", openPopup);

function closePopup() {
  if (popUp.classList.contains("popup_opened")) {
    popUp.classList.toggle("popup_opened");
  }
}
closeBtn.addEventListener("click", closePopup);
let inputName = document.querySelector(".popup__form-name");
let inputDescription = document.querySelector(".popup__form-abtme");
let profileInfoName = document.querySelector(".profile__info-name");
let ProfileAbtme = document.querySelector(".profile__info-description");
inputName.value = profileInfoName.textContent;
inputDescription.value = ProfileAbtme.textContent;

let editForm = document.querySelector(".popup__form");
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileInfoName.textContent = inputName.value;
  ProfileAbtme.textContent = inputDescription.value;
}
editForm.addEventListener("submit", handleProfileFormSubmit);
