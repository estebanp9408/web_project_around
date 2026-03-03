import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".popup__form");
    this._submitButton = this._form
      ? this._form.querySelector(".popup__button")
      : null;
    this._defaultButtonText = this._submitButton
      ? this._submitButton.textContent
      : "Guardar";
  }

  _getInputValues() {
    const inputs = Array.from(this._form.querySelectorAll(".popup__input"));
    return inputs.reduce((acc, input) => {
      acc[input.name] = input.value;
      return acc;
    }, {});
  }

  setInputValues(values = {}) {
    const inputs = Array.from(this._form.querySelectorAll(".popup__input"));
    inputs.forEach((input) => {
      if (values[input.name] !== undefined) input.value = values[input.name];
    });
  }

  renderLoading(isLoading, loadingText = "Guardando...") {
    if (!this._submitButton) return;
    this._submitButton.textContent = isLoading ? loadingText : this._defaultButtonText;
    this._submitButton.disabled = Boolean(isLoading);
  }

  _handleSubmit = (evt) => {
    evt.preventDefault();
    const data = this._getInputValues();
    this.renderLoading(true);
    const result = this._handleFormSubmit(data);
    if (result && typeof result.finally === "function") {
      result
        .then(() => this.close())
        .catch((err) => console.error(err))
        .finally(() => this.renderLoading(false));
    } else {
      this.renderLoading(false);
      this.close();
    }
  };

  setEventListeners() {
    super.setEventListeners();
    if (this._form) this._form.addEventListener("submit", this._handleSubmit);
  }

  close() {
    super.close();
    if (this._form) this._form.reset();
    this.renderLoading(false);
  }
}
