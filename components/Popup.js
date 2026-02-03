export default class Popup{
  constructor(popupSelector){
    this._popup=document.querySelector(popupSelector)
    this.open=this.open.bind(this)


  }
  open(){
    this._popup.classList.add('popup_opened')
    document.addEventListener("keydown", this._handleEscClose);

  }
  close(){
    this._popup.classList.remove('popup_opened')

  }
  _handleEscClose = (evt) => {
  if (evt.key === "Escape") {
    this.close();
  }
}
  setEventListeners(){
    this._popup.querySelector(".popup__btn-close").addEventListener("click", () => {
      this.close();
    });
    document.addEventListener("mousedown", (evt) => {
      if (!evt.target.closest('.popup__container')) {
        this.close();
      }
    });

  }
}