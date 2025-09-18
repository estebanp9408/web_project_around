import Popup from "./Popup.js";
export default class PopupWithImage extends Popup{
  constructor(popupSelector){
    super(popupSelector);
    this._image = this._popup.querySelector('.bigimg-popup__img')
    this._title = this._popup.querySelector('.bigimg-popup__title')
  }
  open(item){
    this._image.src = item.link;
    this._image.alt = item.name;
    this._title.textContent = item.name;
    super.open();
  }
}