export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".elements__card")
      .cloneNode(true);
    return cardElement;
  }
  _setEventListeners() {
    this._deletebtn.addEventListener("click", () => {
      this.element.remove();
    });
    this._likebtn.addEventListener("click", (evt) => {
      evt.target.classList.toggle("elements__card-like_active");
    });
    this._image.addEventListener("click", () => {
      this._handleCardClick(this);
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
    this._setEventListeners();
    return this.element;
  }
}
