// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

function createCard(name, link) {
    const cardTemplate = document.querySelector('#card-template');
    const cardElement = cardTemplate.content.firstElementChild.cloneNode(true);

    cardElement.querySelector('.card__image').src = link;
    cardElement.querySelector('.card__image').alt = name;
    cardElement.querySelector('.card__title').textContent = name;

    // Добавление обработчика события для кнопки удаления
    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', function() {
      cardElement.remove();
    });

    // Добавление обработчика события для кнопки лайка
    const likeButton = cardElement.querySelector('.card__like-button');
    likeButton.addEventListener('click', function() {
      likeButton.classList.toggle('card__like-button_active');
    });

    const placesList = document.querySelector('.places__list');
    placesList.appendChild(cardElement);
  }

  // Создание карточек из массива initialCards
  initialCards.forEach(function(card) {
    createCard(card.name, card.link);
  });

