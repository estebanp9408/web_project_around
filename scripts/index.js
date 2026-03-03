import Section from "../components/section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Card from "../components/Card.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import Api from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
const popupWithConfirmation = new PopupWithConfirmation('.confirm-popup');
popupWithConfirmation.setEventListeners();
const API = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com",
  token: "d02ab8d1-21c9-446c-a913-7d550a34833e"
});
let currentUserId = null;
const popupImage = new PopupWithImage('.bigimg-popup');
popupImage.setEventListeners();
function handlerImageClick(name, link) {
  popupImage.open(name, link);
}
function handleDeleteClick(card) {
  popupWithConfirmation.setSubmitAction(() => {
    return API.removeCard(card.getId())
      .then(() => {
        card.remove();
        popupWithConfirmation.close();
      })
      .catch((error) => {
        console.error("Error removing card:", error);
        return Promise.reject(error);
      });
  });
  popupWithConfirmation.open();
}
function handleLikeClick(card) {
  if (card.isLiked()) {
    API.removeLike(card.getId())
      .then(() => {
        card.toggleLike();
      })
      .catch((error) => {
        console.error("Error removing like:", error);
      });
  } else {
    API.addLike(card.getId())
      .then(() => {
        card.toggleLike();
      })
      .catch((error) => {
        console.error("Error adding like:", error);
      });
  }
}
function renderer(item) {
  const card = new Card(
    item,
    "#elements-template",
    handlerImageClick,
    handleDeleteClick,
    handleLikeClick,
    currentUserId
  );
  return card.generateCard();
}
const section = new Section({items: [], renderer: renderer},".elements__container");

const userInfo = new UserInfo({
  nameSelector: '.profile__info-name',
  aboutSelector: '.profile__info-description',
  avatarSelector: '.profile__avatar'
});
Promise.all([API.getUserInfo(), API.getInitialCards()])
  .then(([userData, cards]) => {
    currentUserId = userData._id;

    userInfo.setUserInfo({
      name: userData.name,
      about: userData.about,
      avatar: userData.avatar
    });
    section.renderItems(cards);
  })
  .catch((error) => {
    console.error("Error loading initial data:", error);
  });
const handleAddFormSubmit = (data) => {
    addCardPopup.renderLoading(true,"creando...");
    const payload = {
    name: data.name ?? data.title ?? data[0],
    link: data.link ?? data.image ?? data[1],
  };
    return API.addCard(payload)
    .then(newCard => {
      const cardElement = renderer(newCard);
      section.addItem(cardElement);
      addCardPopup.close();
    })
    .catch(error => {
      console.error("Error al agregar tarjeta:", error);
      return Promise.reject(error);
    })
    .finally(() => {
      addCardPopup.renderLoading(false);
    });
};
const addCardPopup = new PopupWithForm('.add-popup', handleAddFormSubmit);
const openAddCardBtn = document.querySelector('.profile__info-add-btn');
openAddCardBtn.addEventListener('click', () => {
  addCardPopup.open();
});
addCardPopup.setEventListeners();
const handleProfileFormSubmit = (data) => {
  editProfilePopup.renderLoading(true,"guardando...");
  return API.updateUserInfo({
    name: data.name,
    about: data.about
  })
    .then((updatedData) => {
      userInfo.setUserInfo({
        name: updatedData.name,
        about: updatedData.about,
        avatar: updatedData.avatar
      });
      return updatedData;
    })
    .catch((error) => {
      console.error("Error updating user info:", error);
      return Promise.reject(error);
    })
    .finally(() => {
      editProfilePopup.renderLoading(false);
    });
}

const editProfilePopup = new PopupWithForm('.popup-edit-profile', handleProfileFormSubmit);
const openEditProfileBtn = document.querySelector('.profile__info-edit-btn');
openEditProfileBtn.addEventListener('click', () => {
  const currentUserInfo = userInfo.getUserInfo();
  editProfilePopup.setInputValues({
    name: currentUserInfo.name,
    about: currentUserInfo.about
  });
  editProfilePopup.open();
});
editProfilePopup.setEventListeners();

const avatarPopup = new PopupWithForm('.avatar-popup', (data) => {
  avatarPopup.renderLoading(true,"guardando...");
  return API.updateAvatar(data.avatar) // asegúrate de que data.avatar es string

    .then((updatedData) => {
      userInfo.setUserInfo({
        avatar: updatedData.avatar,
        name: updatedData.name,
        about: updatedData.about
      });
      return updatedData;
    })
    .catch((error) => {
      console.error("Error updating avatar:", error);
      return Promise.reject(error);
    })
    .finally(() => {
      avatarPopup.renderLoading(false);
    });
});
avatarPopup.setEventListeners();

const avatarEditBtn = document.querySelector('.profile__avatar-edit-btn');
avatarEditBtn.addEventListener('click', () => {
  avatarPopup.open();
});
const validation = new FormValidator({
   formSelector: ".popup__form",
   inputSelector: ".popup__input",
   submitButtonSelector: ".popup__button",
   inactiveButtonClass: "popup__button_disabled",
   inputErrorClass: "popup__input_type_error",
   errorClass: "popup__error_visible",
 });
 validation.enableValidation();
