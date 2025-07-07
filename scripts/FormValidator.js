export default class FormValidator {
  constructor(requirements) {
    this.requirements = requirements;
  }
  showInputError(input) {
    const errorMessage = input.validationMessage;
    const errorElement = document.querySelector(`.${input.id}-error`);
    input.classList.add(this.requirements.inputErrorClass);
    errorElement.classList.add(this.requirements.errorClass);
    errorElement.textContent = errorMessage;
  }
  hideInputError(input) {
    const errorElement = document.querySelector(`.${input.id}-error`);
    input.classList.remove(this.requirements.inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this.requirements.errorClass);
  }
  checkInputValidation(input) {
    !input.validity.valid
      ? this.showInputError(input)
      : this.hideInputError(input);
  }
  hasInvalidInput(inputList) {
    return Array.from(inputList).some((input) => !input.validity.valid);
  }
  toggleButtonState(inputList, button) {
    if (this.hasInvalidInput(inputList)) {
      button.classList.add(this.requirements.inactiveButtonClass);
      button.disabled = true;
    } else {
      button.classList.remove(this.requirements.inactiveButtonClass);
      button.disabled = false;
    }
  }
  setEventListeners(formELement) {
    const inputList = Array.from(
      formELement.querySelectorAll(this.requirements.inputSelector)
    );
    const button = formELement.querySelector(
      this.requirements.submitButtonSelector
    );

    this.toggleButtonState(inputList, button);

    inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this.checkInputValidation(input);
        this.toggleButtonState(inputList, button);
      });
    });

    formELement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
  }
  enableValidation() {
    const formList = document.querySelectorAll(this.requirements.formSelector);
    formList.forEach((formElement) => {
      formElement.addEventListener("submit", (evt) => {
        evt.preventDefault();
      });
      this.setEventListeners(formElement);
    });
  }
}
