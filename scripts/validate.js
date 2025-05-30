const showInputError = (input, requirements) => {
  const errorMessage = input.validationMessage;
  const errorElement = document.querySelector(`.${input.id}-error`);
  input.classList.add(requirements.inputErrorClass);
  errorElement.classList.add(requirements.errorClass);
  errorElement.textContent = errorMessage;
};

const hideInputError = (input, requirements) => {
  const errorElement = document.querySelector(`.${input.id}-error`);
  input.classList.remove(requirements.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(requirements.errorClass);
};

const checkInputValidation = (input, requirements) => {
  if (input.validity.valid) {
    hideInputError(input, requirements);
  } else {
    showInputError(input, requirements);
  }
};

const hasInvalidInput = (inputList) => {
  return Array.from(inputList).some((input) => !input.validity.valid);
};

const toggleButtonState = (inputList, button, requirements) => {
  if (hasInvalidInput(inputList)) {
    button.classList.add(requirements.inactiveButtonClass);
    button.disabled = true;
  } else {
    button.classList.remove(requirements.inactiveButtonClass);
    button.disabled = false;
  }
};

const setEventListeners = (formElement, requirements) => {
  const inputList = Array.from(
    formElement.querySelectorAll(requirements.inputSelector)
  );
  const button = formElement.querySelector(requirements.submitButtonSelector);

  toggleButtonState(inputList, button, requirements);

  inputList.forEach((input) => {
    input.addEventListener("input", () => {
      checkInputValidation(input, requirements);
      toggleButtonState(inputList, button, requirements);
    });
  });

  formElement.addEventListener("submit", (evt) => {
    evt.preventDefault();
  });
};

export const enableValidation = (requirements) => {
  const formList = document.querySelectorAll(requirements.formSelector);
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, requirements);
  });
};
