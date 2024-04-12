const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible", 
};

//функция отображает сообщение об ошибке для  поля ввода.
const showInputError = (formElement, inputElement, errorMesage)=> {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__error_visible');
  errorElement.textContent = errorMesage;
  errorElement.classList.add("popup__input_type_error")
} 

// функция скрывает сообщение об ошибке для поля ввода. 
const hideInputError = (formElement, inputElement) =>{
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("popup__error_visible");
  errorElement.classList.remove("popup__input_type_error");
  errorElement.textContent = "";
}


const isValid = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch){
    inputElement.setCustomValidity(inputElement.dataset.errorMesage)
  }else{
    inputElement.setCustomValidity("")
  }
  if(!inputElement.validity.valid){
    showInputError(formElement, inputElement, inputElement.validationMessage);
  }else{
    hideInputError(formElement, inputElement);
  }
};

const toggleButtonState = (inputLs, button)=>{
  const hasInvalidInput = inputLs.some(
    (inputElement)=> !inputElement.validity.valid
  );
  if (hasInvalidInput){
    button.disabled = true;
    button.classList.add('popup__button_disabled')
  }else{
    button.disabled = false;
    button.classList.remove('popup__button_disabled')
  }
};


const setEventListeners = (formElement, settings)=>{
  const inputLs = Array.from(
    formElement.querySelectorAll(settings.inputSelector)
  );
  const button = formElement.querySelector(
    settings.submitButtonSelector
  );

  toggleButtonState(inputLs, button);
  inputLs.forEach((inputElement)=>{
    inputElement.addEventListener('input', ()=>{
      isValid(formElement, inputElement);
      toggleButtonState(inputLs, button)
    })
  })
};


const enableValidation = (settings)=>{
  const forms = Array.from(document.querySelectorAll(settings.formSelector));
  forms.forEach((formElement)=>{
    setEventListeners(formElement, settings)
  });
};





const clearValidation = (formElement, settings)=>{
  const inputLs = Array.from(
    formElement.querySelectorAll(settings.inputSelector)
  );
  const button = formElement.querySelector(
    settings.submitButtonSelector
  );
  inputLs.forEach((inputElement)=>{
    hideInputError(formElement, inputElement)
  });
  toggleButtonState(inputLs, button)
}

export{clearValidation, enableValidation, validationConfig}