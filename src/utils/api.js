class Api {
    constructor(options) {
        this.baseUrl = options['baseUrl'];
        this.headers = options['headers'];
    }

    _handleOriginalResponse(res) {
        if (!res.ok) {
            return Promise.reject(`Error: ${res.status}`);
        }
        return res.json();
    }

    getInitialCards() {
        return fetch(this.baseUrl + '/cards', {
            headers: this.headers
        }).then(this._handleOriginalResponse);
    }

    changeLikeCardStatus(id, status) {
        return fetch(this.baseUrl + `/cards/likes/${id}`, {
            headers: this.headers,
            method: `${status ? 'PUT' : 'DELETE'}`,
        }).then(this._handleOriginalResponse);
    }

    createCard(name, link) {
        return fetch(this.baseUrl + `/cards`, {
            headers: this.headers,
            method: 'POST',
            body: JSON.stringify({
                name: name,
                link: link
            })
        }).then(this._handleOriginalResponse);
    }

    deleteCard(id) {
        return fetch(this.baseUrl + `/cards/${id}`, {
            headers: this.headers,
            method: 'DELETE',
        }).then(this._handleOriginalResponse);
    }

    getUserInfo() {
        return fetch(this.baseUrl + '/users/me', {
            headers: this.headers,
            method: 'GET',
        }).then(this._handleOriginalResponse);
    }

    setProfile(name, about) {
        return fetch(this.baseUrl + '/users/me', {
            headers: this.headers,
            method: 'PATCH',
            body: JSON.stringify({
                name: name,
                about: about
            })
        }).then(this._handleOriginalResponse);
    }

    setAvatar(url) {
        return fetch(this.baseUrl + '/users/me/avatar', {
            headers: this.headers,
            method: 'PATCH',
            body: JSON.stringify({
                avatar: url
            })
        }).then(this._handleOriginalResponse);
    }
}

const api = new Api({
    baseUrl: 'http://localhost:3000',
    headers: {
        // authorization: '8b08d836-44f0-4512-90c9-f96fba78716b',
        'Content-Type': 'application/json'
    },
    credentials: 'same-origin'
});

export default api;