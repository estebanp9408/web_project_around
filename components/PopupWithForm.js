import Popup from "./Popup.js";
export default class PopupWithForm extends Popup{
  constructor(popupSelector,handleFormSubmit){
    super(popupSelector);
    this._handleSubmit = handleFormSubmit;
    this.open=this.open.bind(this)
  }
   _handleFormSubmit(event){
      event.preventDefault();
      const inputValues = this._getInputValues();
      this._handleSubmit(inputValues);

    }

  _getInputValues(){
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }
  setEventListeners (){
    super.setEventListeners();
    this._popup.querySelector('form').addEventListener('submit', (evt) => {
      this._handleFormSubmit(evt);
    });
  }
  close(){
    super._close();
    this._popup.querySelector('form').reset();
  }
}