import "./pages/index.css";

import { closeModal, openModal, handleModalClick } from "./scripts/modal.js";

import { createCard } from "./scripts/card.js";
import {
  removeCardFromDOM,
} from "./scripts/card.js";

import {
  getInitialCards,
  fetchUserInfo,
  updateAvatar,
  updateUserInfo,
  likeCard,
  unLikeCard,
  addCard,
  deleteCard,
} from "./scripts/api.js";

import {
  clearValidationErrors,
  enableValidation,
} from "./scripts/validation.js";
import { changingButtonState } from "./scripts/utils.js";

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const popupCard = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");
const popupImageCaption = popupTypeImage.querySelector(".popup__caption");
const popupImage = popupTypeImage.querySelector(".popup__image");
const placesList = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;
const cardForm = document.forms["new-place"];
const popupButton = cardForm.querySelector(".popup__button");
const cardNameInput = cardForm.elements["place-name"];
const cardLinkInput = cardForm.elements.link;
const addButton = document.querySelector(".profile__add-button");

const profileImageForm = document.forms["edit-avatar"];
const profileImageInput = profileImageForm.elements.avatar;
const profileImageFormSubmitButton =
  profileImageForm.querySelector(".popup__button");

const popupProfileImage = document.querySelector(".popup_type_edit-avatar");

const profileImage = document.querySelector(".profile__image");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const profileForm = document.forms["edit-profile"];
const profileFormSubmitButton = profileForm.querySelector(".popup__button");
const profileNameInput = profileForm.elements.name;
const profileDescriptionInput = profileForm.elements.description;

const popupProfile = document.querySelector(".popup_type_edit");
const editButton = document.querySelector(".profile__edit-button");

const popupConfirm = document.querySelector(".popup_type_confirm");
const popupConfirmButton = popupConfirm.querySelector(".popup__button_confirm");

const userProfileData = ({ name, description, avatar }) => {
  profileTitle.textContent = name;
  profileDescription.textContent = description;
  profileImage.style.backgroundImage = `url(${avatar})`;
};

const handleCardLike = ({ cardId, buttonElement, counterElement }) => {
  buttonElement.disabled = true;

  if (buttonElement.classList.contains("card__like-button_is-active")) {
    unLikeCard(cardId)
      .then(({ likes }) => {
        buttonElement.classList.remove("card__like-button_is-active");

        if (likes.length) {
          counterElement.classList.add("card__like-counter_is-active");

          counterElement.textContent = likes.length;
        } else {
          counterElement.classList.remove("card__like-counter_is-active");

          counterElement.textContent = "";
        }
      })

      .catch((error) => console.error(error))

      .finally(() => {
        buttonElement.disabled = false;
      });
  } else {
    likeCard(cardId)
      .then(({ likes }) => {
        buttonElement.classList.add("card__like-button_is-active");

        counterElement.classList.add("card__like-counter_is-active");

        counterElement.textContent = likes.length;
      })

      .catch((error) => console.error(error))

      .finally(() => {
        buttonElement.disabled = false;
      });
  }
};

const cardRemovalHandler = ({ cardId, buttonElement }) => {
  openModal(popupConfirm);

  popupConfirmButton.onclick = () => {
    buttonElement.disabled = true;

    deleteCard(cardId)
      .then(() => {
        removeCardFromDOM(buttonElement.closest(".card"));
      })
      .catch((error) => {
        buttonElement.disabled = false;
        console.error(error);
      })
      .finally(() => {
        closeModal(popupConfirm);
      });
  };
};

const cardFormHandler = (event) => {
  event.preventDefault();

  changingButtonState({
    buttonElement: popupButton,
    isSubmitting: true,
  });

  addCard({
    name: cardNameInput.value,
    link: cardLinkInput.value,
  })
    .then((cardData) => {
      placesList.prepend(
        createCard({
          userIdIdentifier: cardData.owner["_id"],
          sample: cardTemplate,
          data: cardData,
          deleteServerCard: cardRemovalHandler,
          likeServerCard: handleCardLike,
          imageClickUrl: handleCardImageClick,
        })
      );

      cardForm.reset();

      closeModal(popupCard);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      changingButtonState({
        buttonElement: popupButton,
        isSubmitting: false,
      });
    });
};

const handleProfileFormSubmit = (event) => {
  event.preventDefault();

  changingButtonState({
    buttonElement: profileFormSubmitButton,
    isSubmitting: true,
  });

  updateUserInfo({
    name: profileNameInput.value,
    description: profileDescriptionInput.value,
  })
    .then(({ name, about, avatar }) => {
      userProfileData({
        name,
        description: about,
        avatar,
      });

      closeModal(popupProfile);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      changingButtonState({
        buttonElement: profileFormSubmitButton,
        isSubmitting: false,
      });
    });
};

const submittingFormProfilePicture = (event) => {
  event.preventDefault();

  changingButtonState({
    buttonElement: profileImageFormSubmitButton,
    isSubmitting: true,
  });

  updateAvatar(profileImageInput.value)
    .then(({ name, about, avatar }) => {
      userProfileData({
        name,
        description: about,
        avatar,
      });

      closeModal(popupProfileImage);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      changingButtonState({
        buttonElement: profileImageFormSubmitButton,
        isSubmitting: false,
      });
    });
};

const handlePopupProfileButtonOpenClick = () => {
  profileNameInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;

  clearValidationErrors(profileForm, validationConfig);

  openModal(popupProfile);
};

const handlePopupCardButtonOpenClick = () => {
  cardForm.reset();

  clearValidationErrors(cardForm, validationConfig);

  openModal(popupCard);
};

const handleCardImageClick = ({ cardName, cardLink }) => {
  popupImage.src = cardLink;
  popupImage.alt = cardName;
  popupImageCaption.textContent = cardName;

  openModal(popupTypeImage);
};

const handleProfileImageClick = () => {
  profileImageForm.reset();

  clearValidationErrors(profileImageForm, validationConfig);

  openModal(popupProfileImage);
};

cardForm.addEventListener("submit", cardFormHandler);

profileForm.addEventListener("submit", handleProfileFormSubmit);

profileImageForm.addEventListener("submit", submittingFormProfilePicture);

popupTypeImage.addEventListener("click", handleModalClick);

popupProfileImage.addEventListener("click", handleModalClick);

profileImage.addEventListener("click", handleProfileImageClick);

popupCard.addEventListener("click", handleModalClick);
addButton.addEventListener("click", handlePopupCardButtonOpenClick);

popupProfile.addEventListener("click", handleModalClick);
editButton.addEventListener("click", handlePopupProfileButtonOpenClick);

popupConfirm.addEventListener("click", handleModalClick);

enableValidation(validationConfig);

Promise.all([fetchUserInfo(), getInitialCards()])
  .then(([{ name, about, avatar, ["_id"]: userIdIdentifier }, cardsData]) => {
    userProfileData({
      name,
      description: about,
      avatar,
    });

    cardsData.forEach((cardData) => {
      placesList.append(
        createCard({
          userIdIdentifier,
          sample: cardTemplate,
          data: cardData,
          deleteServerCard: cardRemovalHandler,
          likeServerCard: handleCardLike,
          imageClickUrl: handleCardImageClick,
        })
      );
    });
  })
  .catch((error) => {
    console.error(error);
  });
