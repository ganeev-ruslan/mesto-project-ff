// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу



function createCard(name, link) {
  const cardTemplate = document.querySelector("#card-template");
  const cardElement = cardTemplate.content.firstElementChild.cloneNode(true);

  cardElement.querySelector(".card__image").src = link;
  cardElement.querySelector(".card__image").alt = name;
  cardElement.querySelector(".card__title").textContent = name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", function () {
    deleteCard(cardElement);
  });

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", function () {
    likeButton.classList.toggle("card__like-button_active");
  });

  return cardElement;
}

function deleteCard(cardElement) {
  cardElement.remove();
}

document.addEventListener("DOMContentLoaded", function () {
  const placesList = document.querySelector(".places__list");

  initialCards.forEach(function (card) {
    const newCard = createCard(card.name, card.link);
    placesList.appendChild(newCard);
  });
});