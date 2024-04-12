import { likeCardApi, unlikedCard, deleteCardApi } from "./api";

function createCard(cardData, userID, openImageCallback) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const buttonLike = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;

  deleteButton.addEventListener("click", () => deleteCard(cardElement, cardData._id));
  buttonLike.addEventListener("click", () => likeCard(buttonLike, cardData._id, cardElement));
  cardImage.addEventListener("click", () => openImageCallback(cardData));
  
  //условие проверяет, поставил ли текущий пользователь лайк на данную карточку.

  if (cardData.likes.some((addlike)=> addlike._id ===userID)){
    buttonLike.classList.add('card__like-button_is-active')
  }

  countLike(cardElement, cardData);
  return cardElement
}

//удаление карточки из пользовательского интерфейса и с сервера.
function deleteCard(cardToRemoveElement, cardId) {
  deleteCardApi(cardId)
    .then((сardData) => {
      cardToRemoveElement.remove();
      console.log("Карточка успешно удалена:", сardData);
    })
    .catch((error) => {
      console.log("Произошла ошибка при удалении карточки:", error);
    });
}
//обработчик действия по нажатию на кнопку "лайк" карточки.
function likeCard(addlike, cardId, elem) {
  if (addlike.classList.contains("card__like-button_is-active")) {
    unlikedCard(cardId)
      .then((res) => {
        addlike.classList.remove("card__like-button_is-active");
        countLike(elem, res);
      })
      .catch((error) => {
        console.log("Произошла ошибка при добавлении лайка:", error);
      });
  } else {
    likeCardApi(cardId)
      .then((res) => {
        addlike.classList.add("card__like-button_is-active");
        countLike(elem, res);
      })
      .catch((error) => {
        console.log("Произошла ошибка при добавлении лайка:", error);
      });
  }
}

//обновляет отображение количества лайков в элементе с классом "count" на основе значения из объекта
function countLike(elem, card) {
  const count = elem.querySelector(".count");
  if (count) {
    count.textContent = card.likes.length;
  }
}

export {createCard};
