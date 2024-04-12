export function closeByOverlay(event){
  if(event.target.classList.contains('popup')){
    closePopUp(event.target)
  }
}


function closeByEscape(event) {
  if (event.key === "Escape") {
    const openedPopUp = document.querySelector(".popup_is-opened");
    closePopUp(openedPopUp);
  }
}

export function openPopUp(element) {
  element.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeByEscape);
  document.addEventListener('click', closeByOverlay)
}

export function closePopUp(element) {
  element.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeByEscape);
  document.removeEventListener('click', closeByOverlay)
}
