//Функция добавляет обработчики событий на элементы карточки (изображение, кнопки удаления и лайка) и применяет  изменения к карточке.
//После всех манипуляций функция возвращает созданный элемент карточки.

const createCard = ({
  userIdIdentifier,
  sample,
  data,
  deleteServerCard,
  likeServerCard,
  imageClickUrl,
}) => {
  const element = sample.querySelector(".card").cloneNode(true);
  const likeCounter = element.querySelector(".card__like-counter");
  const image = element.querySelector(".card__image");
  const deleteButton = element.querySelector(".card__delete-button");
  const likeButton = element.querySelector(".card__like-button");

  const { name, link, likes, owner, _id } = data;

  image.addEventListener("click", () =>
    imageClickUrl({ cardName: name, cardLink: link })
  );
  image.src = link;
  image.alt = name;
  element.querySelector(".card__title").textContent = name;

  if (likes.length) {
    likeCounter.classList.add("card__like-counter_is-active");
    likeCounter.textContent = likes.length;
  }

  if (owner["_id"] === userIdIdentifier) {
    deleteButton.classList.add("card__delete-button_is-active");
    deleteButton.addEventListener("click", () =>
      deleteServerCard({
        cardId: _id,
        cardElement: element,
        buttonElement: deleteButton,
      })
    );
  } else {
    deleteButton.style.display = "none"; // Скрыть кнопку удаления у карточек, не принадлежащих текущему пользователю
  }

  if (likes.map((like) => like["_id"]).includes(userIdIdentifier)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  likeButton.addEventListener("click", () =>
    likeServerCard({
      cardId: _id,
      buttonElement: likeButton,
      counterElement: likeCounter,
    })
  );

  return element;
};

const removeCardFromDOM = (cardElement) => {
  cardElement.remove();
};

const setLike = ({ buttonElement, counterElement, likes }) => {
  buttonElement.classList.add("card__like-button_is-active");
  counterElement.classList.add("card__like-counter_is-active");
  counterElement.textContent = likes.length;
};

const removeLike = ({ buttonElement, counterElement, likes }) => {
  buttonElement.classList.remove("card__like-button_is-active");

  if (likes.length) {
    counterElement.classList.add("card__like-counter_is-active");
    counterElement.textContent = likes.length;
  } else {
    counterElement.classList.remove("card__like-counter_is-active");
    counterElement.textContent = "";
  }
};

export { createCard, removeCardFromDOM, setLike, removeLike };
