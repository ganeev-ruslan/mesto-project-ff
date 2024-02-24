// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

// Функция для создания карточки
function createCard(cardData, deleteCallback) {
  const cardTemplate = document.querySelector("#card-template");
  const cardElement = cardTemplate.content.firstElementChild.cloneNode(true);

  cardElement.querySelector(".card__image").src = cardData.link;
  cardElement.querySelector(".card__image").alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;

  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", function () {
      deleteCallback(cardElement);
    });

  return cardElement;
}

// Функция для удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
}

// Вывод всех карточек из массива на страницу
const placesList = document.querySelector(".places__list");
initialCards.forEach(function (card) {
  const newCard = createCard(card, deleteCard);
  placesList.appendChild(newCard);
});
