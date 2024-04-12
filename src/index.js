// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

// index.js

// import "./pages/index.css";
// import {takeTokenApi, getInitialCards, editingProfile, addNewCardApi, saveAvatarPicture} from './scripts/api.js'
// import { openPopUp, closePopUp, closeByOverlay } from "./scripts/modal.js";
// import { createCard } from "./scripts/card.js";
// import {clearValidation, enableValidation, validationConfig} from "./scripts/validation.js";




// const placesList = document.querySelector(".places__list");//есть 
// const popupCaption = popUpTypeImage.querySelector(".popup__caption");//есть 
// const popUpImage = popUpTypeImage.querySelector(".popup__image");//есть 
// const popups = document.querySelectorAll(".popup");//есть 
// const popUpTypeImage = document.querySelector(".popup_type_image");//есть 
// const popupTypeNewCard = document.querySelector(".popup_type_new-card");//есть 
// const popupTypeEdit = document.querySelector(".popup_type_edit");//есть 
// const editButton = document.querySelector(".profile__edit-button");//есть 
// const addButton = document.querySelector(".profile__add-button");//есть
// const profileTitle = document.querySelector(".profile__title");//есть
// const profileDescription = document.querySelector(".profile__description");//есть 
// const openAvatar = document.querySelector('.profile__image')//есть 
// const closeButtons = document.querySelector('.popup__close')//есть 
// const inputTypeCardName = popupTypeNewCard.querySelector(".popup__input_type_card-name")//есть 
// const popupInputTypeName = popupTypeEdit.querySelector('.popup__input_type_name')//есть 
// const inputInputTypeUrl = popUpTypeImage.querySelector(".popup__input_type_url")//есть 
// const popupInputTypeDescription = popupTypeEdit.querySelector('.popup__input_type_description')//есть 
// const popupNewEditAvatar = document.querySelector('.popup_new_avatar')//есть 
// const inputUrlAvatar = popupNewEditAvatar.querySelector('.popup__edit_new-avatar')//есть 
// let userId 


// function loadServer(){
//   Promise.all([getInitialCards(), takeTokenApi()]).then((cards, user)=>{
//     userId = user._id;

//     cards.forEach((addCardData)=>{
//       const newCard = createCard(addCardData, handleImageClick, userId);
//       placesList.append(newCard)
//     });
//     openAvatar.style.backgroundImage = `url(${user.avatar})`;
//     profileTitle.textContent = user.name
//     profileDescription.textContent = user.about;

//   }).catch((error)=>{
//     console.log('Произошла ошибка при загрузке данных:', error)
//   });
// }

// function handleProfileFormSubmit(evt) {
//   evt.preventDefault();
//   const cardName = inputTypeCardName.value;
//   const cardLink = inputInputTypeUrl.value;
//   const newCardData = {
//     name: cardName,
//     link: cardLink,
//   };
//   updateButtonState(popupTypeNewCard, true);
//   addNewCardApi(newCardData).then((cardData)=>{
//     const newcardElement = createCard(cardData, handleImageClick, userId);
//     placesList.prepend(newcardElement)
//     closePopUp(popupTypeNewCard);
//   }).catch((error)=>{
//     console.error(error);
//   }).finally(()=>{
//     updateButtonState(popupTypeEdit, false);
//   })
  
// }

// loadServer();


// closeButtons.forEach(function(btn){
//   const popUpClose = btn.closest('.popup');
//   btn.addEventListener('click', ()=>{
//     closePopUp(popUpClose)
//   })
  
// });

// popups.forEach(function(over){
//   over.addEventListener("mousedown", closeByOverlay)
// })

// function openProfilePopup() {
  
//   popupInputTypeName.value = profileTitle.textContent;
//   popupInputTypeDescription.value = profileDescription.textContent;
//   clearValidation(popupTypeNewCard, validationConfig)
//   openPopUp(popupTypeNewCard);
// }

// const openNewCard = ()=>{
//   popupInputTypeName.value = "";
//   inputInputTypeUrl.value = ""; 
//   clearValidation(popupTypeNewCard ,validationConfig); 
//   openPopUp(popupTypeNewCard)
// }

// const openNewAvatar = ()=>{
//   inputUrlAvatar.value = ""; 
//   clearValidation(popupNewEditAvatar, validationConfig);
//   openPopUp(popupNewEditAvatar)
// }
// openAvatar.addEventListener('click', openNewAvatar);
// addButton.addEventListener('click', openNewCard);
// editButton.addEventListener('click', openProfilePopup);
import "./pages/index.css";
import { takeTokenApi, getInitialCards, editingProfile, addNewCardApi, saveAvatarPicture } from './scripts/api.js';
import { openPopUp, closePopUp, closeByOverlay } from "./scripts/modal.js";
import { createCard } from "./scripts/card.js";
import { clearValidation, enableValidation, validationConfig } from "./scripts/validation.js";

