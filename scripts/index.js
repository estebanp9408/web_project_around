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
console.log(popupWithConfirmation);
const API = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com",
  token: "d02ab8d1-21c9-446c-a913-7d550a34833e"
});

setdefaultUserInfo();
const popupImage = new PopupWithImage('.bigimg-popup');
popupImage.setEventListeners();
function handlerImageClick(name, link) {
  popupImage.open( {name, link} );
}
function handleDeleteClick(card) {
  console.log(card.getId());
  popupWithConfirmation.setSubmitAction(() => {
    console.log("SE ESTA EJECUTANDO HANDLE SUBMIT DESDE INDEX");
    return API.removeCard(card.getId())
      .then(() => {
        console.log("SE ESTA EJECUTANDO HANDLE SUBMIT DESDE INDEX");
        card.element.remove();
        popupWithConfirmation.close();
      })
      .catch((error) => {
        console.error("Error removing card:", error);
      });
  });
  popupWithConfirmation.open();
}
function handleLikeClick(card) {
  if (card._isLiked ) {
    API.removeLike(card.getId())
      .then(() => {
        card.updateLikesCount();
      })
      .catch((error) => {
        console.error("Error removing like:", error);
      });
  } else {
    API.addLike(card.getId())
      .then(() => {
        card.updateLikesCount();
      })
      .catch((error) => {
        console.error("Error adding like:", error);
      });
  }
}
function renderer(item) {
  const card = new Card(item, "#elements-template", handlerImageClick, handleDeleteClick, handleLikeClick);
  return card.generateCard();

}
const section = new Section({items: [], renderer: renderer},".elements__container");
API.getInitialCards()
  .then(cards => {
    section.renderItems(cards);
  })
const handleAddFormSubmit = (data) => {
  API.addCard({ name: data.title, link: data.image })
    .then(newCard => {
      const cardElement = renderer({ name: newCard.name, link: newCard.link });
      section.addItem(cardElement);
    })
    .catch(error => {
      console.error("Error al agregar tarjeta:", error);
    });
};
const addCardPopup = new PopupWithForm('.add-popup', handleAddFormSubmit);
const openAddCardBtn = document.querySelector('.profile__info-add-btn');
openAddCardBtn.addEventListener('click', () => {
  addCardPopup.open();
});
addCardPopup.setEventListeners();
const userInfo = new UserInfo({
  nameSelector: '.profile__info-name',
  aboutSelector: '.profile__info-description',
  avatarSelector: '.profile__avatar'
});
function setdefaultUserInfo() {
  API.getUserInfo()
    .then(userData => {
      userInfo.setUserInfo({
        name: userData.name,
        about: userData.about,
        avatar: userData.avatar
      });
    })
    .catch((error) =>  {
      console.error("Error fetching user info:", error);
    });
}
const handleProfileFormSubmit = (data) => {
  API.updateUserInfo(
    { name: data.name,
      about: data.about
    }
  )
    .then(updatedData => {
      userInfo.setUserInfo({
        name: updatedData.name,
        about: updatedData.about,
        avatar: updatedData.avatar
      })
    })
    .catch(error => {
      console.error("Error updating user info:", error);
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
const avatarPopup = new PopupWithForm('.avatar-popup', (data) => {
  const avatarImage = document.querySelector('.profile__avatar');
  avatarImage.src = data.avatar;
});
avatarPopup.setEventListeners();
const validation = new FormValidator({
   formSelector: ".popup__form",
   inputSelector: ".popup__input",
   submitButtonSelector: ".popup__button",
   inactiveButtonClass: "popup__button_disabled",
   inputErrorClass: "popup__input_type_error",
   errorClass: "popup__error_visible",
 });
 validation.enableValidation();
const avatarEditBtn = document.querySelector('.profile__avatar-edit-btn');
avatarEditBtn.addEventListener('click', () => {
  avatarPopup.open();
});




