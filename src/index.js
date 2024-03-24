// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

// index.js

import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";
import { openPopUp, closePopUp } from "./scripts/modal.js";

const pageContent = document.querySelector(".page__content");
const placesList = pageContent.querySelector(".places__list");
const newPlace = document.forms["new-place"];
const cardName = newPlace["place-name"];
const cardLink = newPlace.link;
const editeProfile = document.forms["edit-profile"];
const nameInput = editeProfile.name;
const jobInput = editeProfile.description;
const popupCaption = document.querySelector(".popup__caption");
const popUpImage = document.querySelector(".popup__image");
const popup = document.querySelectorAll(".popup");
const popUpTypeImage = document.querySelector(".popup_type_image");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

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
  cardElement.querySelector(".card__image").src = cardData.link;
  cardElement.querySelector(".card__image").alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;
  deleteButton.addEventListener("click", deleteCallBack);
  buttonLike.addEventListener("click", likeButtonCard);
  cardImage.addEventListener("click", openImageCallback);
  return cardElement;
}

function deleteButtons(event) {
  event.target.closest(".card").remove();
}

function likeButtons(event) {
  const addlike = event.target;
  addlike.classList.toggle("card__like-button_is-active");
}

initialCards.forEach(function (element) {
  const cardItem = createCard(
    element,
    deleteButtons,
    likeButtons,
    pictureclick
  );
  placesList.append(cardItem);
});

popup.forEach(function (element) {
  element.classList.add("popup_is-animated");

  function clickOwerlay(event) {
    if (
      event.target.classList.contains("popup_is-opened") ||
      event.target.classList.contains("popup__close")
    ) {
      closePopUp(element);
    }
  }
  element.addEventListener("mousedown", clickOwerlay);
});

function editmodalPopUp() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openPopUp(popupTypeEdit);
}

editButton.addEventListener("click", function () {
  editmodalPopUp();
});

function formHandler(evt) {
  evt.preventDefault();
  const name = nameInput.value;
  const profession = jobInput.value;
  profileTitle.textContent = name;
  profileDescription.textContent = profession;
  closePopUp(popupTypeEdit);
}

editeProfile.addEventListener("submit", formHandler);

function AddCardFormSubmit() {
  //функция открытия формы добавления карточек
  openPopUp(popupTypeNewCard);
}

function pictureclick(event) {
  if (event.target.classList.contains("card__image")) {
    popUpImage.src = event.target.src;
    popUpImage.alt = event.target.alt;
    popupCaption.textContent = event.target.alt;
    openPopUp(popUpTypeImage);
  }
}

newPlace.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const newObj = {
    name: cardName.value,
    link: cardLink.value,
  };
  const cardItem = createCard(newObj, deleteButtons, likeButtons, pictureclick);
  placesList.prepend(cardItem);
  closePopUp(popupTypeNewCard);
  newPlace.reset();
});

addButton.addEventListener("click", AddCardFormSubmit);
