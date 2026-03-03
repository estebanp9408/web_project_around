import Popup from "./popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._submitButton = this._popup
      ? this._popup.querySelector(".popup__button")
      : null;
    this._defaultButtonText = this._submitButton
      ? this._submitButton.textContent
      : "Sí";
    this._handleSubmitCallback = null;
  }

  setSubmitAction(action) {
    this._handleSubmitCallback = action;
  }

  renderLoading(isLoading, loadingText = "Eliminando...") {
    if (!this._submitButton) return;
    this._submitButton.textContent = isLoading ? loadingText : this._defaultButtonText;
    this._submitButton.disabled = Boolean(isLoading);
  }

  setEventListeners() {
    super.setEventListeners();
    if (!this._submitButton) return;
    this._submitButton.addEventListener("click", () => {
      if (!this._handleSubmitCallback) return;
      // show loading while action runs
      this.renderLoading(true);
      const result = this._handleSubmitCallback();
      if (result && typeof result.finally === "function") {
        result.finally(() => this.renderLoading(false));
      } else {
        this.renderLoading(false);
      }
    });
  }
}