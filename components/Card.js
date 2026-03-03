export default class Card {
  constructor(data, templateSelector, handleCardClick, handleDeleteClick, handleLikeClickcallBack,currentUserId) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._isLiked = data.isLiked ?? false;
    this._ownerId = data.owner
    this._currentUserId = currentUserId;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClickCallback = handleDeleteClick;
    this._handleLikeClickcallBack = handleLikeClickcallBack;

  }
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".elements__card")
      .cloneNode(true);
    return cardElement;
  }
  _handleLikeClick() {
    this._handleLikeClickcallBack(this);
  }
  _handleDeleteClick() {
    this._handleDeleteClickCallback(this);
  }
  _setEventListeners() {
    this._deletebtn.addEventListener("click", () => {
      this._handleDeleteClick();
    });
    this._likebtn.addEventListener("click", () => this._handleLikeClick());
    this._image.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    })

  }
  generateCard() {
    this._element = this._getTemplate();
    this._image = this._element.querySelector(".elements__card-photo");
    this._text = this._element.querySelector(".elements__card-content-text");
    this._likebtn = this._element.querySelector(".elements__card-like");
    this._deletebtn = this._element.querySelector(".elements__card-delete");
    this._image.alt = this._name;
    this._image.src = this._link;
    this._text.textContent = this._name;
    if (this._isLiked) {
      this._likebtn.classList.add("elements__card-like_active");
    }
    this._setEventListeners();
 if (this._ownerId !== this._currentUserId) {
  this._deletebtn.remove();
}
    return this._element;
  }
  isLiked() {
    return this._isLiked;
  }
  toggleLike() {
    this._isLiked = !this._isLiked;
    this._likebtn.classList.toggle("elements__card-like_active");
  }
  getId() {
    return this._id;
  }
  remove() {
    this._element.remove();
    this._element = null;
  }
}
