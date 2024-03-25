// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

// index.js

import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";
import { openPopUp, closePopUp } from "./scripts/modal.js";
import { createCard, deleteCard, likeCard } from "./scripts/card.js";

const pageContent = document.querySelector(".page__content");
const placesList = pageContent.querySelector(".places__list");
const newPlaceForm = document.forms["new-place"];
const cardName = newPlaceForm["place-name"];
const cardLink = newPlaceForm.link;
const editeProfileForm = document.forms["edit-profile"];
const nameInput = editeProfileForm.name;
const jobInput = editeProfileForm.description;
const popupCaption = document.querySelector(".popup__caption");
const popUpImage = document.querySelector(".popup__image");
const popups = document.querySelectorAll(".popup");
const popUpTypeImage = document.querySelector(".popup_type_image");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

initialCards.forEach(function (element) {
  const cardItem = createCard(element, deleteCard, likeCard, handleImageClick);
  placesList.append(cardItem);
});

popups.forEach(function (element) {
  element.classList.add("popup_is-animated");

  function handlePopupClose(event) {
    if (
      event.target.classList.contains("popup_is-opened") ||
      event.target.classList.contains("popup__close")
    ) {
      closePopUp(element);
    }
  }
  element.addEventListener("mousedown", handlePopupClose);
});

function openProfilePopup() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openPopUp(popupTypeEdit);
}

editButton.addEventListener("click", function () {
  openProfilePopup();
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const name = nameInput.value;
  const profession = jobInput.value;
  profileTitle.textContent = name;
  profileDescription.textContent = profession;
  closePopUp(popupTypeEdit);
}

editeProfileForm.addEventListener("submit", handleProfileFormSubmit);

function openCardPopup() {
  openPopUp(popupTypeNewCard);
}

function handleImageClick(event) {
  if (event.target.classList.contains("card__image")) {
    popUpImage.src = event.target.src;
    popUpImage.alt = event.target.alt;
    popupCaption.textContent = event.target.alt;
    openPopUp(popUpTypeImage);
  }
}

newPlaceForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const newObj = {
    name: cardName.value,
    link: cardLink.value,
  };
  const cardItem = createCard(newObj, deleteCard, likeCard, handleImageClick);
  placesList.prepend(cardItem);
  closePopUp(popupTypeNewCard);
  newPlaceForm.reset();
});

addButton.addEventListener("click", openCardPopup);
