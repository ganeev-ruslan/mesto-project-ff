function createCard(
  cardData,
  deleteCallBack,
  likeButtonCard,
  openImageCallback
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const buttonLike = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  //   cardElement.querySelector(".card__image").src = cardData.link;
  //   cardElement.querySelector(".card__image").alt = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;
  deleteButton.addEventListener("click", deleteCallBack);
  buttonLike.addEventListener("click", likeButtonCard);
  cardImage.addEventListener("click", openImageCallback);
  

  return cardElement;
}

function deleteCard(event) {
  event.target.closest(".card").remove();
}

function likeCard(event) {
  const addlike = event.target;
  addlike.classList.toggle("card__like-button_is-active");
}

export { createCard, deleteCard, likeCard };
