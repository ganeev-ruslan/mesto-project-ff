export const changingButtonState = ({ buttonElement, submitting }) => {
    if (submitting) {
      buttonElement.disabled = true;
      buttonElement.textContent = 'Сохранение...';
    } else {
      buttonElement.disabled = false;
      buttonElement.textContent = 'Сохранить';
    }
  };