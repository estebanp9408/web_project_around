export default class Api {
  constructor({ baseUrl, token, }) {
    this._baseUrl = baseUrl;
    this._headers = {

      authorization: token,
      'Content-Type': 'application/json'
    };
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);

   /*  if (res.ok) return res.json();
    return Promise.reject(new Error(`API error: ${res.status}`)); */
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/v1/users/me`, {
      headers: this._headers
    }).then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/v1/cards`, {
      method: 'GET',
      headers: this._headers
    }).then(this._checkResponse)
  }
  updateUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/v1/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ name, about })
    }).then(this._checkResponse);
  }
  addCard({ name, link }) {
    return fetch(`${this._baseUrl}/v1/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ name, link })
    }).then(this._checkResponse);
  }
  addLike(cardId) {
    return fetch(`${this._baseUrl}/v1/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    }).then(this._checkResponse);
  }
  removeLike(cardId) {
    return fetch(`${this._baseUrl}/v1/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    }).then(this._checkResponse);
  }
  removeCard(cardId) {
    console.log(`Removing card with ID: ${cardId}`);
    return fetch(`${this._baseUrl}/v1/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    }).then(this._checkResponse);
  }

}
