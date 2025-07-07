function closePopup() {
  const addPopup = document.querySelector(".add-popup");
  const popup = document.querySelector(".popup");
  popup.classList.remove("popup_opened");
  addPopup.classList.remove("add-popup_opened");
}

function fillProfileForm() {
  const inputName = document.querySelector(".popup__form-name");
  const inputDescription = document.querySelector(".popup__form-abtme");
  const profileInfoName = document.querySelector(".profile__info-name");
  const profileAbtMe = document.querySelector(".profile__info-description");

  inputName.value = profileInfoName.textContent;
  inputDescription.value = profileAbtMe.textContent;
}
function handleProfileFormSubmit(evt) {
  const inputName = document.querySelector(".popup__form-name");
  const inputDescription = document.querySelector(".popup__form-abtme");
  const profileInfoName = document.querySelector(".profile__info-name");
  const profileAbtMe = document.querySelector(".profile__info-description");

  evt.preventDefault();
  profileInfoName.textContent = inputName.value;
  profileAbtMe.textContent = inputDescription.value;
  closePopup();
}

function openAddPopup() {
  const addPopup = document.querySelector(".add-popup");
  addPopup.classList.toggle("add-popup_opened");
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const addForm = document.querySelector(".add-popup__form");
  const addTitle = document.querySelector(".add-popup__form-title").value;
  const addImage = document.querySelector(".add-popup__form-img-url").value;
  const container = document.querySelector(".elements__container");
  const card = new Card(addTitle, addImage, "#elements-template");
  const cardElements = card.generateCard();

  container.prepend(cardElements);
  closePopup();
}

function setEventListeners() {
  const addPopupCloseBtn = document.querySelector(".add-popup__btn-close");
  const editBtn = document.querySelector(".profile__info-edit-btn");
  const closeBtn = document.querySelector(".popup__btn-close");

  const addBtn = document.querySelector(".profile__info-add-btn");

  const editForm = document.querySelector(".popup__form");
  const addForm = document.querySelector(".add-popup__form");
  editForm.addEventListener("submit", handleProfileFormSubmit);

  closeBtn.addEventListener("click", closePopup);
  editBtn.addEventListener("click", () => {
    fillProfileForm();
    const popup = document.querySelector(".popup");
    popup.classList.toggle("popup_opened");
  });
  addBtn.addEventListener("click", openAddPopup);

  addPopupCloseBtn.addEventListener("click", closePopup);
  addForm.addEventListener("submit", handleAddFormSubmit);
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
}
export function initApp() {
  setEventListeners();
}
