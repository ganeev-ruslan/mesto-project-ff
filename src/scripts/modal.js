

const handleEscapeKeydown = (event) => {
  if (event.key === 'Escape') {
    closeModal(document.querySelector('.popup_is-opened'));
  }
};

const handleModalClick = (event) => {
  if (event.target.classList.contains('popup_is-opened') || event.target.closest('.popup__close')) {
    closeModal(event.target.closest('.popup') || event.target);
  }
};


const openModal = (element) => {
  element.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscapeKeydown);
};

const closeModal = (element) => {
  document.removeEventListener('keydown', handleEscapeKeydown);
  element.classList.remove('popup_is-opened');
};

export { openModal, closeModal, handleModalClick };