export default class Card {
  constructor(data, templateSelector, handleCardClick, handleDeleteClick, handleLikeClickcallBack) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._isLiked = data.isLiked || false;
    this._ownerId = data.owner ? data.owner._id : null;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
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
    this._handleDeleteClick(this);
  }
  _setEventListeners() {
    this._deletebtn.addEventListener("click", () => {
      this._handleDeleteClick(this);
    });
    this._likebtn.addEventListener("click", () => this._handleLikeClick());
    this._image.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    })

  }
  generateCard() {
    this.element = this._getTemplate();
    this._image = this.element.querySelector(".elements__card-photo");
    this._text = this.element.querySelector(".elements__card-content-text");
    this._likebtn = this.element.querySelector(".elements__card-like");
    this._deletebtn = this.element.querySelector(".elements__card-delete");
    this._image.alt = this._name;
    this._image.src = this._link;
    this._text.textContent = this._name;
    if (this._isLiked) {
      this._likebtn.classList.add("elements__card-like_active");

    }
    this._setEventListeners();
    return this.element;
  }
  getId() {
    return this._id;
  }
  isLiked() {
    return this._likebtn.classList.contains("elements__card-like_active");
  }
  updateLikesCount() {
    console.log(this._likebtn);
    if (this._likebtn.classList.contains("elements__card-like_active")) {
      this._likebtn.classList.remove("elements__card-like_active");

    } else {
      this._likebtn.classList.add("elements__card-like_active");

    }
  }
}
