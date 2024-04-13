const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-10',
  headers: {
    authorization: 'af6e5107-9f53-409b-89ed-6a4a2874b113',
    'Content-Type': 'application/json',
  },
};

const handleServerResponse = (response) => {
  if (response.ok) {
    return response.json();
  }

  return Promise.reject(`Ошибка: ${response.status}`);
};

const validateImageUrl = (url) => {
  return fetch(url, {
    method: 'HEAD',
  }).then(({ ok, headers, status }) => {
    if (ok) {
      if (headers.get('Content-Type').includes('image')) {
        return Promise.resolve();
      }

      return Promise.reject('Ошибка: URL ссылается на не изображение');
    }

    return Promise.reject(`Ошибка: ${status}`);
  });
};

const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, { headers: config.headers }).then(
    handleServerResponse
  );
};

const addCard  = ({ name, link }) => {
  return validateImageUrl(link).then(() =>
    fetch(`${config.baseUrl}/cards`, {
      headers: config.headers,
      method: 'POST',
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(handleServerResponse)
  );
};

const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    headers: config.headers,
    method: 'DELETE',
  }).then(handleServerResponse);
};

const likeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    headers: config.headers,
    method: 'PUT',
  }).then(handleServerResponse);
};

const unLikeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    headers: config.headers,
    method: 'DELETE',
  }).then(handleServerResponse);
};

const fetchUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, { headers: config.headers }).then(
    handleServerResponse
  );
};

const updateUserInfo = ({ name, description }) => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
    method: 'PATCH',
    body: JSON.stringify({
      name,
      about: description,
    }),
  }).then(handleServerResponse);
};

const updateAvatar = (url) => {
  return validateImageUrl(url).then(() =>
    fetch(`${config.baseUrl}/users/me/avatar`, {
      headers: config.headers,
      method: 'PATCH',
      body: JSON.stringify({
        avatar: url,
      }),
    }).then(handleServerResponse)
  );
};

export {
  getInitialCards,
  addCard,
  deleteCard,
  likeCard,
  unLikeCard,
  fetchUserInfo,
  updateUserInfo,
  updateAvatar,
};