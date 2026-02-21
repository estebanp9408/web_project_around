import Popup from "./Popup.js";
export default class PopupWithConfirmation extends Popup{
constructor(popupSelector) {
  super(popupSelector);

  console.log("POPUP:", this._popup);

  this._form = this._popup.querySelector(".confirm-popup__form");
  console.log("FORM:", this._form);

  this._submitButton = this._popup.querySelector(".confirm-popup__form-submit-btn");
  console.log("BUTTON:", this._submitButton);
}

  open() {
    super.open();
  }
  close() {
    super.close();
  }
 setEventListeners() {
  console.log("SET LISTENERS CONFIRM EJECUTADO");

  super.setEventListeners();

  this._form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    console.log("SUBMIT CONFIRM DISPARADO");
    if (this._handleSubmit) {
      this._handleSubmit();
    }
  });
}
  setSubmitAction(action) {
     console.log("SE ESTA EJECUTANDO HANDLE SUBMIT");
     console.log(action);
    this._handleSubmit = action;
  }
}