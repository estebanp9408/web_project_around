export default class Card {
  constructor(name, link, templateSelector) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
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
      document
        .querySelector(".bigimg-popup")
        .classList.add("bigimg-popup_opened");
      document.querySelector(".bigimg-popup__img").src = this._link;
      document.querySelector(".bigimg-popup__footer").textContent = this._name;
      document
        .querySelector(".bigimg-popup__btn-close")
        .addEventListener("click", () => {
          document
            .querySelector(".bigimg-popup")
            .classList.remove("bigimg-popup_opened");
        });
    });
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
