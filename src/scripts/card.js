//Функция добавляет обработчики событий на элементы карточки (изображение, кнопки удаления и лайка) и применяет  изменения к карточке.
//После всех манипуляций функция возвращает созданный элемент карточки.

const createCard = ({ userIdIdentifier, sample, data, deleteServerCard, likeServerCard, imageClickUrl }) => {
  const element = sample.querySelector('.card').cloneNode(true);
  const likeCounter = element.querySelector('.card__like-counter');
  const image = element.querySelector('.card__image');
  const deleteButton = element.querySelector('.card__delete-button');
  const likeButton = element.querySelector('.card__like-button');

  const { name, link, likes, owner, _id } = data;

  image.addEventListener('click', () => imageClickUrl({ cardName: name, cardLink: link }));
  image.src = link;
  image.alt = name;
  element.querySelector('.card__title').textContent = name;

  if (likes.length) {
    likeCounter.classList.add('card__like-counter_is-active');
    likeCounter.textContent = likes.length;
  }

  if (owner['_id'] === userIdIdentifier) {
    deleteButton.classList.add('card__delete-button_is-active');
    deleteButton.addEventListener('click', () => deleteServerCard({ cardId: _id, cardElement: element, buttonElement: deleteButton }));
  }

  if (likes.map(like => like['_id']).includes(userIdIdentifier)) {
    likeButton.classList.add('card__like-button_is-active');
  }

  likeButton.addEventListener('click', () => likeServerCard({ cardId: _id, buttonElement: likeButton, counterElement: likeCounter }));

  return element;
};

export { createCard };