const placesList = document.querySelector(".places__list");
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
const openAvatar = document.querySelector('.profile__image');
const closeButtons = document.querySelectorAll('.popup__close');
const inputTypeCardName = popupTypeNewCard.querySelector(".popup__input_type_card-name");
const popupInputTypeName = popupTypeEdit.querySelector('.popup__input_type_name');
const inputInputTypeUrl = popUpTypeImage.querySelector(".popup__input_type_url");
const popupInputTypeDescription = popupTypeEdit.querySelector('.popup__input_type_description');
const popupNewEditAvatar = document.querySelector('.popup_new_avatar');
const inputUrlAvatar = popupNewEditAvatar.querySelector('.popup__edit_new-avatar');
let userId;

function loadServer() {
  Promise.all([getInitialCards(), takeTokenApi()]).then(([cards, user]) => {
    userId = user._id;

    cards.forEach((addCardData) => {
      const newCard = createCard(addCardData, handleImageClick, userId);
      placesList.append(newCard);
    });
    openAvatar.style.backgroundImage = `url(${user.avatar})`;
    profileTitle.textContent = user.name;
    profileDescription.textContent = user.about;

  }).catch((error) => {
    console.log('Произошла ошибка при загрузке данных:', error);
  });
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const cardName = inputTypeCardName.value;
  const cardLink = inputInputTypeUrl.value;
  const newCardData = {
    name: cardName,
    link: cardLink,
  };
  updateButtonState(popupTypeNewCard, true);
  addNewCardApi(newCardData).then((cardData) => {
    const newcardElement = createCard(cardData, handleImageClick, userId);
    placesList.prepend(newcardElement);
    closePopUp(popupTypeNewCard);
  }).catch((error) => {
    console.error(error);
  }).finally(() => {
    updateButtonState(popupTypeNewCard, false);
  });
}

loadServer();

closeButtons.forEach(function (btn) {
  const popUpClose = btn.closest('.popup');
  btn.addEventListener('click', () => {
    closePopUp(popUpClose);
  });
});

popups.forEach(function (over) {
  over.addEventListener("mousedown", closeByOverlay);
});

function openProfilePopup() {
  popupInputTypeName.value = profileTitle.textContent;
  popupInputTypeDescription.value = profileDescription.textContent;
  clearValidation(popupTypeEdit, validationConfig);
  openPopUp(popupTypeEdit);
}

const openNewCard = () => {
  popupInputTypeName.value = "";
  inputInputTypeUrl.value = "";
  clearValidation(popupTypeNewCard, validationConfig);
  openPopUp(popupTypeNewCard);
};

const openNewAvatar = () => {
  inputUrlAvatar.value = "";
  clearValidation(popupNewEditAvatar, validationConfig);
  openPopUp(popupNewEditAvatar);
};

openAvatar.addEventListener('click', openNewAvatar);
addButton.addEventListener('click', openNewCard);
editButton.addEventListener('click', openProfilePopup);


function UpdatingProfileInformation(evt){
  evt.preventDefault();
  const name = popupInputTypeName.value;
  const about = popupInputTypeDescription.value;

  const userData = {
    name: name,
    about: about,
  };
  updateButtonState(popupTypeEdit, true);
  editingProfile(userData).then((cardData)=>{
    profileTitle.textContent = cardData.name;
    profileDescription.textContent = cardData.about;
    closePopUp(popupTypeEdit)
  }).catch((error)=>{
    console.error(error)
  }).finally(()=>{
    updateButtonState(popupTypeEdit, false)
  })
}

function avatarUpdate(evt){
  evt.preventDefault()
  const userValue = inputUrlAvatar.value;
  updateButtonState(popupNewEditAvatar, true);
  saveAvatarPicture({avatar:userValue}).then((cardData)=>{
    openAvatar.style.backgroundImage = `url(${cardData.avatar})`;
    closePopUp(popupNewEditAvatar)
  }).catch((error)=>{
    console.error('При обновлении автара произошла ошибка:', error);
  }).finally(()=>{
    updateButtonState(popupNewEditAvatar, false)
  })
}


popupNewEditAvatar.addEventListener('submit', avatarUpdate);
popupTypeEdit.addEventListener('submit', UpdatingProfileInformation);
popupTypeNewCard.addEventListener('submit', handleProfileFormSubmit)


const updateButtonState = (popup, loadingState)=>{
  const customButton = popup.querySelector('.popup__button');
  if(loadingState){
    customButton.textContent = 'Сохранение...';
  }else{
    customButton.textContent = 'Сохранить...'
  }
}



function handleImageClick(cardData) {
  popUpImage.src = cardData.link;
  popUpImage.alt = cardData.name;
  popupCaption.textContent = cardData.name;
  openPopUp(popUpTypeImage);
  
}







enableValidation(validationConfig);


